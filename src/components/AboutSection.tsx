import {people} from '../content/site';
import {cmeiAbout} from '../content/about';

export default function AboutSection() {
  return <div id="about" className="bg-[#f6e4cf] text-[#321c04]">
    <section aria-labelledby="about-heading" className="px-5 pb-12 pt-11 md:px-6 md:pb-20 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-end gap-9 md:grid-cols-[1.45fr_.75fr] md:gap-16">
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em]">About CMEI</p>
          <h1 id="about-heading" className="max-w-3xl text-[clamp(2.55rem,6vw,5.5rem)] leading-[1.04] tracking-[-.045em]">A place to learn. A chance to <span className="serif">create.</span></h1>
          <p className="mt-6 max-w-[680px] text-[15px] leading-[1.75] text-[#321c04]/80 md:mt-8 md:text-lg">{cmeiAbout.purpose}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="/approach" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium text-[#fff9f2] transition-colors hover:bg-[#1f1003]">Explore what we do</a>
            <a href="/partner" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#321c04]/30 px-6 py-3 text-xs font-medium transition-colors hover:bg-[#321c04]/10">Partner with CMEI</a>
          </div>
        </div>
        <aside className="rounded-[20px] bg-[#292a24] p-6 text-[#fff9f2] md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#f6e4cf]/65">Why CMEI exists</p>
          <p className="mt-4 font-serif text-[27px] leading-[1.25] md:text-[33px]">Talent needs more than a chance.</p>
          <p className="mt-4 text-sm leading-[1.7] text-[#fff9f2]/75">{cmeiAbout.challenge}</p>
        </aside>
      </div>
    </section>

    <section aria-labelledby="path-heading" className="bg-[#292a24] px-5 py-12 text-[#fff9f2] md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/60">How we help</p>
            <h2 id="path-heading" className="max-w-lg text-3xl leading-[1.15] tracking-tight md:text-5xl">Learn by making.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/70">{cmeiAbout.response}</p>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[16px] bg-white/15 md:mt-10 md:grid-cols-3">
          {cmeiAbout.pathway.map(step=><div key={step.title} className="bg-[#292a24] p-5 md:p-7">
            <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{step.detail}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="direction-heading" className="px-5 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.18em]">What guides us</p>
        <h2 id="direction-heading" className="mb-8 max-w-3xl text-3xl leading-[1.14] tracking-tight md:mb-12 md:text-5xl">What we <span className="serif">believe.</span></h2>
        <div className="grid gap-6 border-t border-[#321c04]/20 pt-7 md:grid-cols-2 md:gap-14">
          <div><h3 className="text-xs font-semibold uppercase tracking-[.16em]">Our mission</h3><p className="mt-4 text-lg leading-[1.55] md:text-xl">{cmeiAbout.mission}</p></div>
          <div><h3 className="text-xs font-semibold uppercase tracking-[.16em]">Our vision</h3><p className="mt-4 text-lg leading-[1.55] md:text-xl">{cmeiAbout.vision}</p></div>
        </div>
        <div className="mt-12 border-t border-[#321c04]/20 pt-7 md:mt-16">
          <h3 className="text-xs font-semibold uppercase tracking-[.16em]">What matters to us</h3>
          <div className="mt-5 grid gap-x-10 md:grid-cols-2">
            {cmeiAbout.values.map(value=><div key={value.title} className="border-b border-[#321c04]/15 py-4">
              <div><h4 className="text-sm font-semibold">{value.title}</h4><p className="mt-1 text-sm leading-relaxed text-[#321c04]/70">{value.detail}</p></div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="people-heading" className="bg-[#e8d1b7] px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em]">People behind the initiative</p><h2 id="people-heading" className="text-3xl leading-[1.1] tracking-tight md:text-5xl">Meet the people <span className="serif">behind CMEI.</span></h2></div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {people.map(person=><article key={person.name} className="min-w-0">
            <div className="aspect-[4/5] overflow-hidden rounded-[14px] bg-[#cab49e]">
              <img src={person.image} alt={'Portrait of '+person.name} loading="lazy" decoding="async" width={400} height={500} className="h-full w-full object-cover object-[center_20%]"/>
            </div>
            <h3 className="mt-3 text-sm font-semibold leading-snug">{person.name}</h3>
            <p className="mt-1 text-xs leading-[1.45] text-[#321c04]/70">{person.role}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="next-heading" className="px-5 py-11 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
        <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em]">What comes next</p><h2 id="next-heading" className="max-w-lg text-2xl tracking-tight md:text-4xl">Our first training programme.</h2></div>
        <p className="max-w-xl text-sm leading-[1.7] text-[#321c04]/75">{cmeiAbout.pilot}</p>
      </div>
    </section>
  </div>;
}
