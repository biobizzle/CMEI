import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getFilmPhase,getFilmCountdown,getPremiereDisplay,createCalendarReminderUrl,getYouTubeEmbedUrl,THE_DARK_DIDNT_WIN} from '../src/components/filmCampaign.ts';
const premiere=Date.parse(THE_DARK_DIDNT_WIN.premiereISO);
test('release lifecycle guards against false availability',()=>{
  assert.equal(getFilmPhase(premiere-1000),'upcoming');
  assert.equal(getFilmPhase(premiere+1000),'awaiting_publication');
  assert.equal(getFilmPhase(premiere+1000,{premiereISO:THE_DARK_DIDNT_WIN.premiereISO,fullFilmUrl:'https://youtu.be/AbCdEfGhI12'}),'available');
  assert.equal(getFilmCountdown(premiere-60000).minutes,1);
  assert.equal(getFilmCountdown(premiere).released,true);
});
test('release calendar and local time stay consistent',()=>{
  const display=getPremiereDisplay();
  assert.match(display.day,/20 November 2026/);
  assert.equal(display.time,'3:00 PM WAT');
  const reminder=new URL(createCalendarReminderUrl('https://cmei-seven.vercel.app'));
  assert.equal(reminder.hostname,'calendar.google.com');
  assert.equal(reminder.searchParams.get('dates'),'20261120T140000Z/20261120T143000Z');
  assert.match(reminder.searchParams.get('location')??'',/the-dark-didnt-win/);
});
test('film embeds reject foreign hosts and unsafe protocols',()=>{
  assert.equal(getYouTubeEmbedUrl('https://youtu.be/AbCdEfGhI12'),'https://www.youtube-nocookie.com/embed/AbCdEfGhI12?autoplay=1&rel=0');
  assert.equal(getYouTubeEmbedUrl('https://youtube.com/watch?v=AbCdEfGhI12'),'https://www.youtube-nocookie.com/embed/AbCdEfGhI12?autoplay=1&rel=0');
  assert.equal(getYouTubeEmbedUrl('https://youtube.com.evil.test/watch?v=AbCdEfGhI12'),null);
  assert.equal(getYouTubeEmbedUrl('javascript:alert(1)'),null);
});
test('approved hero and film page visual landmarks remain',()=>{
  const hero=readFileSync('src/components/Hero.tsx','utf8');
  const film=readFileSync('src/components/FilmPage.tsx','utf8');
  assert.ok(hero.includes('h-[100svh]'));
  assert.ok(hero.includes('object-cover'));
  assert.ok(film.includes('className="film-stage"'));
  assert.ok(film.includes('className="film-sheet"'));
});
