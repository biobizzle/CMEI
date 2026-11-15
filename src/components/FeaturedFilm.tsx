import { THE_DARK_DIDNT_WIN } from './FilmPage';

/** The homepage feature is editorial and secondary to CMEI's existing hero. */
export default function FeaturedFilm() {
  return (
    <section className="bg-[#f6e4cf] px-5 py-12 text-[#321c04] md:px-6 md:py-16" aria-labelledby="featured-film-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em]">Film spotlight</p>
          <a href="/films" className="text-xs font-medium underline underline-offset-4">View films</a>
        </div>
        <a href={THE_DARK_DIDNT_WIN.path} className="group grid overflow-hidden rounded-[10px] bg-[#10110f] text-[#f7f4ef] md:grid-cols-[minmax(0,1.6fr)_minmax(270px,.8fr)]" aria-label="Explore The Dark Didn't Win — a Creddy Production">
          <div className="flex items-center bg-[#090909]">
            <img src={THE_DARK_DIDNT_WIN.poster} width={1672} height={941} alt="Official poster for The Dark Didn't Win" className="block aspect-[1672/941] h-auto w-full object-contain" loading="lazy" decoding="async" />
          </div>
          <div className="flex min-h-[204px] flex-col justify-between gap-5 p-6 md:min-h-[276px] md:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[.18em] text-[#d0bfa9]">A Creddy Production</p>
            <div>
              <h2 id="featured-film-heading" className="font-serif text-[33px] leading-[1.05] tracking-[-.035em] md:text-[39px]">The Dark<br /><em>Didn't Win</em></h2>
              <p className="mt-3 text-xs text-white/70">20 November 2026 at 3 PM WAT</p>
            </div>
            <span className="inline-flex w-fit border-b border-[#c6a67e] pb-1 text-xs font-semibold tracking-[.025em] transition-colors group-hover:text-[#d9b887]">Explore film</span>
          </div>
        </a>
      </div>
    </section>
  );
}