import {careDay,bondMoments,suggestedPhase,updateCare,saveCarePlan,toggleCareTodo} from './soul-care.mjs';
import {localDay,completedToday,saveGoal,reflectDay,xpOf} from './model.mjs';

export function initCare({getState,commit,notice}){
 const $=id=>document.getElementById(id);
 let phase=suggestedPhase(),taps=0,feedback='Your Soul is here, at your pace.';
 const dirty={plan:false,note:false,reflect:false};
 const forms={plan:$('care-plan-form'),note:$('care-note-form'),reflect:$('care-reflect-form')};
 for(const key of Object.keys(forms))forms[key].addEventListener('input',()=>{dirty[key]=true;});
 function reset(){for(const key of Object.keys(dirty))dirty[key]=false;forms.reflect.reset();taps=0;feedback='Your Soul is here, at your pace.';}
 function react(kind,message){feedback=message;$('scene').dataset.care=kind;render();}
 function write(next,kind,message){const saved=commit(next);react(kind,saved===false?'This moment is only held while this page is open. Browser saving is unavailable.':message);}
 function phaseChange(next){phase=next;render();}
 const tabs=[...document.querySelectorAll('[data-phase]')];
 tabs.forEach((button,index)=>{
  button.onclick=()=>phaseChange(button.dataset.phase);
  button.onkeydown=e=>{let next;if(e.key==='ArrowRight')next=(index+1)%3;else if(e.key==='ArrowLeft')next=(index+2)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;e.preventDefault();phaseChange(tabs[next].dataset.phase);tabs[next].focus();};
 });
 $('care-focus-goal').onclick=()=>{
  const state=getState(),day=localDay();
  if(completedToday(state,day)){$('done-panel').scrollIntoView({behavior:'auto',block:'center'});return;}
  if(state.goal?.day===day)$('edit-goal').click();
  $('goal-input').focus();$('goal-panel').scrollIntoView({behavior:'auto',block:'center'});
 };
 forms.plan.onsubmit=e=>{e.preventDefault();const day=forms.plan.dataset.day;dirty.plan=false;write(saveCarePlan(getState(),day,[$('care-todo-one').value,$('care-todo-two').value]),'feed','Your intentions have a little room to grow.');};
 forms.note.onsubmit=e=>{e.preventDefault();const day=forms.note.dataset.day;dirty.note=false;write(updateCare(getState(),day,{note:$('care-note').value},'day'),'play','A thought kept safely. One less thing to hold in your head.');};
 $('care-spark').onclick=()=>{
  taps++;if(taps<3){$('care-spark').textContent='✦ Touch the spark · '+taps+' / 3';return;}
  taps=0;write(updateCare(getState(),localDay(),{},'day'),'play','A little spark, shared. Your Soul leans into the moment.');
 };
 forms.reflect.onsubmit=e=>{
  e.preventDefault();let state=getState();const before=xpOf(state),day=forms.reflect.dataset.day;
  state=reflectDay(state,day,$('care-journal').value,$('care-goal-confirm').checked&&day===localDay());
  dirty.reflect=false;$('care-goal-confirm').checked=false;
  write(state,'rest','A day lived, a moment kept. Rest at your own pace.');
  notice(xpOf(state)>before?'✦ +40 XP · Your completed main priority is saved.':'Reflection saved for '+day+'. No additional XP was awarded.');
 };
 $('care-carry').onclick=()=>{
  let state=getState(),day=localDay();const previous=[...(state.care||[])].reverse().find(r=>r.day<day);
  const r=careDay(state,day),remaining=(previous?.todos||[]).filter(t=>!t.done&&!r.todos.some(c=>c.text===t.text));
  state=saveCarePlan(state,day,[...r.todos.map(t=>t.text),...remaining.map(t=>t.text)].slice(0,2));
  if(state.goal&&state.goal.day<day&&!completedToday(state,day))state=saveGoal(state,state.goal.text,day);
  dirty.plan=false;write(state,'feed','Unfinished steps can begin again. Nothing was taken away.');
 };
 function render(){
  const state=getState(),today=localDay(),record=careDay(state,today),done=completedToday(state,today);
  $('care-card').hidden=!state.born;
  $('care-date').textContent=today+' · Suggested rhythm: '+({morning:'Feed',day:'Play',evening:'Rest'}[suggestedPhase()]);
  tabs.forEach(button=>{const selected=button.dataset.phase===phase;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;$('care-'+button.dataset.phase).hidden=!selected;});
  const goal=state.events.find(e=>e.day===today)?.goal||(state.goal?.day===today?state.goal.text:'');
  $('care-priority').textContent=goal?'Main priority: '+goal+(done?' · completed':''):'What matters most today? Set one main Creator goal above.';
  $('care-focus-goal').textContent=done?'View my completed priority':goal?'Edit my main priority':'Set my main priority above';
  if(!dirty.plan){forms.plan.dataset.day=today;$('care-todo-one').value=record.todos[0]?.text||'';$('care-todo-two').value=record.todos[1]?.text||'';}
  if(!dirty.note){forms.note.dataset.day=today;$('care-note').value=record.note;}
  if(!dirty.reflect){forms.reflect.dataset.day=today;$('care-journal').value=record.journal;$('care-goal-confirm').checked=false;}
  const previous=[...(state.care||[])].reverse().find(r=>r.day<today);
  $('care-carry').hidden=dirty.plan||!((previous?.todos.some(t=>!t.done)&&record.todos.length<2)||(state.goal&&state.goal.day<today));
  $('care-todos').replaceChildren();
  record.todos.forEach((todo,index)=>{const li=document.createElement('li'),label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span');input.type='checkbox';input.checked=todo.done;span.textContent=todo.text;label.className='care-check';label.append(input,span);li.append(label);input.onchange=()=>{write(toggleCareTodo(getState(),localDay(),index),'play','A small step noticed. Your main priority keeps its own XP reward.');};$('care-todos').append(li);});
  if(!record.todos.length){const li=document.createElement('li');li.textContent='Optional smaller steps will appear here.';$('care-todos').append(li);}
  $('care-goal-confirm-row').hidden=done||state.goal?.day!==today||forms.reflect.dataset.day!==today;
  $('care-summary').textContent=(done?'Main priority completed · +40 XP already recorded.':goal?'Your main priority is waiting for your confirmation.':'No main priority set. A reflection is welcome anyway.')+' '+record.todos.filter(t=>t.done).length+'/'+record.todos.length+' smaller steps completed.'+(record.closed?' Reflection saved.':'');
  $('care-spark').textContent='✦ Touch the spark · '+taps+' / 3';
  $('care-feedback').textContent=feedback;
  const moments=bondMoments(state);$('care-bond').textContent='♡ Soul Bond · '+moments+' shared '+(moments===1?'moment':'moments')+' · up to one per phase each day. No decay.';
  $('care-history').replaceChildren();
  for(const old of [...(state.care||[])].reverse().filter(r=>r.day<today)){
   const li=document.createElement('li'),details=document.createElement('details'),summary=document.createElement('summary');summary.textContent=old.day+(old.closed?' · reflected':'');details.append(summary);
   for(const [label,value] of [['Note',old.note],['Reflection',old.journal],['Smaller steps',old.todos.map(t=>(t.done?'✓ ':'○ ')+t.text).join('\n')]])if(value){const p=document.createElement('p');p.textContent=label+': '+value;details.append(p);}
   li.append(details);$('care-history').append(li);
  }
  if(!$('care-history').children.length){const li=document.createElement('li');li.textContent='Your earlier moments will appear here.';$('care-history').append(li);}
 }
 return {render,reset};
}
