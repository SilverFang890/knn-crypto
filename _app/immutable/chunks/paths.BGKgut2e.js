import{n as c,s as _}from"./scheduler.BJd_Y3Fu.js";const e=[];function k(i,l=c){let n;const o=new Set;function r(t){if(_(i,t)&&(i=t,n)){const b=!e.length;for(const s of o)s[1](),e.push(s,i);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function u(t){r(t(i))}function h(t,b=c){const s=[t,b];return o.add(s),o.size===1&&(n=l(r,u)||c),t(i),()=>{o.delete(s),o.size===0&&n&&(n(),n=null)}}return{set:r,update:u,subscribe:h}}var f;const g=((f=globalThis.__sveltekit_1hih2vk)==null?void 0:f.base)??"/sveltekit-github-pages";var a;const d=((a=globalThis.__sveltekit_1hih2vk)==null?void 0:a.assets)??g;export{d as a,g as b,k as w};
