import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const seo=JSON.parse(readFileSync('src/content/siteMeta.json','utf8'));
test('public routes have unique titles and crawler-readable metadata',()=>{
  const titles=new Set();
  for(const [route,meta] of Object.entries(seo)){
    assert.ok(meta.title&&meta.description&&meta.image,route);
    assert.ok(!titles.has(meta.title),'duplicate title '+meta.title);
    titles.add(meta.title);
    if(route==='/')continue;
    const target='generated-entries/'+(route==='/films/the-dark-didnt-win'?'the-dark-didnt-win':route.slice(1))+'.html';
    assert.ok(existsSync(target),'missing '+target);
    const html=readFileSync(target,'utf8');
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes('rel="canonical"'));
    assert.ok(html.includes('<title>'+meta.title.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'</title>'));
  }
});
