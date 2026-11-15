import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Play, Share2, X } from 'lucide-react';
import './FilmPage.css';

/** Officially confirmed campaign details. Do not invent a film synopsis or viewing URL. */
export const THE_DARK_DIDNT_WIN = {
  title: "The Dark Didn't Win",
  producer: 'Creddy Production',
  premiereISO: '2026-11-20T15:00:00+01:00',
  dateLabel: '20 November 2026',
  timeLabel: 'Friday · 3:00 PM WAT',
  slug: 'the-dark-didnt-win',
  path: '/films/the-dark-didnt-win',
  poster: '/films/the-dark-didnt-win/official-poster.webp',
  teaser: '/films/the-dark-didnt-win/official-teaser.mp4',
  fullFilmUrl: '', // Populate only when a verified public watch URL exists.
} as const;

const releaseAt = new Date(THE_DARK_DIDNT_WIN.premiereISO).getTime();
function remainingTime() {
  const remaining = Math.max(0, Math.floor((releaseAt - Date.now()) / 1000));
  return {
    reached: remaining === 0,
    values: [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60],
  };
}

function saveReminder() {
  const url = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CMEI//Film Premiere//EN',
    'BEGIN:VEVENT', 'UID:the-dark-didnt-win-20261120@cmei',
    'DTSTAMP:20261115T000000Z', 'DTSTART:20261120T140000Z', 'DTEND:20261120T141500Z',
    "SUMMARY:THE DARK DIDN'T WIN — Free Online Film Premiere",
    `DESCRIPTION:Reminder for the film's online release. A Creddy Production.\\n${url}`,
    `URL:${url}`, 'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-PT30M',
    'DESCRIPTION:Film premiere reminder in 30 minutes',
    'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ];
  const blobURL = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
  const download = document.createElement('a');
  download.href = blobURL;
  download.download = 'the-dark-didnt-win.ics';
  document.body.appendChild(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobURL), 1000);
}

