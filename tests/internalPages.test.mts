import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {cmeiAbout} from '../src/content/about.ts';

const read=(file:string)=>readFileSync(file,'utf8');

test('About page honours the July 2026 CMEI business plan',()=>{
  assert.match(cmeiAbout.purpose,/creative interest and real opportunity/i);
  assert.match(cmeiAbout.mission,/employment, entrepreneurship and community contribution/i);
  assert.match(cmeiAbout.vision,/positive change through visual storytelling/i);
  assert.equal(cmeiAbout.values.length,5);
  assert.equal(cmeiAbout.pathway.length,3);
  assert.match(cmeiAbout.pilot,/proposed first initiative/i);
  assert.match(cmeiAbout.pilot,/20–30/);
  const ui=read('src/components/AboutSection.tsx');
  assert.match(ui,/cmeiAbout\.mission/);
  assert.match(ui,/cmeiAbout\.vision/);
  assert.match(ui,/cmeiAbout\.values/);
  assert.match(ui,/people\.map/);
  assert.ok(!ui.includes('Discover CMEI'),'ambiguous self-referential CTA');
});
test('Partner page has a real contact conversion, not a circular route',()=>{
  const partner=read('src/components/PartnerContent.tsx');
  const routes=read('src/pages/StandardPages.tsx');
  assert.match(partner,/mailto:/);
  assert.match(partner,/Partnership Enquiry/);
  assert.ok(!partner.includes('href="/partner"'),'partner page must not link to itself as CTA');
  assert.match(routes,/PartnerPage\(\)\{return <PartnerContent\/>/);
});
test('Work and Films are distinct pages with truthful production attribution',()=>{
  const work=read('src/components/WorkPortfolio.tsx');
  const routes=read('src/pages/StandardPages.tsx');
  assert.match(work,/Creddy Production/);
  assert.match(work,/convener of CMEI/);
  assert.match(work,/appropriate permission/);
  assert.match(routes,/WorkPage\(\)\{return <WorkPortfolio\/>/);
  assert.match(routes,/FilmsPage\(\)/);
  assert.match(routes,/showCollectionLink=\{false\}/);
});
test('Interior footer is compact, homepage hero and film screen remain approved',()=>{
  const app=read('src/App.tsx');
  const footer=read('src/components/ContactFooter.tsx');
  const hero=read('src/components/Hero.tsx');
  const film=read('src/components/FilmPage.tsx');
  assert.match(app,/variant=\{path==='\/'\?'full':'compact'\}/);
  assert.match(footer,/variant==='compact'/);
  assert.ok(hero.includes('h-[100svh]'));
  assert.ok(film.includes('className="film-stage"'));
  assert.ok(film.includes('className="film-sheet"'));
});
