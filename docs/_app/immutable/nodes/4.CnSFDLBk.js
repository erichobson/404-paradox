import{f as u,e as T,a as p}from"../chunks/D1d1ynCS.js";import{i as M}from"../chunks/Bln5WnoV.js";import{B as O,I as W,C as J,F as c,c as h,m as A,D as y,e,G as o,J as z,K as B}from"../chunks/h4Cc5rxe.js";import{s as S}from"../chunks/D-x0gPj2.js";import{e as j,i as _,s as q}from"../chunks/Cb45iFV5.js";import{s as D}from"../chunks/D8fFsUyL.js";import{g as H}from"../chunks/CJW2gTr4.js";import{s as L}from"../chunks/8z5xZrfH.js";var N=u("<span> </span>"),P=u("<button> </button>"),Q=u('<div class="char-bits svelte-rjm5hl"></div>'),U=u(`<section class="academic-section svelte-rjm5hl"><h1 data-note-id="digital-decay" class="svelte-rjm5hl">Digital Decay</h1> <p class="lead svelte-rjm5hl">Though digital technology promises perfect reproduction and eternal
        preservation, it introduces new vulnerabilities that can render content
        inaccessible. The layers of hardware, software, and interfaces upon
        which digital media rely can fail, highlighting the paradox at the heart
        of digital preservation.</p> <div class="demonstration-container svelte-rjm5hl"><div class="text-display svelte-rjm5hl"></div> <div class="binary-grid svelte-rjm5hl"></div> <div class="subtext svelte-rjm5hl">Each character above is encoded in 8 bits. Click any bit to see how
            a single change affects the text. <span class="reference svelte-rjm5hl">For a detailed explanation of binary encoding, see Rothenberg
                (5-9).</span></div></div> <div class="content-block svelte-rjm5hl"><p class="svelte-rjm5hl">While digital content feels intangible, it is grounded in physical
            media that require specific technologies to access. As Kirschenbaum
            explains through works like Agrippa, "electronic texts do not enjoy
            a material existence in that one particularly narrow and literal
            way—you cannot reach out and touch them—that notion seems to me to
            reflect a relatively simplistic understanding of electronic media"
            (43). The materiality of digital objects means they are both easily
            replicated and uniquely fragile. Each character in a digital text is
            represented by bits; changing just one can corrupt the character
            entirely, demonstrating how digital texts are vulnerable at their
            most basic level.</p> <p class="svelte-rjm5hl">As Rothenberg succinctly puts it, "Old bit streams never die—they
            just become unreadable" (2). Rothenberg highlights the fragility of
            digital media through this fundamental paradox. The dependencies on
            hardware, software, and file formats create what he describes as
            layers where "a single break in this chain can render digital
            information inaccessible" (11). Over time, storage media degrade,
            software becomes obsolete, and interfaces evolve, making access to
            digital content increasingly precarious. Kirschenbaum argues that
            "the material complexity ... therefore underscores the need for
            critical approaches capable of accounting for such phenomena as
            multiple versions and releases, data standards, platforms, and file
            formats" (43). This demonstrates how the very mechanisms intended to
            preserve digital information can lead to its inaccessibility.</p></div> <div class="navigation-button-container svelte-rjm5hl"><button class="navigation-button svelte-rjm5hl">← Back</button></div></section>`);function ie(G,K){O(K,!1);const w="What is a book?";let l=A(w),r=A([]);function R(a){return a.split("").map((i,t)=>({id:t,char:i,binary:i.charCodeAt(0).toString(2).padStart(8,"0").split(""),changed:!1,pulseColor:null}))}function $(a,i){const t=e(r)[a];t.binary[i]=t.binary[i]==="0"?"1":"0",t.changed=!0,t.pulseColor=`hsl(${Math.random()*360}, 70%, 60%)`;try{const s=String.fromCharCode(parseInt(t.binary.join(""),2));h(l,e(l).substring(0,a)+s+e(l).substring(a+1))}catch{h(l,e(l).substring(0,a)+"�"+e(l).substring(a+1))}setTimeout(()=>{t.pulseColor=null,h(r,[...e(r)])},1e3),h(r,[...e(r)])}W(()=>{h(r,R(w))}),M();var v=U(),g=y(c(v),4),b=c(g);j(b,5,()=>e(l).split(""),_,(a,i,t)=>{var s=N();let d;var f=c(s,!0);o(s),B(()=>{var m,n;d=q(s,1,"character svelte-rjm5hl",null,d,{changed:(m=e(r)[t])==null?void 0:m.changed}),D(s,`color: ${(((n=e(r)[t])==null?void 0:n.pulseColor)||"inherit")??""}`),S(f,e(i))}),p(a,s)}),o(b);var x=y(b,2);j(x,5,()=>e(r),_,(a,i,t)=>{var s=Q();j(s,5,()=>e(i).binary,_,(d,f,m)=>{var n=P();let k;var F=c(n,!0);o(n),B(()=>{k=q(n,1,"bit svelte-rjm5hl",null,k,{changed:e(i).changed}),D(n,`color: ${(e(i).pulseColor||"inherit")??""}`),S(F,e(f))}),T("click",n,()=>$(t,m)),p(d,n)}),o(s),p(a,s)}),o(x),z(2),o(g);var C=y(g,4),E=c(C);o(C),o(v),T("click",E,()=>{L.set(!0),H("/",{replaceState:!0})}),p(G,v),J()}export{ie as component};