export default function FilmPage() {
  const [countdown, setCountdown] = useState(remainingTime);
  const [notice, setNotice] = useState('');
  const modal = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = `${THE_DARK_DIDNT_WIN.title} — CMEI Film Spotlight`;
    const tick = window.setInterval(() => setCountdown(remainingTime()), 1000);
    return () => window.clearInterval(tick);
  }, []);
  useEffect(() => () => { if (noticeTimer.current) window.clearTimeout(noticeTimer.current); }, []);

  function announce(message: string) {
    setNotice(message);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2800);
  }
  function playTeaser() {
    if (!modal.current?.open) modal.current?.showModal();
    player.current?.play().catch(() => { /* Native player controls remain available. */ });
  }
  function closeTeaser() {
    player.current?.pause();
    modal.current?.close();
  }
  async function shareFilm() {
    const url = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: THE_DARK_DIDNT_WIN.title, text: 'Premieres free online · 20 Nov 2026 · 3 PM WAT', url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      announce('Film link copied');
    } catch {
      announce('Copy the page URL to share the film');
    }
  }

  const available = countdown.reached && Boolean(THE_DARK_DIDNT_WIN.fullFilmUrl);
  return (
    <main className="film-page" id="film-top">
      <div className="film-ambient" aria-hidden="true" />
      <header className="film-header">
        <a href="/" className="film-brand" aria-label="CMEI homepage">
          <img src="/cmei-mark.png" alt="" width={27} height={27} />
          <span>CMEI <span className="film-brand-slash">/</span> Films</span>
        </a>
        <span className="film-header-caption">Independent cinema <span>/</span> Featured release 001</span>
        <a href="/" className="film-back">Back to CMEI</a>
      </header>

      <div className="film-experience">
        <figure className="film-visual" aria-label="The Dark Didn't Win official poster">
          <div className="film-poster">
            <img
              src={THE_DARK_DIDNT_WIN.poster}
              alt="Official poster for The Dark Didn't Win, showing a close-up portrait in amber and blue lighting beside the film title"
              fetchPriority="high"
              decoding="async"
              width={1672} height={941}
            />
          </div>
          <figcaption className="film-visual-caption">
            <span><i aria-hidden="true" /> Official key art</span>
            <span>Creddy Production <span aria-hidden="true">/</span> 2026</span>
          </figcaption>
        </figure>

        <section className="film-panel" aria-labelledby="film-title">
          <div className="film-panel-head">
            <p>Featured film <span>·</span> No. 001</p>
            <button type="button" className="film-icon-button" aria-label="Share film" title="Share film" onClick={shareFilm}><Share2 size={17} strokeWidth={1.5}/></button>
          </div>
          <div className="film-title-block">
            <p className="film-overline">An independent short film</p>
            <h1 id="film-title">The Dark<br /><em>Didn't Win</em></h1>
            <p className="film-produced">A Creddy Production</p>
          </div>
          <div className="film-schedule">
            <p className="film-eyebrow">Free online premiere</p>
            <div className="film-release-row">
              <span className="film-day">20</span>
              <div className="film-date-details"><span>November 2026</span><span>Friday · 3:00 PM WAT</span></div>
              <span className="film-status" aria-label={available ? 'Now available' : countdown.reached ? 'Watch link pending' : 'Coming soon'}>
                <span className="film-dot" aria-hidden="true" />{available ? 'Live' : countdown.reached ? 'Pending' : 'Soon'}
              </span>
            </div>
          </div>
          <div className="film-count-area">
            <p className="film-eyebrow">{countdown.reached ? 'Release status' : 'Premiere in'}</p>
            {countdown.reached ? <p className="film-release-message">{available ? 'The film is now available to watch.' : 'The official viewing link will be added when published.'}</p> : (
              <div className="film-clock" role="timer" aria-label="Countdown to Friday 20 November 2026, 3 PM West Africa Time">
                {countdown.values.map((v, index) => (
                  <div key={['days', 'hours', 'minutes', 'seconds'][index]} className="film-clock-unit">
                    <span>{String(v).padStart(2, '0')}</span>
                    <small>{['Days', 'Hrs', 'Min', 'Sec'][index]}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="film-cta-row">
            {available ? (
              <a className="film-watch" href={THE_DARK_DIDNT_WIN.fullFilmUrl} target="_blank" rel="noopener noreferrer"><Play size={15} fill="currentColor" aria-hidden="true"/> Watch full film</a>
            ) : (
              <button className="film-watch" type="button" onClick={playTeaser}><Play size={15} fill="currentColor" aria-hidden="true"/> Watch teaser</button>
            )}
            <button className="film-remind" type="button" onClick={() => {saveReminder(); announce('Calendar reminder saved');}}><CalendarDays size={15} strokeWidth={1.6} aria-hidden="true"/> Add reminder</button>
          </div>
          <div className="film-panel-bottom"><span>By Creddy Production</span><span>Featured on CMEI</span></div>
        </section>
      </div>
      <footer className="film-footer"><span>THE DARK DIDN'T WIN</span><span>20 / 11 / 2026 <span aria-hidden="true">·</span> 15:00 WAT</span></footer>
      <dialog ref={modal} className="film-dialog" aria-label="The Dark Didn't Win official teaser" onClose={() => player.current?.pause()} onClick={event => {if (event.target === modal.current) closeTeaser();}}>
        <div className="film-dialog-head"><div><small>CREDDY PRODUCTION</small><strong>Official teaser</strong></div><button type="button" onClick={closeTeaser} aria-label="Close teaser"><X size={21}/></button></div>
        <video ref={player} controls playsInline preload="none" poster={THE_DARK_DIDNT_WIN.poster}><source src={THE_DARK_DIDNT_WIN.teaser} type="video/mp4" />Your browser does not support video playback.</video>
      </dialog>
      <div className={`film-notice${notice ? ' film-notice-visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </main>
  );
}