/** Promote the planned initiative without implying that enrolment is already open. */
export default function Cohort() {
  return <section className="bg-[#e6cdb3] px-5 py-12 text-[#321c04] md:px-6 md:py-20">
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:gap-10">
      <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] md:mb-6">The first initiative</p><h2 className="max-w-md text-3xl leading-[1.12] tracking-tight md:text-6xl">A week to begin something <span className="serif">bigger.</span></h2></div>
      <div className="flex flex-col items-start justify-end">
        <p className="max-w-md text-sm leading-relaxed md:text-lg">Our first planned cohort brings together 20–30 emerging creatives for five days of practical learning and storytelling.</p>
        <a href="/partner" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#fff9f2] transition hover:bg-[#1F1003] md:mt-8 md:py-4">Partner with CMEI</a>
      </div>
    </div>
  </section>;
}
