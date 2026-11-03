import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {shareUrlLines} from './dist/share-card.mjs';
import {shareSummary} from './dist/portability.mjs';
import {emptyState} from './dist/model.mjs';
test('newly shared GitHub link is rendered completely',()=>{const url='https://elanmust-gfloer.github.io/SoulCraft/';assert.equal(shareUrlLines(url).join(''),url);});
test('Earth morphology assets and renderer references exist',()=>{for(const name of ['earth-mantle.svg','earth-crown.svg'])assert.match(readFileSync(new URL('./dist/assets/'+name,import.meta.url),'utf8'),/<svg/);const app=readFileSync(new URL('./dist/app.mjs',import.meta.url),'utf8');assert.match(app,/earthEvolution\(state\)/);assert.match(app,/earth-crown/);});
test('new visual stage leaves private goal out of share payload',()=>{const state={...emptyState(),born:true,origin:'earth',name:'StoneR',events:[{day:'2026-11-02',goal:'PRIVATE',xp:40},{day:'2026-11-03',goal:'PRIVATE2',xp:40}]};const summary=shareSummary(state);assert.equal(summary.xp,80);assert.equal(JSON.stringify(summary).includes('PRIVATE'),false);});
