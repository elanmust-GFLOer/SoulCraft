import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARMOR_PATHS,SHIELDS,emptyState} from './dist/model.mjs';
import {drawShareCard} from './dist/share-card.mjs';
import {shareSummary} from './dist/portability.mjs';

const load=p=>readFileSync(new URL('./dist/'+p,import.meta.url),'utf8');
async function render(state){
 const old=globalThis.Image,images=[],text=[];
 globalThis.Image=class{naturalWidth=320;naturalHeight=330;set src(s){images.push(s)}async decode(){}};
 const grad=()=>({addColorStop(){}}), ctx={createLinearGradient:grad,createRadialGradient:grad,
 fillRect(){},beginPath(){},arc(){},fill(){},strokeRect(){},save(){},restore(){},
 translate(){},rotate(){},ellipse(){},stroke(){},moveTo(){},lineTo(){},drawImage(){},
 fillText(x){text.push(String(x))},measureText(x){return {width:String(x).length*13}}};
 const canvas={getContext:()=>ctx,toBlob:done=>done({type:'image/png'})};
 try{await drawShareCard(canvas,shareSummary(state));return{images,text}}finally{globalThis.Image=old}
}
const earth={...emptyState(),origin:'earth',born:true,name:'StoneR',shield:'reflective',craft:'halo',
 events:[{day:'2026-11-01',goal:'PRIVATE GOAL A',xp:40},{day:'2026-11-02',goal:'PRIVATE GOAL B',xp:40}]};

test('all five armor shells are distinct SVGs with cockpit openings',()=>{
 const paths=Object.keys(ARMOR_PATHS);assert.deepEqual(paths,['balanced','bastion','sentinel','striker','titan']);
 const shapes=new Set();
 for(const id of paths){const svg=load('assets/armor/'+id+'.svg');assert.match(svg,/<svg\b/);assert.match(svg,/Central opening/);shapes.add(svg);}
 assert.equal(shapes.size,5);
});
test('every armor share card draws one Soul in the shell and preserves shield/public fields',async()=>{
 for(const id of Object.keys(ARMOR_PATHS)){
  const {images,text}=await render({...earth,armorPath:id});
  assert.deepEqual(images,['assets/earth.png','assets/armor/'+id+'.svg','assets/shields/reflective.svg']);
  assert.ok(text.some(t=>t.includes(ARMOR_PATHS[id].name)),id);
  assert.ok(text.some(t=>t.includes(SHIELDS.reflective.name)));
  assert.ok(text.includes('80 CREATOR XP'));
  assert.doesNotMatch(text.join(' '),/PRIVATE GOAL/);
 }
});
test('classic Earth PNG remains unchanged when no armor selected',async()=>{
 const {images}=await render({...earth,armorPath:null});
 assert.deepEqual(images,['assets/earth.png','assets/earth-mantle.svg','assets/earth-crown.svg','assets/shields/reflective.svg']);
});
test('preview only becomes persisted after explicit equip; UI is not a new Soul',()=>{
 const app=load('app.mjs'),html=load('index.html');
 for(const id of ['guardian-shell','guardian-cockpit','armor-options','equip-armor','remove-armor'])assert.ok(html.includes('id="'+id+'"'));
 assert.match(app,/armorPreview=id;render\(\)/);
 assert.match(app,/state=equipArmor\(state,armorPreview\)/);
 assert.match(app,/armorPreview=null;persist\(\);render\(\)/);
 assert.match(app,/\$\('character'\)\.hidden=!state\.born\|\|!!activeArmor/);
});

test('v0.4.3 cockpit has larger readable Soul and all five signature sculpted plate sets',()=>{
 const css=load('style.css'),html=load('index.html'),app=load('app.mjs');
 assert.match(html,/CREATOR · v0\.4\.3/);
 assert.match(css,/\.guardian-cockpit img\{\s*width:122px;height:128px/);
 assert.match(css,/\.scene\[data-armor-active="true"\] \.shield-visual/);
 assert.match(app,/dataset\.armorActive=String\(!!activeArmor\)/);
 for(const id of Object.keys(ARMOR_PATHS))assert.match(load('assets/armor/'+id+'.svg'),/signature sculpted plates/);
});
