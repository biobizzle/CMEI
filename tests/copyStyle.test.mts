import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(name:string)=>readFileSync(name,'utf8');
const publicContent=[
  'src/components/AboutSection.tsx',
  'src/components/PartnerContent.tsx',
  'src/components/WorkPortfolio.tsx',
  'src/components/FeaturesSection.tsx',
  'src/components/Cohort.tsx',
  'src/pages/StandardPages.tsx',
  'src/content/about.ts',
  'src/content/site.ts',
].map(read).join('\n');

test('About and Partner have no decorative numeric card labels',()=>{
  for (const component of ['AboutSection','PartnerContent']) {
    const source=read('src/components/'+component+'.tsx');
    assert.doesNotMatch(source,/padStart\(2/);
    assert.doesNotMatch(source,/\{String\(index\s*\+\s*1\)/);
  }
});

test('visitor-facing copy avoids internal planning language',()=>{
  for (const term of ['assessed learner projects','enterprise preparation','grounded in evidence','post-cohort report','professional pathway','first proposed initiative','portfolio-ready projects','creative briefs']) {
    assert.ok(!publicContent.toLowerCase().includes(term.toLowerCase()),'unexpected phrase: '+term);
  }
});

test('approved film and homepage hero remain unchanged',()=>{
  const hero=read('src/components/Hero.tsx');
  const film=read('src/components/FilmPage.tsx');
  assert.match(hero,/h-\[100svh\]/);
  assert.match(film,/className="film-stage"/);
  assert.match(film,/className="film-sheet"/);
  assert.match(film,/film-countline-value/);
});
