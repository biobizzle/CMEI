import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Play, Share2, X } from 'lucide-react';
import './FilmPage.css';
import { THE_DARK_DIDNT_WIN } from './filmCampaign';

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

/** Opening this pre-filled event does not create it: the visitor must tap Save in Calendar. */
function calendarReminderUrl() {
  const eventUrl = new URL(THE_DARK_DIDNT_WIN.path, window.location.origin).toString();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: "THE DARK DIDN'T WIN | Free online premiere",
    dates: '20261120T140000Z/20261120T143000Z',
    stz: 'Africa/Lagos',
    etz: 'Africa/Lagos',
    details: `Free online premiere by Creddy Production, Friday 20 November 2026 at 3:00 PM WAT. Watch on CMEI: ${eventUrl}`,
    location: eventUrl,
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

export default function FilmPage() {
  const [remaining, setRemaining] = useState(timeLeft);
  const [playBackground, setPlayBackground] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
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
    type NetworkConnection = EventTarget & { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection;
    let delay: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    let disposed = false;
    const cancelPending = () => {
      if (delay !== undefined) window.clearTimeout(delay);
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      delay = undefined;
      idleId = undefined;
    };
    const syncMotion = () => {
      cancelPending();
      const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');
      if (motion.matches || connection?.saveData || slowConnection) {
        setPlayBackground(false);
        setVideoReady(false);
        return;
      }
      // Render the essential film page first; only mount/download decorative video after idle.
      delay = window.setTimeout(() => {
        const loadMotion = () => { if (!disposed) setPlayBackground(true); };
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(loadMotion, { timeout: 1600 });
        } else {
          loadMotion();
        }
      }, connection?.effectiveType === '3g' ? 2600 : 750);
    };
    const beginAfterLoad = () => syncMotion();
    if (document.readyState === 'complete') syncMotion();
    else window.addEventListener('load', beginAfterLoad, { once: true });
    motion.addEventListener?.('change', syncMotion);
    connection?.addEventListener?.('change', syncMotion);
    return () => {
      disposed = true;
      cancelPending();
      window.clearInterval(tick);
      window.removeEventListener('load', beginAfterLoad);
      motion.removeEventListener?.('change', syncMotion);
      connection?.removeEventListener?.('change', syncMotion);
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
            autoPlay muted loop playsInline preload="none"
            data-ready={videoReady}
            aria-hidden="true" tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onError={() => { setVideoError(true); setVideoReady(false); }}
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
              <a className="film-reminder" href={calendarReminderUrl()} target="_blank" rel="noopener noreferrer" aria-label="Set a premiere reminder in Google Calendar. Tap Save to confirm." title="Opens Google Calendar; tap Save to confirm"><CalendarDays size={16} aria-hidden="true" strokeWidth={1.5} /> Set reminder</a>
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