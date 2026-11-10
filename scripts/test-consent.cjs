// Kontrak pengukuran tanpa banner. Tidak ada permintaan Google dan tidak ada konversi live.
const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const consentSource = readFileSync('assets/measurement-consent.js', 'utf8');
const trackingSource = readFileSync('assets/tracking.js', 'utf8');
const ids = {ga4MeasurementId:'G-TEST123',googleAdsConversionId:'AW-123456',googleAdsConversionLabel:'TEST_LABEL'};
let passed = 0;
function setup({config=ids, oldChoice, deniedStorage=false, search='?gclid=TEST_CLICK&utm_source=google&health=PRIVATE'}={}) {
  const docListeners = {}, nodes = [], store = new Map();
  if (oldChoice) store.set('erojan_measurement_choice', oldChoice);
  const document = {title:'EROJAN',documentElement:{dataset:{}},
    head:{appendChild:node=>nodes.push(node)},
    getElementById:id=>nodes.find(node=>node.id===id),
    createElement:tag=>({tag}),
    addEventListener:(name,handler)=>(docListeners[name]??=[]).push(handler),
    dispatchEvent:event=>(docListeners[event.type]||[]).forEach(fn=>fn(event)), cookie:''};
  let tick = 10;
  const window = {EROJAN_PUBLIC_CONFIG:config};
  const context = {window,document,URL,URLSearchParams,Date,Set,encodeURIComponent,performance:{now:()=>tick},
    CustomEvent:class {constructor(type,options){this.type=type;this.detail=options.detail;}},
    location:{origin:'https://eroforza.com',pathname:'/',hostname:'eroforza.com',search},
    localStorage:{getItem:k=>store.get(k),removeItem:k=>{if(deniedStorage)throw Error('blocked');store.delete(k);}}};
  vm.runInNewContext(consentSource,context);
  vm.runInNewContext(trackingSource,context);
  const commands=()=>window.dataLayer.map(a=>Array.from(a));
  const events=name=>commands().filter(a=>a[0]==='event'&&(!name||a[1]===name));
  const click=(href='https://wa.me/6281391939099?text=PRIVATE_CHAT',section='manfaat')=>{
    const anchor={href,id:'',closest:selector=>selector==='section[id]'?{id:section}:null};
    document.dispatchEvent({type:'click',target:{closest:()=>anchor}});
  };
  return {window,document,nodes,store,commands,events,click,advance:ms=>tick+=ms};
}
function test(name,fn){fn();passed++;console.log('PASS '+name);}
test('default consent granted for statistics and ads, personalization stays denied',()=>{
  const first=setup().commands()[0];assert.equal(first[0],'consent');assert.equal(first[1],'default');
  for(const key of ['analytics_storage','ad_storage','ad_user_data'])assert.equal(first[2][key],'granted');
  assert.equal(first[2].ad_personalization,'denied');
});
test('page view fires immediately with one loader and no UI API',()=>{
  const s=setup();assert.equal(s.nodes.length,1);assert.equal(s.nodes[0].async,true);
  assert.equal(s.events('page_view').length,1);assert.equal(s.window.EROJANConsent.set,undefined);
  assert.equal(s.document.documentElement.dataset.measurementState,'granted');
});
test('WhatsApp click sends GA4 event and zero-value conversion once, with allowed params only',()=>{
  const s=setup();s.click();s.click();s.advance(1001);s.click('https://wa.me/628000000000');s.click('http://wa.me/6281391939099');
  assert.equal(s.events('whatsapp_click').length,1);assert.equal(s.events('conversion').length,1);
  const c=s.events('conversion')[0][2];assert.equal(c.send_to,'AW-123456/TEST_LABEL');assert.equal(c.value,0);assert.equal(c.currency,'IDR');
  assert.equal(s.events('whatsapp_click')[0][2].cta_location,'manfaat');
  assert.ok(!JSON.stringify(s.commands()).includes('PRIVATE'));assert.equal(c.page_referrer,'');
  const url=new URL(c.page_location);assert.equal(url.searchParams.get('gclid'),'TEST_CLICK');assert.equal(url.searchParams.get('utm_source'),'google');
});
test('old "Tolak" choice in localStorage is cleared and no longer blocks tracking',()=>{
  const s=setup({oldChoice:JSON.stringify({value:'denied',time:Date.now(),version:2})});
  assert.equal(s.store.has('erojan_measurement_choice'),false);assert.equal(s.events('page_view').length,1);
  s.click();assert.equal(s.events('conversion').length,1);
});
test('blocked localStorage does not break tracking',()=>{
  const s=setup({deniedStorage:true,oldChoice:'x'});assert.equal(s.events('page_view').length,1);
});
test('missing IDs/partial Ads config never load tags',()=>{
  for(const config of [{},{googleAdsConversionId:'AW-123456'}]){const s=setup({config});s.click();assert.equal(s.nodes.length,0);assert.equal(s.events().length,0);}
});
console.log(`${passed} skenario pengukuran lulus; tanpa permintaan eksternal.`);
