/** The one canonical source for release details, presentation and CTAs. */
export const THE_DARK_DIDNT_WIN = {
  title: "The Dark Didn't Win",
  producer: 'Creddy Production',
  premiereISO: '2026-11-20T15:00:00+01:00',
  timeZone: 'Africa/Lagos',
  path: '/films/the-dark-didnt-win',
  poster: '/films/the-dark-didnt-win/official-poster.webp',
  teaser: '/films/the-dark-didnt-win/official-teaser.mp4',
  fullFilmUrl: '', // Publish only the verified public URL when the film is live.
} as const;

export type FilmPhase = 'upcoming' | 'awaiting_publication' | 'available';
const premiereTime = Date.parse(THE_DARK_DIDNT_WIN.premiereISO);

export function getFilmPhase(now: number = Date.now(), film: {premiereISO:string;fullFilmUrl:string} = THE_DARK_DIDNT_WIN): FilmPhase {
  const releaseTime = Date.parse(film.premiereISO);
  if (!Number.isFinite(releaseTime)) throw new Error('Invalid film premiereISO');
  if (now < releaseTime) return 'upcoming';
  return film.fullFilmUrl.trim() ? 'available' : 'awaiting_publication';
}

export function getFilmCountdown(now: number = Date.now()) {
  const minutes = Math.max(0, Math.ceil((premiereTime - now) / 60000));
  return {
    released: minutes === 0,
    days: Math.floor(minutes / 1440),
    hours: Math.floor((minutes % 1440) / 60),
    minutes: minutes % 60,
  };
}

export function getPremiereDisplay() {
  const date = new Date(premiereTime);
  const day = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: THE_DARK_DIDNT_WIN.timeZone }).format(date);
  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: THE_DARK_DIDNT_WIN.timeZone }).format(date) + ' WAT';
  return { day, time };
}

function calendarUtc(value: number) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

/** Google Calendar opens a pre-filled editor; the visitor confirms by tapping Save. */
export function createCalendarReminderUrl(origin: string) {
  const url = new URL(THE_DARK_DIDNT_WIN.path, origin).toString();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: "THE DARK DIDN'T WIN | Free online premiere",
    dates: calendarUtc(premiereTime) + '/' + calendarUtc(premiereTime + 30 * 60 * 1000),
    stz: THE_DARK_DIDNT_WIN.timeZone,
    etz: THE_DARK_DIDNT_WIN.timeZone,
    details: 'Free online premiere by ' + THE_DARK_DIDNT_WIN.producer + '. Watch on CMEI: ' + url,
    location: url,
  });
  return 'https://calendar.google.com/calendar/r/eventedit?' + params.toString();
}

/** Only approved YouTube URL formats can be placed in our embedded player. */
export function getYouTubeEmbedUrl(publicUrl: string): string | null {
  if (!publicUrl) return null;
  try {
    const url = new URL(publicUrl);
    const host = url.hostname.toLowerCase();
    let videoId: string | null = null;
    if (host === 'youtu.be') videoId = url.pathname.slice(1);
    if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
      videoId = url.pathname === '/watch' ? url.searchParams.get('v') : (url.pathname.startsWith('/live/') || url.pathname.startsWith('/embed/')) ? url.pathname.split('/')[2] : null;
    }
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;
    return 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
  } catch { return null; }
}
