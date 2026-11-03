import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {SOULCRAFT_URL} from './dist/portability.mjs';

const here=dirname(fileURLToPath(import.meta.url));
const fromDist=path=>readFileSync(join(here,'dist',path));
const manifest=JSON.parse(fromDist('manifest.webmanifest').toString('utf8'));
const html=fromDist('index.html').toString('utf8');
const app=fromDist('app.mjs').toString('utf8');

test('PWA manifest is scoped to public Creator and is standalone',()=>{
  assert.equal(manifest.start_url,'/SoulCraft/creator/dist/');
  assert.equal(manifest.scope,'/SoulCraft/creator/dist/');
  assert.equal(manifest.display,'standalone');
  assert.match(html,/rel="manifest" href="manifest.webmanifest"/);
  assert.match(html,/id="install-soulcraft"/);
  assert.match(app,/beforeinstallprompt/);
});
test('home screen PNG icons exist at their advertised dimensions',()=>{
  for(const icon of manifest.icons){
    assert.match(icon.src,/^icons\/icon-(192|512)\.png$/);
    const png=fromDist(icon.src);
    assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
    assert.equal(`${width}x${height}`,icon.sizes);
  }
});
test('public share address points to GitHub Pages, not owner-private test Site',()=>{
  assert.equal(SOULCRAFT_URL,'https://elanmust-gfloer.github.io/SoulCraft/');
  assert.match(html,/public Creator opens on GitHub Pages/);
});
