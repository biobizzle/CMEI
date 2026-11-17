import {contact} from '../content/site';

const partnerships = [
  {title:'Support training',description:'Help cover the cost of training and learning.'},
  {title:'Provide equipment',description:'Share cameras, microphones, lights, software or internet access.'},
  {title:'Offer a space',description:'Help provide places for classes and filming.'},
  {title:'Be a mentor',description:'Teach, demonstrate or guide emerging creators.'},
  {title:'Open new doors',description:'Offer internships, referrals or actual projects.'},
] as const;

const enquiry = 'mailto:' + contact.email +
  '?subject=' + encodeURIComponent('CMEI Partnership Enquiry') +
  '&body=' + encodeURIComponent('Hello CMEI team,\n\nI would like to discuss supporting the Creative Media Empowerment Initiative.\n\nOrganisation / name:\nType of support:\n\nThank you.');

export default function PartnerContent() {
  return <div className="bg-[#f6e4cf] text-[#321c04]">
    <section className="px-5 pb-12 pt-11 md:px-6 md:pb-16 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-end gap-7 md:grid-cols-[1.25fr_.75fr] md:gap-14">
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em]">Partner with CMEI</p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5.1rem)] leading-[1.06] tracking-[-.045em]">Help young creators <span className="serif">go further.</span></h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-[#321c04]/80 md:text-lg">CMEI helps young people learn photography, filmmaking and storytelling. With your support, more aspiring creators can get the tools, guidance and experience they need.</p>
          <a href={enquiry} className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium text-[#fff9f2] hover:bg-[#1f1003]">Start a partnership conversation</a>
        </div>
        <aside className="rounded-[18px] border border-[#321c04]/20 p-5 md:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em]">Our first planned programme</p>
          <p className="mt-3 font-serif text-2xl leading-[1.2] tracking-tight md:text-3xl">A week of hands-on learning.</p>
          <p className="mt-3 text-sm leading-[1.65] text-[#321c04]/75">We are preparing training in photography, video and storytelling. Dates and applications will be announced when confirmed.</p>
        </aside>
      </div>
    </section>

    <section aria-labelledby="partnership-pathways" className="bg-[#e9d3ba] px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-12">
          <h2 id="partnership-pathways" className="text-3xl tracking-tight md:text-5xl">Where you can make a <span className="serif">difference.</span></h2>
          <p className="max-w-md text-sm leading-relaxed text-[#321c04]/75">You can give equipment, offer your time, share a space or help fund training.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partnerships.map(item=><article key={item.title} className="flex min-h-[142px] flex-col justify-between rounded-[14px] bg-[#f6e4cf] p-5">
            <div><h3 className="text-lg font-medium leading-tight">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#321c04]/75">{item.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="partnership-outcome" className="px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <h2 id="partnership-outcome" className="text-3xl leading-[1.12] tracking-tight md:text-5xl">See the difference your support <span className="serif">makes.</span></h2>
        <div>
          <p className="text-base leading-[1.7] text-[#321c04]/85">We want learners to make real work, receive guidance and leave with something they can show. After the programme, partners will receive a clear account of what their support helped make possible.</p>
          <p className="mt-4 text-sm leading-[1.65] text-[#321c04]/70">We'll agree on how partners are recognised and always respect people's permission before sharing their stories.</p>
          <a href={enquiry} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium text-[#fff9f2] hover:bg-[#1f1003]">Enquire about partnering</a>
        </div>
      </div>
    </section>
  </div>;
}
