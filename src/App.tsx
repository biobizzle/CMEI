import {lazy,Suspense,useEffect,type ReactElement} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import FeaturedFilm from './components/FeaturedFilm';
import PeopleRail from './components/PeopleRail';
import Cohort from './components/Cohort';
import ContactFooter from './components/ContactFooter';
import {AboutPage,ApproachPage,WorkPage,PartnerPage,FilmsPage,NotFoundPage} from './pages/StandardPages';
import metadata from './content/siteMeta.json';

const FilmPage=lazy(()=>import('./components/FilmPage'));
const path=window.location.pathname.replace(/\/+$/,'')||'/';
type PageMeta={title:string;description:string;image?:string};
const routeMetadata=metadata as Record<string,PageMeta>;
const pages:Record<string,()=>ReactElement>={
  '/':()=> <><Hero/><FeaturesSection/><FeaturedFilm/><PeopleRail/><Cohort/></>,
  '/about':AboutPage,
  '/approach':ApproachPage,
  '/work':WorkPage,
  '/partner':PartnerPage,
  '/films':FilmsPage,
};

export default function App(){
  useEffect(()=>{
    const meta=routeMetadata[path];
    document.title=meta?.title??'Page not found | CMEI';
    const description=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(meta&&description)description.content=meta.description;
    if(window.location.hash)requestAnimationFrame(()=>document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
  },[]);
  if(path==='/films/the-dark-didnt-win'){
    return <Suspense fallback={<main aria-busy="true" aria-label="Loading film page" style={{minHeight:'100svh',background:'#070807'}}/>}><FilmPage/></Suspense>;
  }
  const Page=pages[path]??NotFoundPage;
  return <main id="top">{path==='/'?null:<div className="relative h-28 bg-[#321c04]"><Navbar/></div>}<Page/><ContactFooter/></main>;
}
