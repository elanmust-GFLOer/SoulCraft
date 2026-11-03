// Private daily records. Creator rewards remain owned by model.mjs.
export const CARE_PHASES=['morning','day','evening'];
export const validCareDay=value=>{
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const d=new Date(value+'T00:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===value;
};
const text=(v,max)=>typeof v==='string'&&v.length<=max;
const only=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
export function validCare(records){
 if(!Array.isArray(records)||records.length>10000)return false;
 const seen=new Set();
 return records.every(r=>{
  if(!only(r,['day','todos','note','journal','visits','closed'])||!validCareDay(r.day)||seen.has(r.day))return false;
  seen.add(r.day);
  return Array.isArray(r.todos)&&r.todos.length<=2&&r.todos.every(t=>only(t,['text','done'])&&text(t.text,160)&&t.text.trim()&&typeof t.done==='boolean')&&text(r.note,500)&&text(r.journal,1000)&&typeof r.closed==='boolean'&&Array.isArray(r.visits)&&r.visits.length<=3&&new Set(r.visits).size===r.visits.length&&r.visits.every(p=>CARE_PHASES.includes(p));
 });
}
export function careDay(state,day){
 return state.care?.find(r=>r.day===day)||{day,todos:[],note:'',journal:'',visits:[],closed:false};
}
export const bondMoments=state=>(state.care||[]).reduce((sum,r)=>sum+r.visits.length,0);
export const suggestedPhase=(date=new Date())=>date.getHours()<11?'morning':date.getHours()<18?'day':'evening';
export function updateCare(state,day,patch,phase){
 if(!state.born||!validCareDay(day)||!CARE_PHASES.includes(phase)||!only(patch,['todos','note','journal','closed']))return state;
 const old=careDay(state,day),visits=CARE_PHASES.filter(p=>p===phase||old.visits.includes(p));
 const next={...old,...patch,visits};
 if(!validCare([next]))return state;
 return {...state,care:[...(state.care||[]).filter(r=>r.day!==day),next].sort((a,b)=>a.day.localeCompare(b.day))};
}
export function saveCarePlan(state,day,values){
 if(!Array.isArray(values)||values.length>2||values.some(v=>!text(v,160)))return state;
 const old=careDay(state,day);
 const todos=values.map(v=>v.trim()).filter(Boolean).map(value=>({text:value,done:old.todos.find(t=>t.text===value)?.done||false}));
 return updateCare(state,day,{todos},'morning');
}
export function toggleCareTodo(state,day,index){
 const r=careDay(state,day);if(!Number.isInteger(index)||!r.todos[index])return state;
 return updateCare(state,day,{todos:r.todos.map((t,i)=>i===index?{...t,done:!t.done}:t)},'day');
}
