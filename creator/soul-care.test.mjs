import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyState,saveGoal,completeGoal,reflectDay,xpOf,restore} from './dist/model.mjs';
import {careDay,bondMoments,saveCarePlan,toggleCareTodo,updateCare,suggestedPhase} from './dist/soul-care.mjs';
import {createBackup,parseBackup,shareSummary} from './dist/portability.mjs';
const day='2026-11-03';
const soul=()=>({...emptyState(),born:true,origin:'earth',name:'StoneR',shield:'reflective',armorPath:'balanced',craft:'halo',events:[{day:'2026-11-01',goal:'A',xp:40},{day:'2026-11-02',goal:'B',xp:40}]});

test('full daily loop survives reload and backup; evening cannot duplicate daytime XP',()=>{
 let s=saveGoal(soul(),'PRIVATE MAIN PRIORITY',day);
 s=saveCarePlan(s,day,['PRIVATE SMALL STEP','Another step']);
 s=toggleCareTodo(s,day,0);
 s=updateCare(s,day,{note:'PRIVATE NOTE'},'day');
 s=completeGoal(s,day);assert.equal(xpOf(s),120);
 s=restore(JSON.stringify(s));
 s=reflectDay(s,day,'PRIVATE JOURNAL',true);
 s=reflectDay(s,day,'PRIVATE JOURNAL EDIT',true);
 for(let i=0;i<10;i++)s=updateCare(s,day,{},'day');
 assert.equal(xpOf(s),120);assert.equal(bondMoments(s),3);
 assert.equal(careDay(s,day).todos[0].done,true);
 assert.equal(careDay(s,day).closed,true);
 const roundTrip=parseBackup(createBackup(s)).state;
 assert.deepEqual(roundTrip,s);
 for(const key of ['name','origin','shield','armorPath','craft'])assert.equal(roundTrip[key],soul()[key]);
 assert.doesNotMatch(JSON.stringify(shareSummary(s)),/PRIVATE|care|journal|note|todos/);
});
test('evening confirmation awards once; journaling and smaller steps alone award none',()=>{
 let s=saveCarePlan(soul(),day,['Read','']);s=toggleCareTodo(s,day,0);s=reflectDay(s,day,'',true);
 assert.equal(xpOf(s),80);
 s=saveGoal(s,'Create something',day);s=reflectDay(s,day,'',true);
 assert.equal(xpOf(s),120);assert.equal(xpOf(reflectDay(s,day,'More text',true)),120);
});
test('legacy v1 saves and backups without care preserve progress and cosmetics',()=>{
 const old=soul();delete old.care;
 const reloaded=restore(JSON.stringify(old));assert.deepEqual(reloaded.care,[]);assert.equal(xpOf(reloaded),80);
 const backup=JSON.parse(createBackup(soul()));delete backup.state.care;
 const imported=parseBackup(JSON.stringify(backup)).state;
 assert.deepEqual(imported,reloaded);
});
test('skipping days causes no decay; records stay on their local dates',()=>{
 let s=saveCarePlan(soul(),day,['Small step']);s=updateCare(s,day,{note:'Keep this'},'day');
 const moments=bondMoments(s);s=reflectDay(s,'2026-11-10','Back again');
 assert.equal(careDay(s,day).note,'Keep this');assert.equal(careDay(s,'2026-11-10').todos.length,0);
 assert.equal(bondMoments(s),moments+1);assert.equal(xpOf(s),80);
 assert.equal(suggestedPhase(new Date(2026,10,3,8)),'morning');assert.equal(suggestedPhase(new Date(2026,10,3,14)),'day');assert.equal(suggestedPhase(new Date(2026,10,3,21)),'evening');
});
test('invalid private records are rejected before backup restore or XP changes',()=>{
 const s=saveCarePlan(soul(),day,['A']);
 for(const change of [r=>r.day='2026-02-30',r=>r.todos.push({text:'B',done:false},{text:'C',done:false}),r=>r.note='x'.repeat(501),r=>r.journal='x'.repeat(1001),r=>r.visits=['day','day'],r=>r.visits=['unknown'],r=>r.closed='yes',r=>r.extra='unknown',r=>r.todos[0].done=1]){
  const backup=JSON.parse(createBackup(s));change(backup.state.care[0]);assert.throws(()=>parseBackup(JSON.stringify(backup)));
 }
 const backup=JSON.parse(createBackup(s));backup.state.care.push(backup.state.care[0]);assert.throws(()=>parseBackup(JSON.stringify(backup)));
 assert.equal(reflectDay(s,day,'x'.repeat(1001),true),s);
 assert.equal(updateCare(s,'2026-02-30',{},'day'),s);
 assert.equal(updateCare(emptyState(),day,{},'day').care.length,0);
});
