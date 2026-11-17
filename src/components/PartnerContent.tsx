import {contact} from '../content/site';

const partnerships = [
  {title:'Fund access',description:'Help underwrite practical training and scholarship places.'},
  {title:'Equip a learning station',description:'Provide cameras, audio, lighting, software or connectivity.'},
  {title:'Host learning',description:'Support venues, power and production facilities.'},
  {title:'Share expertise',description:'Contribute mentorship, demonstrations or practitioner feedback.'},
  {title:'Open opportunities',description:'Offer internships, referrals or real creative briefs.'},
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
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5.1rem)] leading-[1.06] tracking-[-.045em]">Make creative access <span className="serif">possible.</span></h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-[#321c04]/80 md:text-lg">CMEI is building a practical pathway for emerging photographers, filmmakers and visual storytellers. Partners can help make the tools, training and professional opportunities accessible.</p>
          <a href={enquiry} className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium text-[#fff9f2] hover:bg-[#1f1003]">Start a partnership conversation</a>
        </div>
        <aside className="rounded-[18px] border border-[#321c04]/20 p-5 md:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em]">First proposed initiative</p>
          <p className="mt-3 text-3xl leading-none tracking-tight">20–30 <span className="serif">learners</span></p>
          <p className="mt-3 text-sm leading-[1.65] text-[#321c04]/75">Five practical training days with a final portfolio project. The cohort is planned; dates and delivery details are not yet confirmed.</p>
        </aside>
      </div>
    </section>

    <section aria-labelledby="partnership-pathways" className="bg-[#e9d3ba] px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-12">
          <h2 id="partnership-pathways" className="text-3xl tracking-tight md:text-5xl">Where you can make a <span className="serif">difference.</span></h2>
          <p className="max-w-md text-sm leading-relaxed text-[#321c04]/75">Support can be financial, material or professional. Each contribution should have a clearly agreed purpose.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partnerships.map((item,index)=><article key={item.title} className="flex min-h-[142px] flex-col justify-between rounded-[14px] bg-[#f6e4cf] p-5">
            <span className="text-[10px] tabular-nums text-[#321c04]/50">{String(index+1).padStart(2,'0')}</span>
            <div className="mt-4"><h3 className="text-lg font-medium leading-tight">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#321c04]/75">{item.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="partnership-outcome" className="px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <h2 id="partnership-outcome" className="text-3xl leading-[1.12] tracking-tight md:text-5xl">A partnership grounded in <span className="serif">evidence.</span></h2>
        <div>
          <p className="text-base leading-[1.7] text-[#321c04]/85">The goal is more than a week of classes. The proposed programme is designed around practical exercises, assessed final projects, mentorship and an honest post-cohort report.</p>
          <p className="mt-4 text-sm leading-[1.65] text-[#321c04]/70">Any public recognition or reporting will follow agreed partnership terms and appropriate consent.</p>
          <a href={enquiry} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#321c04] px-6 py-3 text-xs font-medium text-[#fff9f2] hover:bg-[#1f1003]">Enquire about partnering</a>
        </div>
      </div>
    </section>
  </div>;
}
