import {ELEMENTS,CRAFTS,emptyState,localDay,restore,xpOf,completedToday,saveGoal,completeGoal,normalizeName,renameSoul,craftUnlocked,equipCraft,earthEvolution,SHIELDS,shieldUnlocked,equipShield,suggestedShield,ARMOR_PATHS,armorUnlocked,equipArmor} from './model.mjs';
import {createBackup,parseBackup,shareSummary,SOULCRAFT_URL,MAX_BACKUP_BYTES} from './portability.mjs';
import {drawShareCard} from './share-card.mjs';
const KEY='soulcraft.creator.v03';
const $=id=>document.getElementById(id);
let canSave=true;
let raw=null;try{raw=localStorage.getItem(KEY);}catch{canSave=false;}
let state=restore(raw), editing=false;
let chosenMood=null; // optional transient suggestion, never persisted
let armorPreview=null; // no state write until explicit equip
let lastDay=localDay();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));canSave=true;}catch{canSave=false;}$('save-status').textContent=canSave?'◈ Saved in this browser':'⚠ Saving is unavailable — progress lasts only while this page is open';}
function notice(text){$('notice').textContent=text;$('notice').hidden=!text;}
function render(){
 const el=ELEMENTS[state.origin],xp=xpOf(state),today=localDay(),done=completedToday(state,today),active=state.goal?.day===today;
 document.documentElement.style.setProperty('--accent',el.color);
 document.body.classList.toggle('no-motion',!state.motion);
 $('motion').setAttribute('aria-pressed',String(state.motion));
 $('motion').title=state.motion?'Turn motion off':'Turn motion on';
 $('headline').replaceChildren(document.createTextNode(el.title.split('. ')[0]+'. '),document.createElement('br'),document.createTextNode(el.title.split('. ')[1]));
 const displayName=state.name||el.word;
 $('soul-name').textContent=displayName;
 $('origin-label').textContent=el.name+' Soul';
 $('rename').hidden=!state.born;
 $('rename').textContent=state.name?'Rename':'Name your Soul';
 $('share-soul').disabled=!state.born;
 $('name-help').textContent='Optional · Up to 24 characters. Leave empty to use '+el.word+'.';
 document.title='SoulCraft — '+displayName;
 $('bubble').hidden=state.born;$('character').hidden=!state.born;
 $('character').src=`assets/${state.origin}.png`;
 const earthForm=earthEvolution(state);$('scene').dataset.earthForm=String(earthForm);
 const activeArmor=armorUnlocked(state)?(armorPreview||state.armorPath):null;
 $('scene').dataset.armorActive=String(!!activeArmor);
 $('scene').dataset.armorPath=activeArmor||'classic';
 $('guardian-shell').hidden=!activeArmor;
 $('guardian-cockpit').hidden=!activeArmor;
 $('guardian-cockpit-frame').hidden=!activeArmor;
 if(activeArmor)$('guardian-shell').src='assets/armor/'+activeArmor+'.svg';
 $('character').hidden=!state.born||!!activeArmor;
 $('earth-mantle').hidden=earthForm<2||!!activeArmor;$('earth-crown').hidden=earthForm<3||!!activeArmor;
 $('shield-visual').hidden=!(earthForm===3 && state.shield);
 if(earthForm===3&&state.shield)$('shield-visual').src=`assets/shields/${state.shield}.svg`;
 $('character').alt=displayName+', your '+(earthForm===3?'Crystal Guardian':earthForm===2?'Stone Guardian':el.name)+' Evolve Soul';
 $('scene').classList.toggle('flourishing',xp>=40);$('scene').classList.toggle('radiant',xp>=80);$('growth-spark').hidden=xp<40;
 $('scene').dataset.craft=state.craft||'none';
 $('armor-card').hidden=!armorUnlocked(state);
 if(armorUnlocked(state)){
  $('armor-options').replaceChildren(...Object.entries(ARMOR_PATHS).map(([id,spec])=>{
   const b=document.createElement('button');b.type='button';b.className='armor-option';b.id='armor-'+id;
   b.setAttribute('aria-pressed',String(activeArmor===id));
   const icon=document.createElement('span');icon.className='armor-option-icon';icon.textContent=spec.icon;icon.setAttribute('aria-hidden','true');
   const t=document.createElement('span'),name=document.createElement('strong'),desc=document.createElement('small');
   name.textContent=spec.name;desc.textContent=spec.description;t.append(name,desc);b.append(icon,t);
   b.onclick=()=>{armorPreview=id;render();$('armor-'+id).focus();};
   return b;
  }));
  $('armor-preview-status').textContent=armorPreview?'Preview: '+ARMOR_PATHS[armorPreview].name+'. Not saved until you equip it.':'Select a silhouette to preview it before equipping.';
  $('equip-armor').hidden=!armorPreview;
  $('remove-armor').hidden=!state.armorPath;
  $('armor-status').textContent=state.armorPath?ARMOR_PATHS[state.armorPath].name+' equipped · free to change.':'Classic Crystal Guardian equipped · no path selected.';
 }
 $('craft-card').hidden=!state.born;
 const unlocked=craftUnlocked(state);
 $('craft-badge').textContent=unlocked?'UNLOCKED BY YOUR FIRST GOAL':'LOCKED · FIRST ACTION';
 $('craft-description').textContent=unlocked?'Your first action unlocked three cosmetic effects. Pick one, switch freely, or keep your Soul as it is. Your XP stays the same.':'Complete your first Creator goal to unlock three cosmetic effects. There is no rush.';
 $('craft-options').replaceChildren(...Object.entries(CRAFTS).map(([id,c])=>{const b=document.createElement('button');b.type='button';b.className='craft-option';b.id='craft-'+id;b.disabled=!unlocked;b.setAttribute('aria-pressed',String(state.craft===id));b.setAttribute('aria-label',c.name);const icon=document.createElement('span'),name=document.createElement('strong'),desc=document.createElement('small');icon.className='craft-icon';icon.setAttribute('aria-hidden','true');icon.textContent=c.icon;name.textContent=c.name;desc.textContent=c.description;b.append(icon,name,desc);b.onclick=()=>{state=equipCraft(state,id);persist();render();$('craft-'+id).focus();};return b;}));
 $('craft-status').textContent=state.craft?CRAFTS[state.craft].name+' equipped. Saved with your Soul. Cosmetic only — no extra XP.':unlocked?'No effect equipped. Cosmetic only — no extra XP.':'Your first craft is waiting to unfold.';
 $('remove-craft').hidden=!state.craft;
 const shieldsReady=shieldUnlocked(state);
 $('shield-card').hidden=!shieldsReady;
 if(shieldsReady){
  $('shield-options').replaceChildren(...Object.entries(SHIELDS).map(([id,spec])=>{
   const b=document.createElement('button');b.type='button';b.className='shield-option';b.id='shield-'+id;
   b.setAttribute('aria-pressed',String(state.shield===id));
   b.setAttribute('aria-label',spec.name);
   const icon=document.createElement('span');icon.className='shield-icon';icon.setAttribute('aria-hidden','true');icon.textContent=spec.icon;
   const t=document.createElement('span'),name=document.createElement('strong'),desc=document.createElement('small');name.textContent=spec.name;desc.textContent=spec.motto;t.append(name,desc);b.append(icon,t);
   b.onclick=()=>{state=equipShield(state,id);persist();render();$('shield-'+id).focus();};
   return b;
  }));
  $('shield-status').textContent=state.shield?SHIELDS[state.shield].name+' equipped. Free to change · 0 XP spent.':'No shield equipped. Pick a form to try it.';
  $('remove-shield').hidden=!state.shield;
  const recommendation=suggestedShield(chosenMood);
  $('shield-accept').hidden=!recommendation;
  $('shield-suggestion').textContent=recommendation?'Companion preview suggests '+SHIELDS[recommendation].name+': '+SHIELDS[recommendation].description+' You can ignore this.':'Pick a need to explore a shield. You always decide what to equip.';
  document.querySelectorAll('[data-mood]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mood===chosenMood)));
 }
 $('scene-caption').textContent=!state.born?'A spark of possibility.':earthForm===3?'Crystal Guardian · rooted in your journey.':earthForm===2?'Stone Guardian · your first armor has grown.':xp>=80?'The light of your actions stays with you.':xp>=40?'Your first small action left a little light.':'Awake at last. Your journey begins.';
 $('stage-badge').textContent=earthForm===3?'03 · CRYSTAL GUARDIAN':earthForm===2?'02 · STONE GUARDIAN':xp>=80?'03 · RADIANCE':xp>=40?'02 · GROWING':'01 · AWAKENING';
 $('xp').textContent=xp;$('progress-fill').style.width=Math.min(100,xp/80*100)+'%';$('progress').setAttribute('aria-valuenow',Math.min(80,xp));
 $('next-stage').textContent=xp>=80?'All three visual stages reached':`Next stage: ${xp<40?40:80} XP`;
 for(let i=1;i<=3;i++)$('step-'+i).classList.toggle('current',i===1||i===2&&xp>=40||i===3&&xp>=80);
 $('origin-panel').hidden=state.born;$('goal-panel').hidden=!state.born||done||active&&!editing;$('active-panel').hidden=!state.born||done||!active||editing;$('done-panel').hidden=!done||!state.born;
 $('action-kicker').textContent=!state.born?'01 / ELEMENTAL ORIGIN':done?'03 / PROGRESS TO KEEP':'02 / TODAY’S SMALL STEP';
 $('narration').textContent=!state.born?'Choose an elemental origin. Our journey starts here.':done?'Your small step for today is done. Your Soul keeps its light. Come back at your own pace.':active?'Your intention is set. Give it a little attention and take a step at your own pace.':'Welcome! What is one small thing you would like to do today?';
 $('active-goal').textContent=state.goal?.text||'';
 $('done-goal').textContent=state.events.find(e=>e.day===today)?.goal||'';
 $('elements').replaceChildren(...Object.entries(ELEMENTS).map(([id,e])=>{const b=document.createElement('button');b.type='button';b.className='element';b.setAttribute('aria-pressed',String(id===state.origin));b.setAttribute('aria-label',e.name);const icon=document.createElement('span');icon.textContent=e.icon;b.append(icon,document.createTextNode(e.name));b.onclick=()=>{state={...state,origin:id};persist();render();};return b;}));
 $('history-count').textContent=state.events.length+(state.events.length===1?' step':' steps');
 $('history').replaceChildren();
 for(const e of state.events.slice(-5).reverse()) {const li=document.createElement('li'),date=document.createElement('span'),points=document.createElement('span');date.className='history-date';date.textContent=e.day;points.className='history-xp';points.textContent='+40 XP';li.append(points,date,document.createTextNode(e.goal));$('history').append(li);}
 if(!state.events.length){const li=document.createElement('li');li.className='empty-history';li.textContent='It begins with your first small action.';$('history').append(li);}
 $('save-status').textContent=canSave?'◈ Saved in this browser':'⚠ Saving is unavailable — progress lasts only while this page is open';
}
function validateName(input){const value=normalizeName(input.value);input.setCustomValidity(value===null?'Please choose a name of up to 24 characters.':'');return value!==null;}
$('name-input').oninput=()=>validateName($('name-input'));
$('origin-form').onsubmit=event=>{event.preventDefault();if(!validateName($('name-input'))){$('name-input').reportValidity();return;}state={...renameSoul(state,$('name-input').value),born:true};persist();render();$('goal-input').focus();};
$('rename').onclick=()=>{$('rename-input').value=state.name;$('rename-input').setCustomValidity('');$('rename-help').textContent='Leave empty to use '+ELEMENTS[state.origin].word+'. Your progress stays the same.';$('name-dialog').showModal();$('rename-input').focus();};
$('rename-input').oninput=()=>validateName($('rename-input'));
$('cancel-name').onclick=()=>$('name-dialog').close();
$('name-form').onsubmit=event=>{event.preventDefault();if(!validateName($('rename-input'))){$('rename-input').reportValidity();return;}state=renameSoul(state,$('rename-input').value);persist();render();$('name-dialog').close();notice('Your Soul’s name is saved.');$('rename').focus();};
$('goal-input').oninput=()=>{$('goal-input').setCustomValidity('');$('char-count').textContent=$('goal-input').value.length+'/160';};
$('goal-input').oninvalid=()=>{$('goal-input').setCustomValidity('Please enter a short goal.');};
$('goal-form').onsubmit=event=>{event.preventDefault();const text=$('goal-input').value.trim();if(!text){$('goal-input').setCustomValidity('Please enter a short goal.');$('goal-input').reportValidity();$('goal-input').setCustomValidity('');return;}state=saveGoal(state,text,localDay());editing=false;persist();render();$('complete').focus();};
document.querySelectorAll('[data-goal]').forEach(b=>b.onclick=()=>{$('goal-input').value=b.dataset.goal;$('goal-input').dispatchEvent(new Event('input'));$('goal-input').focus();});
$('edit-goal').onclick=()=>{editing=true;$('goal-input').value=state.goal.text;render();$('goal-input').dispatchEvent(new Event('input'));$('goal-input').focus();};
$('complete').onclick=()=>{const before=xpOf(state);state=completeGoal(state,localDay());persist();render();notice(xpOf(state)>before?'✦ +40 XP · Your step for today is saved.':'You have already received today’s reward.');};
$('motion').onclick=()=>{state={...state,motion:!state.motion};persist();render();};
$('remove-craft').onclick=()=>{state=equipCraft(state,null);persist();render();$('craft-halo').focus();};
$('equip-armor').onclick=()=>{if(!armorPreview)return;state=equipArmor(state,armorPreview);armorPreview=null;persist();render();$('armor-status').focus?.();};
$('remove-armor').onclick=()=>{state=equipArmor(state,null);armorPreview=null;persist();render();};
$('remove-shield').onclick=()=>{state=equipShield(state,null);persist();render();$('shield-bulwark').focus();};
document.querySelectorAll('[data-mood]').forEach(button=>button.onclick=()=>{
 chosenMood=button.dataset.mood;render();button.focus();
});
$('shield-accept').onclick=()=>{const id=suggestedShield(chosenMood);if(!id)return;state=equipShield(state,id);persist();render();$('shield-'+id).focus();};
$('reset').onclick=()=>$('reset-dialog').showModal();$('cancel-reset').onclick=()=>$('reset-dialog').close();
$('confirm-reset').onclick=()=>{state=emptyState();editing=false;chosenMood=null;armorPreview=null;$('name-input').value='';$('goal-input').value='';$('goal-input').dispatchEvent(new Event('input'));persist();$('reset-dialog').close();notice('');render();};
window.addEventListener('storage',event=>{if(event.key===KEY){state=restore(event.newValue);editing=false;chosenMood=null;armorPreview=null;render();}});
function rollover(){const day=localDay();if(day!==lastDay){lastDay=day;editing=false;notice('');render();}}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)rollover();});setInterval(rollover,30000);

