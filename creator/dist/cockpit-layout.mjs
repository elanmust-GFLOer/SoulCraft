// v0.4.4 presentation-only position profiles: no state or backup changes.
// Small offsets keep a single Soul centred in five differently shaped shells.
const PROFILES=Object.freeze({
 balanced:Object.freeze({offsetY:0,soulScale:1}),
 bastion:Object.freeze({offsetY:3,soulScale:1.03}),
 sentinel:Object.freeze({offsetY:-10,soulScale:1}),
 striker:Object.freeze({offsetY:5,soulScale:1.04}),
 titan:Object.freeze({offsetY:2,soulScale:1.02})
});
const DEFAULT=Object.freeze({offsetY:0,soulScale:1});
export function cockpitLayout(path){
 return typeof path==='string'&&Object.hasOwn(PROFILES,path)?PROFILES[path]:DEFAULT;
}
