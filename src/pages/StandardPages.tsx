import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedFilm from '../components/FeaturedFilm';
import Cohort from '../components/Cohort';

type IntroProps = {eyebrow:string;title:string;description:string};
function PageIntro({eyebrow,title,description}:IntroProps) {
  return <section className="bg-[#f6e4cf] px-6 pb-14 pt-14 text-[#321c04] md:pb-20 md:pt-24">
    <div className="mx-auto max-w-6xl">
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em]">{eyebrow}</p>
      <h1 className="max-w-4xl text-4xl leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#321c04]/75 md:text-lg">{description}</p>
    </div>
  </section>;
}

export function AboutPage() {return <><PageIntro eyebrow="About CMEI" title="A space to create what comes next." description="Creative education, mentorship and hands-on production for emerging storytellers."/><AboutSection/></>;}
export function ApproachPage() {return <><PageIntro eyebrow="What we do" title="Make something meaningful." description="Practical learning, storytelling and professional development."/><FeaturesSection/><Cohort/></>;}
export function WorkPage() {return <><PageIntro eyebrow="Our work" title="Made to be seen." description="Films and creative work from our community."/><FeaturedFilm/></>;}
export function PartnerPage() {return <><PageIntro eyebrow="Partner with us" title="Make the next story possible." description="Support emerging creators through mentorship, equipment, venues, funding or creative opportunities."/><Cohort/></>;}
export function FilmsPage() {return <><PageIntro eyebrow="CMEI Films" title="Stories worth seeing." description="Independent films and creative work from the CMEI community."/><FeaturedFilm/></>;}
export function NotFoundPage() {return <PageIntro eyebrow="Page not found" title="This page could not be found." description="Explore CMEI using the menu."/>;}
