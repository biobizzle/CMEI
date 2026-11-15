import { useEffect, useRef, useState } from 'react';
import { Share2 } from 'lucide-react';
import './FilmPage.css';

/** Film campaign assets and verified information. Replace the URL only after publication. */
export const THE_DARK_DIDNT_WIN = {
  title: "The Dark Didn't Win",
  producer: 'Creddy Production',
  premiereISO: '2026-11-20T15:00:00+01:00',
  dateLabel: '20 November 2026',
  timeLabel: 'Friday · 3:00 PM WAT (Nigeria)',
  slug: 'the-dark-didnt-win',
  path: '/films/the-dark-didnt-win',
  poster: '/films/the-dark-didnt-win/official-poster.webp',
  teaser: '/films/the-dark-didnt-win/official-teaser.mp4',
  fullFilmUrl: '', // Add the verified public YouTube/film URL after release.
} as const;

const releaseTimestamp = new Date(THE_DARK_DIDNT_WIN.premiereISO).getTime();
function getRemaining() {
  const seconds = Math.max(0, Math.floor((releaseTimestamp - Date.now()) / 1000));
  return {
    reached: seconds <= 0,
    values: [Math.floor(seconds / 86400), Math.floor((seconds % 86400) / 3600), Math.floor((seconds % 3600) / 60), seconds % 60],
  };
}

function downloadReminder() {
  const eventLink = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CMEI//Film Premiere Reminder//EN',
    'BEGIN:VEVENT', 'UID:the-dark-didnt-win-20261120@cmei',
    'DTSTAMP:20261115T090000Z', 'DTSTART:20261120T140000Z',
    'DTEND:20261120T141500Z',
    "SUMMARY:THE DARK DIDN'T WIN — Online Premiere Reminder",
    `DESCRIPTION:Free online premiere reminder. Film by Creddy Production.\\n${eventLink}`,
    `URL:${eventLink}`,
    'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY',
    'DESCRIPTION:Free online film premiere in 30 minutes',
    'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'the-dark-didnt-win-premiere.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function FilmPage() {
  const [time, setTime] = useState(getRemaining);
  const [feedback, setFeedback] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = `${THE_DARK_DIDNT_WIN.title.toUpperCase()} | CMEI Films`;
    const interval = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => () => { if (toastTimeout.current) window.clearTimeout(toastTimeout.current); }, []);

  function notify(message: string) {
    setFeedback(message);
    if (toastTimeout.current) window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => setFeedback(''), 2600);
  }
  function openTeaser() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    videoRef.current?.play().catch(() => {/* user may need to press play */});
  }
  function closeTeaser() {
    videoRef.current?.pause();
    dialogRef.current?.close();
  }
  async function shareFilm() {
    const url = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
    const details = { title: THE_DARK_DIDNT_WIN.title, text: 'Free online premiere · 20 November 2026 · 3 PM WAT', url };
    if (navigator.share) {
      try { await navigator.share(details); return; }
      catch (e) { if (e instanceof DOMException && e.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); notify('Film link copied'); }
    catch { notify('Share this page with a friend'); }
  }
  const linkIsLive = Boolean(THE_DARK_DIDNT_WIN.fullFilmUrl);
  return (
    <main className="film-page" id="film-top">
      <header className="film-site-header">
        <a href="/" className="film-brand" aria-label="CMEI homepage">
          <img src="/cmei-mark.png" alt="" width="31" height="31" />
          <span>CMEI</span>
        </a>
        <span className="film-site-line">Creative Media Empowerment Initiative · Film spotlight</span>
        <a href="/" className="film-home-link">Back to CMEI</a>
      </header>
      <div className="film-artwork" aria-hidden="true">
        <img src={THE_DARK_DIDNT_WIN.poster} alt="" decoding="async" fetchPriority="high" />
      </div>
      <div className="film-shading" aria-hidden="true" />
      <div className="film-stage">
        <section className="film-glass" id="film-info" aria-labelledby="film-heading">
          <div className="film-topline">
            <nav className="film-tabs" aria-label="Film options">
              <a className="film-active" href="#film-info" aria-current="page">Film</a>
              <button type="button" onClick={openTeaser}>Teaser</button>
              <button type="button" onClick={shareFilm}>Share</button>
            </nav>
            <button type="button" className="film-share-icon" aria-label="Share film" onClick={shareFilm}><Share2 size={14} strokeWidth={1.6}/></button>
          </div>
          <p className="film-kicker">Featured short film</p>
          <p className="film-status"><span className="film-status-pip" aria-hidden="true" />{time.reached ? (linkIsLive ? 'Now streaming free' : 'Release date reached · Link pending') : 'Free online premiere · Coming soon'}</p>
          <h1 id="film-heading">The Dark<br/>Didn't Win</h1>
          <p className="film-production">By Creddy Production</p>
          <div className="film-rule" />
          <p className="film-meta-label">The release</p>
          <p className="film-date">{THE_DARK_DIDNT_WIN.dateLabel}</p>
          <p className="film-time">{THE_DARK_DIDNT_WIN.timeLabel}</p>
          {time.reached ? (
            <p className="film-premiere-note">{linkIsLive ? 'The film is available online now.' : 'The full film link will be added once it is published.'}</p>
          ) : (
            <>
              <p className="film-count-label">Premiere begins in</p>
              <div className="film-countdown" aria-label="Time until the online film premiere">
                {time.values.map((value, i) => <div className="film-count-unit" key={['days','hours','minutes','seconds'][i]}><strong>{String(value).padStart(2,'0')}</strong><small>{['Days','Hours','Mins','Secs'][i]}</small></div>)}
              </div>
            </>
          )}
          <div className="film-actions">
            {linkIsLive && time.reached ? <a href={THE_DARK_DIDNT_WIN.fullFilmUrl} target="_blank" rel="noopener noreferrer" className="film-primary-action">Watch full film</a> : <button type="button" className="film-primary-action" onClick={openTeaser}>Watch teaser</button>}
            <button type="button" className="film-secondary-action" onClick={() => { downloadReminder(); notify('Calendar reminder saved'); }}>Add reminder</button>
          </div>
          <p className="film-supporting-copy">{time.reached ? 'Explore the official teaser while the film link is being confirmed.' : 'Watch the official teaser ahead of the free online release.'}</p>
          <div className="film-credits">
            <span><strong>Creddy Production</strong>Official production credit</span>
            <span><strong>Featured by CMEI</strong>Creative works & films</span>
          </div>
        </section>
      </div>
      <span className="film-poster-note" aria-hidden="true"><span /> Official film poster</span>
      <p className="film-page-footer">THE DARK DIDN'T WIN <span>· 20.11.2026 · 15:00 WAT</span></p>
      <dialog ref={dialogRef} className="film-teaser-dialog" onClose={() => videoRef.current?.pause()} onClick={(e) => { if (e.target === dialogRef.current) closeTeaser(); }} aria-label="The Dark Didn't Win official teaser">
        <div className="film-dialog-head"><strong>Official teaser</strong><button onClick={closeTeaser} type="button">Close</button></div>
        <video ref={videoRef} controls playsInline preload="none" poster={THE_DARK_DIDNT_WIN.poster}><source src={THE_DARK_DIDNT_WIN.teaser} type="video/mp4" />Your browser does not support the video player.</video>
        <p>The Dark Didn't Win · Creddy Production</p>
      </dialog>
      <div className={`film-feedback${feedback ? ' film-feedback-visible' : ''}`} role="status" aria-live="polite">{feedback}</div>
    </main>
  );
}
