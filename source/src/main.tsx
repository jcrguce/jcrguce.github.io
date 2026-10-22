import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioView } from '@/app/portfolio-view';
import { ProjectView } from '@/app/projects/[id]/project-view';
import type { Portfolio } from '@/lib/portfolio-types';
import '@/app/globals.css';

// Static GitHub Pages build: content comes from /data/portfolio.json (edit that file to update the site).
const DATA_URL = '/data/portfolio.json';

function luminance(hex:string){const c=hex.slice(1).match(/../g)!.map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
function contrast(a:string,b:string){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
function readableAccent(accent:string|undefined,dark:boolean){const value=/^#[\da-f]{6}$/i.test(accent||'')?accent!:'#171717';return contrast(value,dark?'#141414':'#ffffff')>=4.5?value:dark?'#f2f2f2':'#171717';}
function useTheme(theme:Portfolio['theme']='light',accent?:string){useEffect(()=>{const media=window.matchMedia('(prefers-color-scheme: dark)');const apply=()=>{const dark=theme==='dark'||(theme==='system'&&media.matches);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.setProperty('--portfolio-accent',readableAccent(accent,dark));};apply();media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);},[theme,accent]);}

function PublicPage(){
 const [data,setData]=useState<Portfolio|null>(null);const [error,setError]=useState(false);
 useTheme(data?.theme,data?.accent);
 useEffect(()=>{fetch(DATA_URL).then(r=>{if(!r.ok)throw Error();return r.json();}).then((d:Portfolio)=>setData({...d,projects:d.projects.filter(p=>p.published!==false)})).catch(()=>setError(true));},[]);
 useEffect(()=>{if(!data||window.location.pathname!=='/')return;let frame=0;const go=()=>{cancelAnimationFrame(frame);const id=window.location.hash.slice(1);if(['work','about','contact'].includes(id))frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));};go();window.addEventListener('hashchange',go);return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',go);};},[data]);
 if(error)return <main className="unavailable"><h1>Be right back.</h1><p>Please refresh in a moment.</p><a href="mailto:jcrguce@gmail.com">Get in touch</a></main>;
 if(!data)return <main className="unavailable"><p>Loading the portfolio…</p></main>;
 const path=window.location.pathname;
 if(path==='/'||path===''||path==='/index.html')return <PortfolioView data={data}/>;
 const id=path.match(/^\/projects\/([a-z0-9-]+)\/?(?:index\.html)?$/)?.[1];const project=data.projects.find(p=>p.id===id);
 if(!project)return <main className="unavailable"><h1>Page not found.</h1><a href="/">View portfolio</a></main>;
 document.title=project.title+' · '+data.name;const index=data.projects.indexOf(project);
 return <ProjectView data={data} project={project} next={data.projects[(index+1)%data.projects.length]}/>;
}
createRoot(document.getElementById('root')!).render(<PublicPage/>);
