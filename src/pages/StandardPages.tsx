import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedFilm from '../components/FeaturedFilm';
import Cohort from '../components/Cohort';
import PartnerContent from '../components/PartnerContent';
import WorkPortfolio from '../components/WorkPortfolio';

type IntroProps={eyebrow:string;title:string;description:string};
function PageIntro({eyebrow,title,description}:IntroProps) {
  return <header className="bg-[#f6e4cf] px-5 pb-8 pt-11 text-[#321c04] md:px-6 md:pb-12 md:pt-20">
    <div className="mx-auto max-w-6xl">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em]">{eyebrow}</p>
      <h1 className="max-w-4xl text-4xl leading-[1.07] tracking-tight sm:text-6xl md:text-7xl">{title}</h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#321c04]/75 md:text-lg">{description}</p>
    </div>
  </header>;
}
export function AboutPage(){return <AboutSection/>;}
export function ApproachPage(){return <><PageIntro eyebrow="What we do" title="Make something meaningful." description="A practical pathway from craft and story to portfolio and opportunity."/><FeaturesSection/><Cohort/></>;}
export function WorkPage(){return <WorkPortfolio/>;}
export function PartnerPage(){return <PartnerContent/>;}
export function FilmsPage(){return <><PageIntro eyebrow="CMEI Films" title="Stories worth seeing." description="Independent films and creative work connected to our community."/><FeaturedFilm showCollectionLink={false}/></>;}
export function NotFoundPage(){return <PageIntro eyebrow="Page not found" title="This page could not be found." description="Explore CMEI using the menu."/>;}
