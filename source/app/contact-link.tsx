'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ContactLink({email,className='',children}:{email:string;className?:string;children:ReactNode}){
 const dialog=useRef<HTMLDialogElement>(null);
 const field=useRef<HTMLInputElement>(null);
 const [status,setStatus]=useState('');
 const title=useId();
 function open(){setStatus('');dialog.current?.showModal();}
 function close(){dialog.current?.close();}
 useEffect(()=>()=>{dialog.current?.close();},[]);
 async function copy(){try{await navigator.clipboard.writeText(email);setStatus('Email address copied.');}catch{field.current?.focus();field.current?.select();setStatus('Select the address above and copy it.');}}
 return <><button type="button" className={`email-trigger ${className}`} aria-haspopup="dialog" onClick={open}>{children}</button><dialog ref={dialog} className="contact-dialog" aria-labelledby={title} onClick={event=>{if(event.target===dialog.current){const box=dialog.current!.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)close();}}}><div className="contact-dialog-top"><span className="eyebrow">Get in touch</span><Button type="button" variant="ghost" size="icon" aria-label="Close email panel" onClick={close}><X size={18}/></Button></div><h2 id={title}>Let’s connect.</h2><p>Choose how you’d like to send an email.</p><label className="contact-email-field"><span>Email address</span><input ref={field} aria-label="Email address" value={email} readOnly onFocus={e=>e.target.select()}/></label><div className="contact-dialog-actions"><Button type="button" onClick={copy}><Copy size={16}/> Copy email</Button><Button variant="outline" asChild><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`} target="_blank" rel="noopener noreferrer">Open Gmail <ArrowUpRight size={16}/></a></Button><Button variant="outline" asChild><a href={`mailto:${email}`}>Open email app <ArrowUpRight size={16}/></a></Button></div><p role="status" aria-live="polite" className="contact-copy-status">{status}</p></dialog></>;
}
