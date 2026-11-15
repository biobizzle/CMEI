import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Play, Share2, X } from 'lucide-react';
import './FilmPage.css';

/** Verified campaign details. Do not publish an unconfirmed full-film URL. */
export const THE_DARK_DIDNT_WIN = {
  title: "The Dark Didn't Win",
  producer: 'Creddy Production',
  premiereISO: '2026-11-20T15:00:00+01:00',
  path: '/films/the-dark-didnt-win',
  poster: '/films/the-dark-didnt-win/official-poster.webp',
  teaser: '/films/the-dark-didnt-win/official-teaser.mp4',
  fullFilmUrl: '',
} as const;

const releaseAt = Date.parse(THE_DARK_DIDNT_WIN.premiereISO);
function timeLeft() {
  const minutes = Math.max(0, Math.ceil((releaseAt - Date.now()) / 60000));
  return {
    released: minutes === 0,
    days: Math.floor(minutes / 1440),
    hours: Math.floor((minutes % 1440) / 60),
    minutes: minutes % 60,
  };
}

function addCalendarReminder() {
  const eventUrl = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CMEI//Film Release//EN',
    'BEGIN:VEVENT', 'UID:the-dark-didnt-win-20261120@cmei',
    'DTSTAMP:20261115T000000Z', 'DTSTART:20261120T140000Z', 'DTEND:20261120T141500Z',
    "SUMMARY:THE DARK DIDN'T WIN - Online Premiere",
    `DESCRIPTION:Free online premiere. A Creddy Production.\\n${eventUrl}`,
    `URL:${eventUrl}`, 'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY',
    'DESCRIPTION:The film premieres in 30 minutes', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ];
  const blobUrl = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'the-dark-didnt-win-premiere.ics';
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
}

