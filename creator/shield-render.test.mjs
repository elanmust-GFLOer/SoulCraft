import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SHIELDS,emptyState} from './dist/model.mjs';
import {shareSummary} from './dist/portability.mjs';
import {drawShareCard} from './dist/share-card.mjs';

async function render(summary){
 const original=globalThis.Image,images=[],texts=[];
 globalThis.Image=class{naturalWidth=320;naturalHeight=330;set src(s){images.push(s);}async decode(){}};
 const gradient=()=>({addColorStop(){}});
 const ctx={createLinearGradient:gradient,createRadialGradient:gradient,fillRect(){},beginPath(){},arc(){},fill(){},strokeRect(){},save(){},restore(){},translate(){},rotate(){},ellipse(){},stroke(){},moveTo(){},lineTo(){},drawImage(){},fillText(t){texts.push(String(t));},measureText(t){return {width:String(t).length*12};}};
 const canvas={getContext:()=>ctx,toBlob:done=>done({type:'image/png'})};
 try {await drawShareCard(canvas,summary);return {images,texts};}finally{globalThis.Image=original;}
}

test('five distinct shield assets exist',()=>{
 const values=Object.keys(SHIELDS);
 assert.deepEqual(values,['bulwark','reflective','bloom','core','halo']);
 const art=new Set();
 for(const id of values){const svg=readFileSync(new URL('./dist/assets/shields/'+id+'.svg',import.meta.url),'utf8');assert.match(svg,/<svg\b/);art.add(svg);}
 assert.equal(art.size,5);
});
test('all five choices render in PNG card, preserving privacy',async()=>{
 for(const shield of Object.keys(SHIELDS)){
  const state={...emptyState(),born:true,origin:'earth',name:'StoneR',shield,craft:'halo',events:[{day:'2026-11-01',goal:'PRIVATE GOAL A',xp:40},{day:'2026-11-02',goal:'PRIVATE GOAL B',xp:40}]};
  const summary=shareSummary(state);
  const {images,texts}=await render(summary);
  assert.deepEqual(images,['assets/earth.png','assets/earth-mantle.svg','assets/earth-crown.svg','assets/shields/'+shield+'.svg']);
  assert.ok(texts.some(t=>t.includes(SHIELDS[shield].name)));
  assert.ok(texts.includes('80 CREATOR XP'));
  assert.ok(texts.join(' ').includes('https://elanmust-gfloer.github.io/SoulCraft/'));
  assert.doesNotMatch(JSON.stringify(summary)+texts.join(' '),/PRIVATE GOAL/);
 }
});
test('other origins and unshielded Earth do not render shield art',async()=>{
 for(const origin of ['air','earth']){
  const state={...emptyState(),born:true,origin,events:[{day:'2026-11-01',goal:'A',xp:40}]};
  const {images}=await render(shareSummary(state));
  assert.equal(images.some(s=>s.includes('assets/shields/')),false);
 }
});
test('shield UI and optional mood recommendation are wired',()=>{
 const html=readFileSync(new URL('./dist/index.html',import.meta.url),'utf8');
 const app=readFileSync(new URL('./dist/app.mjs',import.meta.url),'utf8');
 for(const id of ['shield-options','shield-visual','remove-shield','shield-suggestion','shield-accept'])assert.ok(html.includes('id="'+id+'"'));
 assert.match(app,/suggestedShield\(chosenMood\)/);
 assert.match(app,/equipShield\(state,id\)/);
 assert.match(app,/chosenMood=null; \/\/ optional transient suggestion/);
});
