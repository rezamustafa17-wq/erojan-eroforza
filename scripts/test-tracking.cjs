// Privacy boundaries for the optional measurement adapter. No external request.
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const source = fs.readFileSync('assets/tracking.js', 'utf8');
function setup(config = {}, saved = null) {
  const listeners = {}, nodes = [], settings = [];
  const document = {
    title: 'EROJAN', documentElement: {dataset: {}},
    head: {appendChild: n => nodes.push(n)},
    body: {appendChild: n => nodes.push(n)},
    querySelectorAll: () => settings,
    getElementById: () => null,
    addEventListener: (type, fn) => listeners[type] = fn,
    createElement: tag => ({tag, hidden: false, handlers: {}, setAttribute(){}, addEventListener(t,f){this.handlers[t]=f;}})
  };
  const storage = new Map(saved ? [['erojan_measurement_choice', JSON.stringify(saved)]] : []);
  const context = {window:{EROJAN_PUBLIC_CONFIG:config},document,URL,Date,encodeURIComponent,location:{origin:'https://eroforza.com',pathname:'/',search:'?health=private'},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}};
  vm.runInNewContext(source, context);
  const banner = () => nodes.find(n=>n.tag==='section');
  const choose = value => banner().handlers.click({target:{closest:()=>({dataset:{measurementChoice:value}})}});
  const click = (href='https://wa.me/6281391939099?text=private',id='waFloat') => listeners.click({target:{closest:()=>({href,id,closest:()=>null})}});
  const events = () => (context.window.dataLayer||[]).map(a=>Array.from(a)).filter(a=>a[0]==='event');
  return {context,nodes,banner,choose,click,events,document};
}
let test = setup();
assert.equal(test.document.documentElement.dataset.measurementState,'unconfigured');
assert.equal(test.nodes.length,0);
test = setup({ga4MeasurementId:'G-TEST123'});
assert.equal(test.nodes.filter(n=>n.tag==='script').length,0);
test.choose('denied'); test.click();
assert.equal(test.events().length,0);
assert.equal(test.nodes.filter(n=>n.tag==='script').length,0);
test.choose('granted'); test.click(); test.click();
assert.equal(test.nodes.filter(n=>n.tag==='script').length,1);
assert.equal(test.events().filter(e=>e[1]==='whatsapp_click').length,1);
assert.equal(test.events()[0][2].page_location,'https://eroforza.com/');
assert.ok(!JSON.stringify(test.events()).includes('private'));
test.choose('denied'); test.click();
assert.equal(test.context.window['ga-disable-G-TEST123'],true);
assert.equal(test.events().filter(e=>e[1]==='whatsapp_click').length,1);
const wrong = setup({ga4MeasurementId:'G-TEST123'},{value:'granted',time:Date.now()});
wrong.click('https://wa.me/000');
assert.equal(wrong.events().filter(e=>e[1]==='whatsapp_click').length,0);
const expired = setup({ga4MeasurementId:'G-TEST123'},{value:'granted',time:Date.now()-181*86400000});
assert.ok(expired.banner());
assert.equal(expired.nodes.filter(n=>n.tag==='script').length,0);
console.log('LULUS: tanpa ID, tanpa izin, penolakan, izin, sanitasi URL, deduplikasi, penarikan izin, nomor tujuan, kedaluwarsa pilihan.');
