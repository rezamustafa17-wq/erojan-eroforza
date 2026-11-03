// Deterministic privacy/event contract tests. No Google requests or live conversions.
const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const consentSource = readFileSync('assets/measurement-consent.js', 'utf8');
const trackingSource = readFileSync('assets/tracking.js', 'utf8');
const ids = {ga4MeasurementId:'G-TEST123',googleAdsConversionId:'AW-123456',googleAdsConversionLabel:'TEST_LABEL'};
let passed = 0;
function setup({config=ids, saved, deniedStorage=false, search='?gclid=TEST_CLICK&gbraid=TEST_BRAID&wbraid=TEST_WEB&utm_source=google&utm_medium=cpc&utm_campaign=erojan&utm_term=erojan&utm_content=ad1&utm_id=123&health=PRIVATE&email=PRIVATE%40example.com', cookies='_ga=test; _ga_TEST=one; _gcl_aw=test; essential=keep'}={}) {
  const docListeners = {}, winListeners = {}, nodes = [], deleted = [], store = new Map();
  if (saved) store.set('erojan_measurement_choice', JSON.stringify(saved));
  const document = {title:'EROJAN',documentElement:{dataset:{}},
    head:{appendChild:node=>nodes.push(node)},
    getElementById:id=>nodes.find(node=>node.id===id),
    createElement:tag=>({tag}),
    addEventListener:(name,handler)=>(docListeners[name]??=[]).push(handler),
    dispatchEvent:event=>(docListeners[event.type]||[]).forEach(fn=>fn(event))};
  Object.defineProperty(document, 'cookie', {get:()=>cookies,set:value=>deleted.push(value)});
  let tick = 10;
  const window = {EROJAN_PUBLIC_CONFIG:config,addEventListener:(name,handler)=>(winListeners[name]??=[]).push(handler)};
  const context = {window,document,URL,URLSearchParams,Date,Set,encodeURIComponent,performance:{now:()=>tick},
    CustomEvent:class {constructor(type,options){this.type=type;this.detail=options.detail;}},
    location:{origin:'https://eroforza.com',pathname:'/',hostname:'eroforza.com',search},
    localStorage:{getItem:key=>{if(deniedStorage)throw Error('blocked');return store.get(key);},setItem:(key,value)=>{if(deniedStorage)throw Error('blocked');store.set(key,value);}}};
  vm.runInNewContext(consentSource,context);
  vm.runInNewContext(trackingSource,context);
  const commands=()=>window.dataLayer.map(a=>Array.from(a));
  const events=name=>commands().filter(a=>a[0]==='event'&&(!name||a[1]===name));
  const choose=(analytics,advertising)=>window.EROJANConsent.set({analytics,advertising});
  const click=(href='https://wa.me/6281391939099?text=PRIVATE_CHAT',section='manfaat')=>{
    const anchor={href,id:'',closest:selector=>selector==='section[id]'?{id:section}:null};
    document.dispatchEvent({type:'click',target:{closest:()=>anchor}});
  };
  return {window,document,nodes,store,deleted,commands,events,choose,click,advance:ms=>tick+=ms,
    crossTab:raw=>(winListeners.storage||[]).forEach(fn=>fn({key:'erojan_measurement_choice',newValue:raw}))};
}
function test(name,fn){fn();passed++;console.log('PASS '+name);}
test('all four defaults denied, before initialization; pending creates no Google request',()=>{
  const s=setup();const first=s.commands()[0];assert.equal(first[0],'consent');assert.equal(first[1],'default');
  for(const key of ['analytics_storage','ad_storage','ad_user_data','ad_personalization'])assert.equal(first[2][key],'denied');
  assert.equal(s.nodes.length,0);s.click();assert.equal(s.events().length,0);
  assert.equal(s.document.documentElement.dataset.measurementState,'awaiting-consent');
});
test('denied is remembered without loading tags; old grant cannot silently expand scope',()=>{
  let s=setup({saved:{value:'denied',time:Date.now(),version:2}});assert.equal(s.window.EROJANConsent.getState().decided,true);assert.equal(s.nodes.length,0);
  s=setup({saved:{value:'granted',time:Date.now(),version:2}});assert.equal(s.window.EROJANConsent.getState().decided,false);assert.equal(s.nodes.length,0);
});
test('invalid, expired and future choices fail closed',()=>{
  for(const saved of [{analytics:true,advertising:true,version:3,time:Date.now()+100000},{analytics:true,advertising:true,version:3,time:Date.now()-181*86400000},{analytics:'true',advertising:true,version:3,time:Date.now()}]){
    const s=setup({saved});assert.equal(s.nodes.length,0);assert.equal(s.window.EROJANConsent.getState().analytics,false);
  }
});
test('one async loader and one page_view per document through repeated consent changes',()=>{
  const s=setup();s.choose(true,true);s.choose(true,true);s.choose(false,false);s.choose(true,true);
  assert.equal(s.nodes.length,1);assert.equal(s.nodes[0].async,true);assert.equal(s.events('page_view').length,1);
  assert.equal(s.commands().filter(a=>a[0]==='config'&&a[1]==='G-TEST123').length,1);
  assert.equal(s.commands().find(a=>a[0]==='config'&&a[1]==='G-TEST123')[2].send_page_view,false);
});
test('analytics-only choice does not configure Ads or emit a conversion',()=>{
  const s=setup();s.choose(true,false);s.click();assert.equal(s.events('page_view').length,1);assert.equal(s.events('whatsapp_click').length,1);assert.equal(s.events('conversion').length,0);
  assert.equal(s.commands().filter(a=>a[0]==='config'&&a[1]==='AW-123456').length,0);
  const url=new URL(s.events('page_view')[0][2].page_location);assert.equal(url.searchParams.get('utm_source'),'google');assert.equal(url.searchParams.get('gclid'),null);
});
test('Ads-only choice configures Ads, never GA4, and includes permitted click IDs',()=>{
  const s=setup();s.choose(false,true);s.click();assert.equal(s.events('page_view').length,0);assert.equal(s.events('whatsapp_click').length,0);assert.equal(s.events('conversion').length,1);
  const url=new URL(s.events('conversion')[0][2].page_location);for(const key of ['gclid','gbraid','wbraid'])assert.ok(url.searchParams.get(key));assert.equal(url.searchParams.get('utm_source'),null);
});
test('real CTA events retain IDs/label/zero value; double-clicks and wrong targets do not convert',()=>{
  const s=setup();s.choose(true,true);s.click();s.click();s.advance(1001);s.click('https://wa.me/628000000000');s.click('http://wa.me/6281391939099');
  assert.equal(s.events('whatsapp_click').length,1);assert.equal(s.events('conversion').length,1);
  const conversion=s.events('conversion')[0][2];assert.equal(conversion.send_to,'AW-123456/TEST_LABEL');assert.equal(conversion.value,0);assert.equal(conversion.currency,'IDR');
  assert.equal(s.events('whatsapp_click')[0][2].cta_location,'manfaat');
  assert.ok(!JSON.stringify(s.commands()).includes('PRIVATE'));assert.equal(conversion.page_referrer,'');
});
test('navigation/reload restores granular consent without replaying CTA conversions',()=>{
  let s=setup();s.choose(true,true);s.click();const saved=JSON.parse(s.store.get('erojan_measurement_choice'));
  s=setup({saved});assert.equal(s.events('page_view').length,1);assert.equal(s.events('conversion').length,0);assert.equal(s.nodes.length,1);
  assert.equal(s.events('session_start').length,0);assert.equal(s.events('user_engagement').length,0);
});
test('withdrawal is queued before subsequent events; delete only cookies for withdrawn purpose',()=>{
  const s=setup();s.choose(true,true);s.choose(true,false);s.click();
  assert.ok(s.deleted.some(value=>value.startsWith('_gcl_aw=')));assert.ok(!s.deleted.some(value=>value.startsWith('_ga=')));
  assert.equal(s.events('conversion').length,0);assert.equal(s.events('whatsapp_click').length,1);
  s.choose(false,false);s.advance(1001);s.click();assert.equal(s.events('whatsapp_click').length,1);assert.equal(s.window['ga-disable-G-TEST123'],true);
  assert.ok(s.deleted.some(value=>value.startsWith('_ga=')));assert.ok(!s.deleted.some(value=>value.startsWith('essential=')));
  const update=s.commands().filter(a=>a[0]==='consent'&&a[1]==='update').at(-1)[2];for(const key of ['analytics_storage','ad_storage','ad_user_data','ad_personalization'])assert.equal(update[key],'denied');
});
test('cross-tab withdrawal and cleared preference fail closed',()=>{
  const s=setup();s.choose(true,true);s.crossTab(JSON.stringify({analytics:false,advertising:false,version:3,time:Date.now()}));s.click();assert.equal(s.events('conversion').length,0);
  s.crossTab(null);assert.equal(s.window.EROJANConsent.getState().decided,false);
});
test('blocked localStorage remains usable for this page without pretending persistence',()=>{
  const s=setup({deniedStorage:true});assert.equal(s.nodes.length,0);s.choose(true,false);assert.equal(s.events('page_view').length,1);assert.equal(s.window.EROJANConsent.getState().persisted,false);
});
test('advanced adapter is opt-in, initializes denied without ga-disable or extra page_view on grant',()=>{
  const s=setup({config:{...ids,measurementPolicy:{advancedCookielessApproved:true}}});assert.equal(s.nodes.length,1);assert.equal(s.events('page_view').length,1);
  assert.equal(s.events('page_view')[0][2].page_location,'https://eroforza.com/');assert.equal(s.window['ga-disable-G-TEST123'],false);
  s.choose(true,true);assert.equal(s.events('page_view').length,1);assert.equal(s.events('conversion').length,0);
  assert.equal(s.commands().filter(a=>a[0]==='set'&&a[1]==='ads_data_redaction')[0][2],true);
});
test('missing IDs/partial Ads config never load tags',()=>{
  for(const config of [{},{googleAdsConversionId:'AW-123456'}]){const s=setup({config});s.choose(true,true);s.click();assert.equal(s.nodes.length,0);assert.equal(s.events().length,0);}
});
console.log(`${passed} privacy/event contract scenarios passed; no external requests.`);
