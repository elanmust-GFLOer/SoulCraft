import {ELEMENTS,SHIELDS,ARMOR_PATHS} from './model.mjs';
import {cockpitLayout} from './cockpit-layout.mjs';
export function shareUrlLines(raw){const url=new URL(raw),text=url.host+url.pathname;if(text.length<=41)return [url.protocol+'//'+text];const k=Math.max(text.lastIndexOf('/',38),text.lastIndexOf('.',38)),at=k>8?k+1:Math.ceil(text.length/2);return [url.protocol+'//'+text.slice(0,at),text.slice(at)];}
export async function drawShareCard(canvas,summary){
  canvas.width=900;canvas.height=1200;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Card rendering is not available in this browser.');
  const color=ELEMENTS[summary.origin].color;
  const gradient=ctx.createLinearGradient(0,0,900,1200);gradient.addColorStop(0,'#241830');gradient.addColorStop(.55,'#151226');gradient.addColorStop(1,'#0d1020');ctx.fillStyle=gradient;ctx.fillRect(0,0,900,1200);
  const aura=ctx.createRadialGradient(450,470,20,450,470,380);aura.addColorStop(0,color+'35');aura.addColorStop(1,color+'00');ctx.fillStyle=aura;ctx.fillRect(0,120,900,800);
  ctx.fillStyle='#dbc5ec';for(let i=0;i<65;i++){const x=(i*173+41)%850+25,y=(i*97+73)%1000+30;ctx.globalAlpha=.15+(i%5)*.1;ctx.beginPath();ctx.arc(x,y,i%3===0?2:1,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
  ctx.strokeStyle='#d8a7ef55';ctx.lineWidth=2;ctx.strokeRect(28,28,844,1144);
  ctx.textAlign='center';ctx.fillStyle='#f6e5ff';ctx.font='48px Georgia, serif';ctx.fillText('SoulCraft',450,105);ctx.font='14px system-ui, sans-serif';ctx.fillStyle='#c5aecf';ctx.fillText('ONE SOUL. A JOURNEY OF YOUR OWN.',450,142);
  const image=new Image();image.src=`assets/${summary.origin}.png`;await image.decode();
  const size=Math.min(600/image.naturalWidth,590/image.naturalHeight),w=image.naturalWidth*size,h=image.naturalHeight*size;
  if(summary.craft==='Soft Halo'){ctx.save();ctx.shadowColor=color;ctx.shadowBlur=35;ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(450,475,252,0,Math.PI*2);ctx.stroke();ctx.restore();}
  if(summary.craft==='Light Ribbon'){ctx.save();ctx.translate(450,485);ctx.rotate(-.35);ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=14;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,310,110,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
  if(summary.craft==='Starlight'){ctx.fillStyle=color;ctx.font='40px Georgia, serif';for(const [x,y] of [[165,360],[730,430],[230,650],[675,260]])ctx.fillText('✧',x,y);}
  const cockpitArmor=summary.origin==='earth'&&summary.xp>=80&&Object.hasOwn(ARMOR_PATHS,summary.armorPath);
  if(cockpitArmor){
    // The existing Evolve Soul is rendered once, INSIDE the armor cockpit.
    const shell=new Image();shell.src='assets/armor/'+summary.armorPath+'.svg';await shell.decode();
    ctx.drawImage(shell,170,185,560,580);
    const {offsetY,soulScale}=cockpitLayout(summary.armorPath);
    const innerW=205*soulScale,innerH=214*soulScale;
    ctx.drawImage(image,450-innerW/2,354+offsetY*1.7-innerH/2,innerW,innerH);
    ctx.save();ctx.lineWidth=9;ctx.strokeStyle='#c2ed9b';ctx.shadowColor='#bedd8b';ctx.shadowBlur=15;
    ctx.beginPath();ctx.ellipse(450,354+offsetY*1.7,110,119,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  }else{
    ctx.drawImage(image,450-w/2,470-h/2,w,h);
  }
  if(!cockpitArmor&&summary.origin==='earth'&&summary.xp>=40){const layers=['assets/earth-mantle.svg',...(summary.xp>=80?['assets/earth-crown.svg']:[])];for(const path of layers){const layer=new Image();layer.src=path;await layer.decode();ctx.drawImage(layer,450-w/2,470-h/2,w,h);}}
  // Shields are public cosmetic choices. Draw only known artwork above the guardian.
  if(summary.origin==='earth'&&summary.xp>=80&&Object.hasOwn(SHIELDS,summary.shield)){
    const overlay=new Image();overlay.src='assets/shields/'+summary.shield+'.svg';await overlay.decode();if(cockpitArmor){const sw=w*.76,sh=h*.76;ctx.drawImage(overlay,450-sw/2+115,470-sh/2+32,sw,sh);}
    else ctx.drawImage(overlay,450-w/2,470-h/2,w,h);
  }

  let fontSize=58;do{ctx.font=`${fontSize}px Georgia, serif`;if(ctx.measureText(summary.name).width<=770)break;fontSize-=2;}while(fontSize>22);
  ctx.fillStyle='#fff2fc';ctx.fillText(summary.name,450,825);ctx.fillStyle=color;ctx.font='22px system-ui, sans-serif';ctx.fillText(summary.element.toUpperCase()+' SOUL',450,870);
  ctx.strokeStyle=color+'66';ctx.beginPath();ctx.moveTo(240,908);ctx.lineTo(660,908);ctx.stroke();ctx.font='40px Georgia, serif';ctx.fillStyle='#f6e5ff';ctx.fillText(summary.xp+' CREATOR XP',450,966);
  ctx.font='16px system-ui, sans-serif';ctx.fillStyle='#bca7c8';const cardDetail=[summary.craft,summary.shield&&Object.hasOwn(SHIELDS,summary.shield)?SHIELDS[summary.shield].name:null,summary.armorPath&&Object.hasOwn(ARMOR_PATHS,summary.armorPath)?ARMOR_PATHS[summary.armorPath].name:null].filter(Boolean).join(' · ');const detail=cardDetail||'A small Soul. A story unfolding.';let detailSize=16;while(detailSize>11&&ctx.measureText(detail).width>785){detailSize--;}ctx.font=detailSize+'px system-ui, sans-serif';ctx.fillText(detail,450,1005);
  ctx.font='18px Georgia, serif';ctx.fillStyle='#e6c7ef';ctx.fillText('Small Soul. Big Journey. Brighter World.',450,1060);
  ctx.font='14px system-ui, sans-serif';ctx.fillStyle='#baa8c8';shareUrlLines(summary.url).forEach((line,i)=>ctx.fillText(line,450,1105+22*i));
  ctx.font='11px system-ui, sans-serif';ctx.fillStyle='#9989a7';ctx.fillText('LOCAL GAME SCORE · PUBLIC PROTOTYPE · NO CLOUD SAVE',450,1153);
  return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('The card could not be created.')),'image/png'));
}
