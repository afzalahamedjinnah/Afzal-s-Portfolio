const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const EMAIL="your.email@example.com"; // <- put your real email here
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches, fine=matchMedia("(hover:hover)").matches;
const toggle=$(".menu"),nav=$("nav");if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
const yr=$("#year");if(yr)yr.textContent=new Date().getFullYear();
const here=location.pathname.split("/").pop()||"index.html";$$("nav a").forEach(a=>a.getAttribute("href")===here&&a.classList.add("active"));
// blog filters
$$("[data-filter]").forEach(b=>b.addEventListener("click",()=>{$$("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".article").forEach(a=>a.hidden=b.dataset.filter!=="all"&&a.dataset.cat!==b.dataset.filter)}));
// contact form -> email app
const form=$("#contactForm");if(form)form.addEventListener("submit",e=>{e.preventDefault();const v=id=>$("#"+id).value;location.href=`mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio enquiry: "+v("service"))}&body=${encodeURIComponent(`Name: ${v("name")}\nEmail: ${v("email")}\nService: ${v("service")}\n\n${v("message")}`)}`});
// hero headline: split into animated lines
const h1=$(".hero h1");if(h1){h1.innerHTML=h1.innerHTML.split(/<br\s*\/?>/i).map((t,i)=>`<span class="ln"><span style="--i:${i}">${t}</span></span>`).join("");
  const hero=$(".hero");hero.insertAdjacentHTML("beforeend",'<div class="cue"><i></i>Scroll</div>')}
// progress bar, sticky header, parallax
document.body.insertAdjacentHTML("afterbegin",'<div id="progress"></div>'+(fine&&!reduce?'<div id="glow"></div>':''));
const bar=$("#progress"),head=$("header"),heroEl=$(".hero");let tick=false;
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?y/h:0})`;head.classList.toggle("scrolled",y>30);if(heroEl&&!reduce&&y<innerHeight*1.2)heroEl.style.setProperty("--py",y*.22+"px");tick=false};
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
// scroll reveals with stagger
const groups=".cards>*,.section>h2,.about>*,.contact>*,.stats,.listing,.script-row,.article,.sample-card,.intro-business>*,.presentation,.callout,.presentation-cta,.filters,.narrow>.note";
$$(groups).forEach(el=>{el.setAttribute("data-r","");const sibs=[...el.parentElement.children].filter(c=>c.hasAttribute("data-r"));el.style.setProperty("--d",Math.min(sibs.indexOf(el),5)*.12+"s")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.14,rootMargin:"0px 0px -6% 0px"});
$$("[data-r]").forEach(el=>io.observe(el));
if(!reduce&&fine){
  // soft cursor glow
  const g=$("#glow");addEventListener("mousemove",e=>{g.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});
  // gentle 3D tilt on cards
  $$(".card,.sample-card").forEach(c=>{c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-8px)`});c.addEventListener("mouseleave",()=>c.style.transform="")});
  // magnetic buttons
  $$(".btn").forEach(b=>{b.addEventListener("mousemove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener("mouseleave",()=>b.style.transform="")});
}
