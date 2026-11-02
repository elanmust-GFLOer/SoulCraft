import {ELEMENTS,CRAFTS,normalizeName,restore,xpOf} from './model.mjs';

export const SOULCRAFT_URL='https://soulcraft-creator-gabriel-v03.tealoffer2.chatgpt.site/';
export const MAX_BACKUP_BYTES=2*1024*1024;
export function createBackup(state,now=new Date()) {
  return JSON.stringify({format:'soulcraft-backup',backupVersion:1,exportedAt:now.toISOString(),state:restore(JSON.stringify(state))},null,2);
}
const fail=message=>{throw new Error(message);};
function isDay(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const date=new Date(value+'T00:00:00Z');
  return Number.isFinite(date.valueOf())&&date.toISOString().slice(0,10)===value;
}
const goalText=value=>typeof value==='string'&&value.trim().length>0&&value.length<=160;
export function parseBackup(text) {
  if(typeof text!=='string'||new TextEncoder().encode(text).length>MAX_BACKUP_BYTES)fail('This backup is too large. Choose a SoulCraft JSON backup under 2 MB.');
  let data;try{data=JSON.parse(text);}catch{fail('This is not valid JSON. Choose a file downloaded with Save my Soul.');}
  if(!data||data.format!=='soulcraft-backup'||data.backupVersion!==1)fail('This is not a supported SoulCraft backup. Your current Soul has not changed.');
  if(typeof data.exportedAt!=='string'||!Number.isFinite(Date.parse(data.exportedAt)))fail('The backup date is invalid.');
  const s=data.state;
  if(!s||typeof s!=='object'||Array.isArray(s)||s.version!==1)fail('The Soul data version is not supported.');
  const allowed=['version','origin','name','craft','born','events','goal','motion'];
  if(Object.keys(s).some(key=>!allowed.includes(key)))fail('The backup contains unsupported Soul fields.');
  if(typeof s.origin!=='string'||!Object.hasOwn(ELEMENTS,s.origin)||typeof s.born!=='boolean'||typeof s.motion!=='boolean')fail('The elemental origin or settings are invalid.');
  if(s.name!==undefined&&(typeof s.name!=='string'||normalizeName(s.name)===null))fail('The Soul name must be no longer than 24 characters.');
  if(!Array.isArray(s.events)||s.events.length>10000)fail('The progress history is invalid or too large.');
  const seen=new Set();
  for(const e of s.events){
    if(!e||!isDay(e.day)||!goalText(e.goal)||e.xp!==40||seen.has(e.day))fail('The progress history contains an invalid or duplicate daily reward.');
    if(Object.keys(e).some(key=>!['day','goal','xp'].includes(key)))fail('The progress history contains unsupported fields.');
    seen.add(e.day);
  }
  if(s.goal!==null&&(!s.goal||!isDay(s.goal.day)||!goalText(s.goal.text)||Object.keys(s.goal).some(key=>!['day','text'].includes(key))||seen.has(s.goal.day)))fail('The saved goal is invalid or already completed.');
  if(!s.born&&(s.events.length||s.goal))fail('An unawakened Soul cannot contain completed goals.');
  if(s.craft!==undefined&&s.craft!==null&&(!Object.hasOwn(CRAFTS,s.craft)||!s.born||!s.events.length))fail('The saved cosmetic effect is invalid or locked.');
  return {state:restore(JSON.stringify(s)),exportedAt:data.exportedAt};
}
// This explicit allowlist is the complete public share payload. Never include events or goals.
export function shareSummary(state) {
  return {name:state.name||ELEMENTS[state.origin].word,element:ELEMENTS[state.origin].name,origin:state.origin,xp:xpOf(state),craft:state.craft?CRAFTS[state.craft].name:null,url:SOULCRAFT_URL};
}
