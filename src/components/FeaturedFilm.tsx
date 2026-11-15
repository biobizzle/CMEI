import { THE_DARK_DIDNT_WIN } from './FilmPage';

/** Compact discovery surface that slots into the existing CMEI homepage. */
export default function FeaturedFilm() {
  return (
    <section className="bg-[#f6e4cf] px-5 py-12 text-[#321c04] md:px-6 md:py-20" aria-labelledby="featured-film-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em]">Featured Film</p>
          <a href="/films" className="text-[11px] font-medium underline underline-offset-4">Explore films</a>
        </div>
        <a href={THE_DARK_DIDNT_WIN.path} className="group relative block min-h-[270px] overflow-hidden rounded-[20px] bg-[#080b0c] text-white md:min-h-[360px]" aria-label="Explore The Dark Didn't Win film">
          <img src={THE_DARK_DIDNT_WIN.poster} alt="The Dark Didn't Win official movie poster" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.025]" loading="lazy" decoding="async" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/5 to-transparent md:from-black/35" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 bg-gradient-to-t from-black/80 via-black/15 to-transparent p-5 pt-24 md:p-8 md:pt-36">
            <div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75">A Creddy Production · Free online premiere</p><h2 id="featured-film-title" className="font-['Instrument_Serif'] text-4xl leading-none tracking-tight sm:text-5xl">The Dark Didn't Win</h2><p className="mt-3 text-xs text-white/80">20 November 2026 · 3:00 PM WAT</p></div>
            <span className="rounded-full bg-white px-5 py-3 text-xs font-medium text-black">Explore Film</span>
          </div>
        </a>
      </div>
    </section>
  );
}
