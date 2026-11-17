import { useEffect, useRef, useState } from 'react';
import { features } from '../content/site';

/** Keep the approved desktop storytelling layout; compress only the mobile cards. */
export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<number[]>([]);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShown(features.map((_, index) => index));
      return;
    }
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.index);
        setShown(current => current.includes(index) ? current : [...current, index]);
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    const highlight = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
    }, { threshold: 0.5 });
    for (const node of refs.current) if (node) { reveal.observe(node); highlight.observe(node); }
    return () => { reveal.disconnect(); highlight.disconnect(); };
  }, []);

  return (
    <section id="approach" className="feature-background relative isolate bg-[#252720] px-5 py-12 text-white md:px-10 lg:px-16 lg:py-0">
      <div className="mx-auto grid max-w-[1300px] gap-7 lg:grid-cols-[360px_1fr] lg:gap-20 xl:gap-32">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-[720px] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/70 lg:mb-5">Our approach</p>
            <h2 className="max-w-md text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-[42px]">
              <span className="lg:hidden">What we do.</span>
              <span className="hidden lg:inline">Learn it. Make it. Share it.</span>
            </h2>
          </div>
          <div className="mt-8 hidden flex-col items-start gap-2 lg:flex">
            {features.map((item, index) => (
              <button key={item.title} type="button" onClick={() => refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className={active === index ? 'rounded-full bg-black/20 px-5 py-3 text-sm text-white' : 'rounded-full bg-black/20 px-5 py-3 text-sm text-white/50 transition hover:text-white'}>
                {item.title}
              </button>
            ))}
          </div>
          <a href="/partner" className="mt-8 hidden items-center text-sm text-white/80 lg:flex">Partner with CMEI</a>
        </div>
        <div className="grid gap-3 lg:flex lg:flex-col lg:gap-5 lg:py-24">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              data-index={index}
              ref={node => { refs.current[index] = node; }}
              className={'grid grid-cols-[104px_minmax(0,1fr)] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-2xl bg-black/25 p-3 backdrop-blur-sm transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 lg:flex lg:flex-col lg:rounded-3xl lg:p-5 xl:p-7 ' +
                (shown.includes(index) ? 'lg:translate-x-0 lg:opacity-100' : 'lg:translate-x-8 lg:opacity-0')}
            >
              <h3 className="col-start-2 row-start-1 self-end text-base font-medium leading-snug lg:order-1 lg:mb-0 lg:text-xl xl:text-2xl">{feature.title}</h3>
              <div className="col-start-1 row-span-2 row-start-1 aspect-square overflow-hidden rounded-xl bg-[#66584c] lg:order-2 lg:mt-4 lg:aspect-[16/9] lg:rounded-2xl">
                <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]" src={feature.image} alt={feature.alt} loading="lazy" decoding="async" width={800} height={450}/>
              </div>
              <p className="col-start-2 row-start-2 self-start text-[13px] leading-[1.4] text-white/75 lg:order-3 lg:mt-4 lg:max-w-lg lg:text-sm lg:font-medium lg:leading-relaxed xl:text-base">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
