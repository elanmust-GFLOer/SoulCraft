import {validCare,updateCare} from './soul-care.mjs';
export const ELEMENTS = {
  fire: {name:'Fire', en:'Fire', icon:'🔥', color:'#ffaf73', title:'A little flame. A journey of your own.', word:'First Flame'},
  water: {name:'Water', en:'Water', icon:'💧', color:'#8bdfff', title:'A little drop. A journey of your own.', word:'First Flow'},
  earth: {name:'Earth', en:'Earth', icon:'🪨', color:'#bedd8b', title:'A steady foundation. A journey of your own.', word:'First Root'},
  air: {name:'Air', en:'Air', icon:'🌬️', color:'#d8b9ff', title:'A gentle breeze. A journey of your own.', word:'First Breeze'},
  wood: {name:'Wood', en:'Wood', icon:'🌱', color:'#b9e69b', title:'A little sprout. A journey of your own.', word:'First Bloom'}
};
export const CRAFTS = {
  halo:{name:'Soft Halo',icon:'◉',description:'A gentle glow in your elemental color.'},
  starlight:{name:'Starlight',icon:'✧',description:'A small constellation around your Soul.'},
  orbit:{name:'Light Ribbon',icon:'◎',description:'A flowing ring of elemental light.'}
};
export const SHIELDS = {
  bulwark:{name:"Bulwark Shield",motto:"Hold your ground",description:"When you want steadiness under pressure.",icon:"🛡️"},
  reflective:{name:"Reflective Shield",motto:"See, don't absorb",description:"When you want perspective or clearer boundaries.",icon:"💎"},
  bloom:{name:"Bloom Shield",motto:"Care is protection",description:"When you need gentleness and restoration.",icon:"🌱"},
  core:{name:"Core Shield",motto:"Steady from within",description:"When you want focus and structure.",icon:"✦"},
  halo:{name:"Halo Shield",motto:"A gentle boundary",description:"When you want calm and spaciousness.",icon:"◉"},
};
export const ARMOR_PATHS={
 balanced:{name:'Balanced Guardian',description:'Steady and versatile',icon:'◈'},
 bastion:{name:'Heavy Bastion',description:'Grounded and resilient',icon:'▣'},
 sentinel:{name:'Tall Sentinel',description:'Watchful and composed',icon:'♢'},
 striker:{name:'Compact Striker',description:'Focused and agile',icon:'✧'},
 titan:{name:'Broad Titan',description:'Bold and protective',icon:'◆'}
};
export const armorUnlocked=state=>state?.born===true&&state.origin==='earth'&&xpOf(state)>=80;
export function equipArmor(state,id){
 if(!armorUnlocked(state)||(id!==null&&!Object.hasOwn(ARMOR_PATHS,id)))return state;
 return {...state,armorPath:id};
}
export const SHIELD_MOODS = {
  steady:'bulwark', perspective:'reflective', care:'bloom', focus:'core', calm:'halo'
};
export const emptyState = () => ({version:1, origin:'fire', name:'', craft:null, shield:null, armorPath:null, born:false, events:[], goal:null, motion:true, care:[]});
export const craftUnlocked = state => state.born && state.events.length>0;
export const shieldUnlocked = state => state?.born===true && state.origin==='earth' && xpOf(state)>=80;
export function equipShield(state,id){
  if(!shieldUnlocked(state) || (id!==null && !Object.hasOwn(SHIELDS,id)))return state;
  return {...state,shield:id};
}
export const suggestedShield = mood => Object.hasOwn(SHIELD_MOODS,mood)?SHIELD_MOODS[mood]:null;
export function equipCraft(state,id) {
  if(!craftUnlocked(state) || (id!==null && !Object.hasOwn(CRAFTS,id))) return state;
  return {...state,craft:id};
}
export function normalizeName(value) {
  if(typeof value!=='string') return '';
  const name=value.normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f]/gu,' ').replace(/\s+/gu,' ').trim();
  return Array.from(name).length<=24 ? name : null;
}
export function renameSoul(state,value) {
  const name=normalizeName(value);
  return name===null ? state : {...state,name};
}
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
const validDay = value => typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
export function restore(raw) {
  try {
    const v=JSON.parse(raw); if(!v || v.version!==1 || !ELEMENTS[v.origin]) return emptyState();
    const seen=new Set();
    const events=(Array.isArray(v.events)?v.events:[]).filter(e=>{
      if(!e || !validDay(e.day) || typeof e.goal!=='string' || !e.goal.trim() || seen.has(e.day)) return false;
      seen.add(e.day); return true;
    }).map(e=>({day:e.day,goal:e.goal.trim().slice(0,160),xp:40}));
    const goal=v.goal && validDay(v.goal.day) && typeof v.goal.text==='string' && v.goal.text.trim() ? {day:v.goal.day,text:v.goal.text.trim().slice(0,160)} : null;
    const born=v.born===true;
    const craft=born && events.length>0 && Object.hasOwn(CRAFTS,v.craft) ? v.craft : null;
    const shield=born && v.origin==='earth' && events.length>=2 && Object.hasOwn(SHIELDS,v.shield)?v.shield:null;
    const armorPath=born&&v.origin==='earth'&&events.length>=2&&Object.hasOwn(ARMOR_PATHS,v.armorPath)?v.armorPath:null;
    const care=born&&validCare(v.care)?v.care:[];
    return {version:1,origin:v.origin,name:normalizeName(v.name)??'',craft,shield,armorPath,born,events,goal,motion:v.motion!==false,care};
  } catch { return emptyState(); }
}
export const xpOf = state => state.events.length*40;
export const completedToday = (state,day) => state.events.some(e=>e.day===day);
export function saveGoal(state,text,day) {
  text=text.trim();
  if(!state.born || completedToday(state,day) || !text || text.length>160) return state;
  return {...state,goal:{day,text}};
}
export function completeGoal(state,day) {
  if(!state.born || completedToday(state,day) || !state.goal || state.goal.day!==day) return state;
  return {...state,events:[...state.events,{day,goal:state.goal.text,xp:40}],goal:null};
}

export function reflectDay(state,day,journal,confirmGoal=false) {
  if(typeof journal!=='string'||journal.length>1000)return state;
  const next=updateCare(state,day,{journal,closed:true},'evening');
  if(next===state)return state;
  return confirmGoal?completeGoal(next,day):next;
}

// Derived presentation only: no save schema or XP rule changes.
export function earthEvolution(state){if(!state?.born||state.origin!=='earth')return 0;const xp=xpOf(state);return xp>=80?3:xp>=40?2:1;}
