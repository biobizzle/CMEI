import { useRef, useState } from 'react';
import { people } from '../content/site';

export default function PeopleRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [interacting, setInteracting] = useState(false);
  return (
    <section id="people" className="overflow-hidden bg-[#f6e4cf] py-14 text-[#321c04] md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em]">The people behind CMEI</p>
        <h2 className="text-4xl tracking-tight sm:text-6xl md:text-7xl">Better, <span className="serif">together.</span></h2>
      </div>
      <div
        ref={railRef}
        className="people-window mt-7 md:mt-10"
        role="region"
        aria-label="CMEI leadership portraits. Swipe to explore or use the left and right arrow keys."
        tabIndex={0}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        onPointerCancel={() => setInteracting(false)}
        onPointerLeave={() => setInteracting(false)}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          setInteracting(true);
          railRef.current?.scrollBy({ left: event.key === 'ArrowRight' ? 220 : -220, behavior: 'smooth' });
        }}
        onBlur={() => setInteracting(false)}
      >
        <div className={'people-track' + (interacting ? ' is-paused' : '')}>
          {[0, 1].map(copy => (
            <div className="people-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {people.map(person => (
                <article className="people-card" key={copy + '-' + person.name}>
                  <div className="people-photo">
                    <img src={person.image} alt={copy === 0 ? 'Portrait of ' + person.name : ''} loading="lazy" decoding="async" width={400} height={500}/>
                  </div>
                  <h3 className="mt-3 text-sm font-medium leading-tight md:mt-4 md:text-lg">{person.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#321c04]/70 md:mt-2 md:text-sm">{person.role}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
