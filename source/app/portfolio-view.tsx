'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Download } from 'lucide-react';
import type { Portfolio } from '@/lib/portfolio-types';
import { ContactLink } from './contact-link';
export function Motion({enabled=true}:{enabled?:boolean}) {
 useEffect(()=>{if(!enabled)return; const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.06});const elements=document.querySelectorAll('[data-reveal]');elements.forEach(e=>{e.classList.add('will-reveal');observer.observe(e);});return()=>{observer.disconnect();elements.forEach(e=>e.classList.remove('will-reveal'));};},[enabled]);return null;
}
function CampaignTitle({title}:{title:string}) {
 const ref=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{
  const element=ref.current;if(!element)return;
  let active=true;
  const fit=()=>{
   if(!active)return;
   const width=element.clientWidth;if(!width)return;
   element.style.fontSize='';element.style.whiteSpace='nowrap';
   const base=parseFloat(getComputedStyle(element).fontSize);
   let size=base;
   while(element.scrollWidth>width+1&&size>16){size=Math.max(16,size-.5);element.style.fontSize=`${size}px`;}
   if(element.scrollWidth>width+1)element.style.whiteSpace='normal';
  };
  const observer=new ResizeObserver(fit);observer.observe(element);
  void document.fonts.ready.then(fit);fit();
  return()=>{active=false;observer.disconnect();};
 },[title]);
 return <h3 ref={ref}>{title}</h3>;
}
export function BackToTop() {
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const update=()=>setVisible(window.scrollY>450);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);
 return <button type="button" className={`back-to-top ${visible?'is-visible':''}`} tabIndex={visible?0:-1} aria-hidden={!visible} aria-label="Back to top" title="Back to top" onClick={()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector<HTMLElement>('.wordmark')?.focus({preventScroll:true});}}><ArrowUp size={20} aria-hidden="true"/></button>;
}
export function Header({name,pdf,cv}:{name:string;pdf:string;cv?:string}) {return <header className="site-header"><a className="wordmark" href="/">{name}<span>.</span></a><nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#about">About</a><a href="/#contact">Contact</a>{cv&&<a className="cv-link" href={cv} download={cv.startsWith('/')?'Jullien-Guce-CV.pdf':undefined} target="_blank" rel="noreferrer">Download CV <Download size={14}/></a>}{pdf&&<a className="pdf-link" href={pdf} target="_blank" rel="noreferrer">Portfolio PDF <Download size={14}/></a>}</nav></header>;}
export function Footer({data}:{data:Portfolio}) {return <><section id="contact" className="contact-section"><div className="contact-top"><span className="eyebrow">Get in touch</span><span>Have a project or role in mind?</span></div><ContactLink email={data.email} className="contact-heading">Let’s talk.<ArrowUpRight aria-hidden="true"/></ContactLink><div className="contact-bottom"><ContactLink email={data.email}>{data.email}</ContactLink>{data.phone&&<a className="phone-link" href={`tel:${data.phone.replace(/[^+0-9]/g,'')}`}>{data.phone}</a>}<div>{data.pdf&&<a href={data.pdf} target="_blank" rel="noreferrer">Portfolio PDF <Download size={16}/></a>}{data.cv&&<a href={data.cv} target="_blank" rel="noreferrer" download={data.cv.startsWith('/')?'Jullien-Guce-CV.pdf':undefined}>Download CV <Download size={16}/></a>}{data.linkedin&&<a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a>}{data.behance&&<a href={data.behance} target="_blank" rel="noreferrer">Behance <ArrowUpRight size={16}/></a>}</div></div></section><footer className="site-footer"><span>© {new Date().getFullYear()} {data.name}</span><span>Art direction & design</span></footer><BackToTop/></>;}
export function PortraitFilters() {return <svg width="0" height="0" aria-hidden="true" focusable="false" className="portrait-filter-defs"><defs><filter id="portrait-black-outline" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -.2126 -.7152 -.0722 1 0" result="blackInk"/><feMorphology in="blackInk" operator="dilate" radius="1.2" result="expandedInk"/><feFlood floodColor="white" result="white"/><feComposite in="white" in2="expandedInk" operator="in" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="blackInk"/></feMerge></filter></defs></svg>;}
export function PortfolioView({data}:{data:Portfolio}) {
 const projects=data.projects;
 return <div data-motion={data.animation?'on':'off'}><PortraitFilters/><Motion enabled={data.animation}/><Header name={data.name} pdf={data.pdf} cv={data.cv}/><main><section className="hero"><div className="hero-top"><div><p className="hero-name">{data.name}</p><p className="hero-role">{data.role}</p></div></div><h1>Portfolio<span>.</span></h1><div className="hero-bottom"><div><p>{data.intro}</p>{data.cv&&<a href={data.cv} download={data.cv.startsWith('/')?'Jullien-Guce-CV.pdf':undefined} className="hero-cv text-link" target="_blank" rel="noreferrer">Download CV <Download size={16}/></a>}</div><a href="#work" className="scroll-link">Explore my work <ArrowDown size={18}/></a></div></section><section id="work" className="work-section"><div className="section-heading"><h2>Selected work</h2><span className="eyebrow">Concept to execution</span></div><div className="project-grid">{projects.map((p,i)=><a data-reveal className="project-card" key={p.id} href={`/projects/${p.id}/`}><div className="project-cover"><img src={p.cover} alt={`${p.brand} campaign`} loading={i<2?'eager':'lazy'} decoding="async"/><span className="project-open"><ArrowUpRight size={22}/></span><span className="cover-label">{p.brand}</span></div><div className="project-meta"><div><p>{p.category}</p><CampaignTitle title={p.title}/></div><span>{String(data.projects.indexOf(p)+1).padStart(2,'0')}</span></div></a>)}</div></section><section id="about" className="about-section" data-reveal><div className="about-title"><span className="eyebrow">A little about me</span><h2>Hello,<br/>I’m {data.name.split(' ')[0]}.</h2>{data.portrait&&<img className="portrait" loading="lazy" decoding="async" src={data.portrait} alt={`Portrait of ${data.name}`}/>}</div><div className="about-content"><div className="bio">{data.bio.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div><ContactLink email={data.email} className="text-link">Let’s connect <ArrowUpRight size={18}/></ContactLink><div className="experience"><h3>Experience</h3>{data.experience.map((e,i)=><div className="experience-row" key={i}><span>{e.dates}</span><div><h4>{e.company}</h4><p>{e.role}</p>{e.description?.trim()&&<p className="experience-description">{e.description}</p>}</div></div>)}</div><div className="education"><h3>Education</h3><p>{data.education}</p></div></div></section></main><Footer data={data}/></div>;
}
