import { THE_DARK_DIDNT_WIN, getPremiereDisplay } from './filmCampaign';

export default function WorkPortfolio() {
  const release=getPremiereDisplay();
  return <div className="bg-[#f6e4cf] text-[#321c04]">
    <section className="px-5 pb-10 pt-11 md:px-6 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em]">Selected work</p>
        <h1 className="max-w-4xl text-[clamp(2.55rem,6vw,5.2rem)] leading-[1.05] tracking-[-.045em]">Stories worth <span className="serif">sharing.</span></h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-[#321c04]/75 md:text-lg">Films and creative work connected to CMEI belong here. As our programmes grow, we'll also share projects made by learners, with their names and permission.</p>
      </div>
    </section>
    <section aria-labelledby="selected-film" className="px-5 pb-12 md:px-6 md:pb-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[18px] bg-[#151513] text-[#f8f4ed] md:grid md:grid-cols-[minmax(0,1.45fr)_minmax(0,.8fr)]">
        <a href={THE_DARK_DIDNT_WIN.path} aria-label="View The Dark Didn't Win film details" className="block overflow-hidden bg-black">
          <img src={THE_DARK_DIDNT_WIN.poster} alt="Official poster for The Dark Didn't Win, a Creddy Production" width={1672} height={941} loading="lazy" decoding="async" className="h-auto w-full object-cover md:h-full"/>
        </a>
        <div className="flex flex-col justify-between gap-7 p-6 md:p-9">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[.18em] text-[#ead0ac]">Featured film</p>
            <h2 id="selected-film" className="mt-5 font-serif text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.05] tracking-[-.04em]">The Dark<br/><em>Didn't Win</em></h2>
            <p className="mt-5 text-sm leading-[1.65] text-white/75">A Creddy Production by the convener of CMEI.</p>
            <p className="mt-4 text-xs text-white/60">Online release: {release.day} · {release.time}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={THE_DARK_DIDNT_WIN.path} className="inline-flex min-h-11 items-center rounded-full bg-[#fff9f2] px-6 py-3 text-xs font-semibold text-[#151513] transition hover:bg-white/85">Explore the film</a>
            <a href="/films" className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 py-3 text-xs font-medium text-white transition hover:bg-white/10">Browse films</a>
          </div>
        </div>
      </div>
    </section>
    <section className="border-t border-[#321c04]/15 px-5 py-9 md:px-6 md:py-12" aria-labelledby="work-standard">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <h2 id="work-standard" className="text-xl leading-tight tracking-tight md:text-2xl">Every story has a maker.</h2>
        <p className="max-w-xl text-sm leading-[1.7] text-[#321c04]/75">We'll share work made by learners when it's ready, always with their permission and proper credit.</p>
      </div>
    </section>
  </div>;
}
