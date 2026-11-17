import {Mail, Phone} from 'lucide-react';
import {contact} from '../content/site';

/** Two distinct contact routes without exposing unlabelled duplicate phone icons. */
export default function ContactFooter() {
  return (
    <section id="contact" className="bg-[#f6e4cf] px-5 pt-14 text-[#321c04] md:px-6 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em]">Create with us</p>
        <div className="grid items-end gap-5 md:grid-cols-[1.5fr_1fr] md:gap-8">
          <h2 className="max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">Make the next story <span className="serif">possible.</span></h2>
          <p className="max-w-sm text-sm leading-relaxed">Partner with CMEI through mentorship, equipment, venues, funding or creative opportunities.</p>
        </div>
        <div className="mt-7 flex items-center gap-3" aria-label="Contact CMEI">
          <a href={'mailto:' + contact.email} aria-label={'Email CMEI at ' + contact.email} title="Email CMEI" className="grid h-11 w-11 place-items-center rounded-full border border-[#321c04]/30 text-[#321c04] transition-colors hover:bg-[#321c04] hover:text-[#fff9f2]"><Mail size={18} aria-hidden="true"/></a>
          <details className="group relative">
            <summary aria-label="Choose a CMEI phone number" title="Call CMEI" className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-[#321c04]/30 text-[#321c04] transition-colors hover:bg-[#321c04] hover:text-[#fff9f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden"><Phone size={18} aria-hidden="true"/></summary>
            <div className="absolute bottom-[calc(100%+10px)] left-0 z-20 w-48 rounded-xl border border-[#321c04]/15 bg-[#fff9f2] p-2 shadow-lg">
              {contact.phoneNumbers.map(phone => <a key={phone.href} href={phone.href} className="block rounded-lg px-3 py-3 text-sm hover:bg-[#321c04]/10">{phone.display}</a>)}
            </div>
          </details>
        </div>
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#321c04]/20 py-6 text-xs text-[#321c04]/75 md:mt-20">
          <a href="/" aria-label="CMEI — Creative Media Empowerment Initiative" className="flex items-center gap-3">
            <img src="/cmei-logo.png" alt="" width={112} height={102} loading="lazy" decoding="async" className="h-auto w-[80px] shrink-0 sm:w-[100px]"/>
            <span className="max-w-[185px] leading-relaxed">© {new Date().getFullYear()} Creative Media Empowerment Initiative</span>
          </a>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
            <a href="/about">About</a><a href="/work">Work</a><a href="/films">Films</a><a href="/#people">People</a><a href="#top">Back to top</a>
          </nav>
        </footer>
        <div aria-hidden="true" className="overflow-hidden text-center text-[clamp(6rem,25vw,22rem)] font-semibold leading-[.72] tracking-[-.09em]">CMEI.</div>
      </div>
    </section>
  );
}