// Backup files stay on the device until the user chooses where to keep them.
function downloadBlob(blob,filename){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
function downloadBackup(){try{downloadBlob(new Blob([createBackup(state)],{type:'application/json'}),`soulcraft-backup-${localDay()}.json`);notice('Backup download requested. It includes your private goals — keep it somewhere safe.');}catch{notice('The backup could not be downloaded. Your Soul has not changed.');}}
$('save-soul').onclick=downloadBackup;
$('save-before-restore').onclick=downloadBackup;
let pendingRestore=null;
$('restore-soul').onclick=()=>$('restore-file').click();
$('restore-file').onchange=async()=>{
 const file=$('restore-file').files[0];if(!file)return;
 pendingRestore=null;$('restore-error').textContent='';$('restore-soul').disabled=true;
 try{
   if(file.size>MAX_BACKUP_BYTES)throw new Error('Choose a SoulCraft JSON backup under 2 MB.');
   const parsed=parseBackup(await file.text());pendingRestore=parsed.state;
   const summary=shareSummary(parsed.state);
   $('restore-summary').replaceChildren();
   for(const [label,value] of [['Soul',summary.name],['Origin',summary.element+' Soul'],['Progress',summary.xp+' XP · '+parsed.state.events.length+(parsed.state.events.length===1?' completed goal':' completed goals')],['Effect',summary.craft||'None'],['Shield',summary.shield?SHIELDS[summary.shield].name:'None'],['Armor',summary.armorPath?ARMOR_PATHS[summary.armorPath].name:'Classic'],['Active goal',parsed.state.goal?'Included (private)':'None'],['Backup created',new Date(parsed.exportedAt).toLocaleString('en-GB')]]){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;$('restore-summary').append(dt,dd);}
   $('restore-dialog').showModal();
 }catch(error){pendingRestore=null;$('restore-error').textContent=error.message||'This backup could not be read. Your Soul has not changed.';}
 finally{$('restore-soul').disabled=false;$('restore-file').value='';}
};
$('cancel-restore').onclick=()=>$('restore-dialog').close();
$('restore-dialog').addEventListener('close',()=>{pendingRestore=null;});
$('confirm-restore').onclick=()=>{
 if(!pendingRestore)return;
 try{localStorage.setItem(KEY,JSON.stringify(pendingRestore));}catch{$('restore-error').textContent='Restore cancelled: this browser could not save the backup. Your current Soul has not changed.';pendingRestore=null;$('restore-dialog').close();return;}
 state=pendingRestore;armorPreview=null;canSave=true;editing=false;chosenMood=null;$('goal-input').value=state.goal?.text||'';$('goal-input').dispatchEvent(new Event('input'));$('name-input').value='';$('restore-dialog').close();render();notice('Your Soul has been restored in this browser.');
};
let cardBlob=null,cardOrigin='fire',cardRequest=0;
$('share-soul').onclick=async()=>{
 const request=++cardRequest;cardBlob=null;$('download-card').disabled=true;$('native-share').hidden=true;$('card-status').textContent='Creating your card…';$('share-dialog').showModal();
 try{const summary=shareSummary(state),blob=await drawShareCard($('share-canvas'),summary);if(request!==cardRequest)return;cardBlob=blob;cardOrigin=summary.origin;$('share-canvas').setAttribute('aria-label',`${summary.name} · ${summary.element} Soul · ${summary.xp} Creator XP`);$('download-card').disabled=false;const file=new File([blob],'soulcraft-card.png',{type:'image/png'});$('native-share').hidden=!(navigator.share&&navigator.canShare?.({files:[file]}));$('card-status').textContent='Your card includes your name, element, XP, effect, shield, armor and public SoulCraft link. Your goals stay private.';}catch{$('card-status').textContent='The card could not be created. You can still copy the SoulCraft link.';}
};
$('close-share').onclick=()=>$('share-dialog').close();
$('share-dialog').addEventListener('close',()=>{++cardRequest;cardBlob=null;});
$('download-card').onclick=()=>{if(cardBlob)downloadBlob(cardBlob,`soulcraft-${cardOrigin}-card.png`);};
$('native-share').onclick=async()=>{if(!cardBlob)return;try{await navigator.share({title:'My SoulCraft Soul',text:'Meet my Soul. '+SOULCRAFT_URL,files:[new File([cardBlob],'soulcraft-card.png',{type:'image/png'})]});}catch(error){if(error.name!=='AbortError')$('card-status').textContent='Sharing is unavailable here. Download the card and share it from your device instead.';}};
$('share-link').value=SOULCRAFT_URL;
$('copy-link').onclick=async()=>{try{await navigator.clipboard.writeText(SOULCRAFT_URL);$('card-status').textContent='SoulCraft link copied. The link does not include your goals or saved progress.';}catch{$('share-link').focus();$('share-link').select();$('card-status').textContent='Select and copy the link below. Your goals are not included.';}};
// Browser-managed home-screen installation. No application state or storage key is changed.
let installPrompt=null;
const installButton=$('install-soulcraft');
const installHelp=$('install-help');
const installed=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function showInstallHelp(message){installHelp.hidden=false;installHelp.textContent=message;}
function refreshInstallUI(){
 if(installed()){installButton.hidden=true;showInstallHelp('SoulCraft is already running from your home screen.');return;}
 installButton.hidden=false;installButton.textContent=installPrompt?'↗ Install SoulCraft':'↗ Add to Home Screen';
}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;refreshInstallUI();});
window.addEventListener('appinstalled',()=>{installPrompt=null;refreshInstallUI();});
installButton.onclick=async()=>{
 if(installed()){refreshInstallUI();return;}
 if(installPrompt){
   const prompt=installPrompt;installPrompt=null;
   try{await prompt.prompt();const choice=await prompt.userChoice;if(choice?.outcome==='accepted'){showInstallHelp('Installation accepted. Find SoulCraft on your home screen.');}else{showInstallHelp('Installation was dismissed. You can add SoulCraft later from your browser menu.');}}
   catch{showInstallHelp('Use your browser menu to choose Install app or Add to Home screen.');}
   refreshInstallUI();return;
 }
 const ua=navigator.userAgent||'';
 if(/iPad|iPhone|iPod/.test(ua)){showInstallHelp('In Safari, tap Share, then Add to Home Screen.');}
 else if(/Android/i.test(ua)){showInstallHelp('Open the browser menu (⋮), then choose Install app or Add to Home screen.');}
 else{showInstallHelp('Open your browser menu and choose Install SoulCraft, Install app or Create shortcut, if available.');}
};
refreshInstallUI();
render();