export default function FilmPage() {
  const [remaining, setRemaining] = useState(timeLeft);
  const [playBackground, setPlayBackground] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const teaserPlayer = useRef<HTMLVideoElement>(null);
  const backgroundPlayer = useRef<HTMLVideoElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fullFilmUrl] = useState(THE_DARK_DIDNT_WIN.fullFilmUrl);
  const isAvailable = remaining.released && Boolean(fullFilmUrl);

  useEffect(() => {
    document.title = "The Dark Didn't Win | CMEI Films";
    const tick = window.setInterval(() => setRemaining(timeLeft()), 30000);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const syncMotion = () => setPlayBackground(!motion.matches && !connection?.saveData);
    syncMotion();
    motion.addEventListener?.('change', syncMotion);
    return () => {
      window.clearInterval(tick);
      motion.removeEventListener?.('change', syncMotion);
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  useEffect(() => {
    const video = backgroundPlayer.current;
    if (!video) return;
    if (!playBackground || teaserOpen || document.hidden) video.pause();
    else void video.play().catch(() => { /* Autoplay may be blocked; retain the poster fallback. */ });
  }, [playBackground, teaserOpen]);

  useEffect(() => {
    const syncVisibility = () => {
      const video = backgroundPlayer.current;
      if (!video) return;
      if (document.hidden || teaserOpen || !playBackground) video.pause();
      else void video.play().catch(() => { /* Leave static artwork visible if autoplay fails. */ });
    };
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, [teaserOpen, playBackground]);

  function announce(value: string) {
    setNotice(value);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2800);
  }

  function openTeaser() {
    if (!dialog.current?.open) dialog.current?.showModal();
    setTeaserOpen(true);
    teaserPlayer.current?.play().catch(() => {});
  }
  function closeTeaser() {
    teaserPlayer.current?.pause();
    dialog.current?.close();
    setTeaserOpen(false);
  }
  async function shareFilm() {
    const url = `${window.location.origin}${THE_DARK_DIDNT_WIN.path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: THE_DARK_DIDNT_WIN.title, text: 'Free online premiere on 20 November 2026 at 3 PM WAT', url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      announce('Film link copied');
    } catch {
      announce('Copy the page address to share');
    }
  }

  return (
    <main className="film-page" id="film-top">
      <div className="film-world" aria-hidden="true">
        <div className="film-world-still" />
        {playBackground && !videoError && (
          <video
            ref={backgroundPlayer}
            className="film-world-motion"
            src={THE_DARK_DIDNT_WIN.teaser}
            autoPlay muted loop playsInline preload="metadata"
            aria-hidden="true" tabIndex={-1}
            onError={() => setVideoError(true)}
            onTimeUpdate={event => {
              // The original WhatsApp export includes black outro frames.
              // Loop the actual footage rather than its closing title cards.
              if (event.currentTarget.currentTime >= 7.45) event.currentTarget.currentTime = 0;
            }}
          />
        )}
        <div className="film-world-veil" />
      </div>

      <header className="film-header">
        <a href="/" className="film-brand" aria-label="CMEI homepage">
          <img src="/cmei-mark.png" alt="" width={30} height={30} />
          <span>CMEI <span className="film-brand-description">Films</span></span>
        </a>
        <a href="/" className="film-back">Back to CMEI</a>
      </header>

      <div className="film-stage">
        <div className="film-key-art" aria-hidden="true">
          <img src={THE_DARK_DIDNT_WIN.poster} alt="" width={1672} height={941} fetchPriority="high" decoding="async" />
        </div>
        <section className="film-sheet" aria-labelledby="film-heading">
          <div className="film-sheet-top">
            <p className="film-label">Creddy Production</p>
            <button type="button" className="film-icon-action" onClick={shareFilm} aria-label="Share this film" title="Share this film"><Share2 size={17} strokeWidth={1.5} aria-hidden="true"/></button>
          </div>

          <h1 className="film-title" id="film-heading">The Dark <em>Didn't Win</em></h1>
          <p className="film-subtitle">Free online premiere</p>
          <div className="film-release">
            <time dateTime={THE_DARK_DIDNT_WIN.premiereISO}>
              Friday, 20 November 2026 <span>3:00 PM WAT</span>
            </time>
          </div>
          {!remaining.released ? (
            <div className="film-countline">
              <span className="film-countline-label">Premieres in</span>
              <span className="film-countline-value" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes until the film premiere`}>
                <span>{remaining.days}<small>d</small></span>
                <span>{String(remaining.hours).padStart(2, '0')}<small>h</small></span>
                <span>{String(remaining.minutes).padStart(2, '0')}<small>m</small></span>
              </span>
            </div>
          ) : (
            <p className="film-release-note">{isAvailable ? 'Now available to watch free.' : 'The viewing link will be added when it is published.'}</p>
          )}

          <div className="film-actions">
            {isAvailable ? (
              <a className="film-primary" href={fullFilmUrl} target="_blank" rel="noopener noreferrer"><Play size={15} fill="currentColor" aria-hidden="true" /> Watch film</a>
            ) : (
              <button type="button" className="film-primary" onClick={openTeaser}><Play size={15} fill="currentColor" aria-hidden="true" /> Watch teaser</button>
            )}
            {!remaining.released && (
              <button type="button" className="film-reminder" onClick={() => { addCalendarReminder(); announce('Reminder added to calendar file'); }}><CalendarDays size={16} aria-hidden="true" strokeWidth={1.5} /> Remind me</button>
            )}
          </div>
        </section>
      </div>

      <dialog ref={dialog} className="film-dialog" aria-label="The Dark Didn't Win official teaser" onClose={() => { teaserPlayer.current?.pause(); setTeaserOpen(false); }} onClick={event => { if (event.target === dialog.current) closeTeaser(); }}>
        <div className="film-dialog-header"><span>Official teaser</span><button type="button" onClick={closeTeaser} aria-label="Close teaser"><X size={20}/></button></div>
        <video ref={teaserPlayer} controls playsInline preload="none" poster={THE_DARK_DIDNT_WIN.poster}>
          <source src={THE_DARK_DIDNT_WIN.teaser} type="video/mp4"/>
          Your browser does not support video playback.
        </video>
      </dialog>
      <div className={`film-toast${notice ? ' film-toast-visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </main>
  );
}