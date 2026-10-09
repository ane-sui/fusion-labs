const services = {
  ux: {title:'Looks right.\nFeels effortless.',copy:'Thoughtful experiences start with understanding your users. We turn complex journeys into clear, intuitive interfaces that help people get things done.',tags:['User journeys','Wireframes','Interactive prototypes','Design systems'],label:'UI / UX Design',cta:'Let’s talk UI / UX'},
  web: {title:'A first impression\nthat feels like you.',copy:'A considered website brings your brand into focus. We design clear, distinctive pages that tell your story and help the right people take the next step.',tags:['Website strategy','Responsive layouts','Visual direction','Design handoff'],label:'Website Design',cta:'Let’s talk website design'},
  mobile: {title:'Big possibilities.\nSmall screens.',copy:'Make every tap feel natural. We design mobile experiences around the moments that matter, from a welcoming first launch to everyday tasks.',tags:['App flows','iOS & Android UI','Clickable prototypes','Developer handoff'],label:'Mobile App Design',cta:'Let’s talk mobile apps'},
  saas: {title:'Less friction.\nMore getting done.',copy:'Give complex tools a clear interface. We design web apps and SaaS products that make onboarding, daily workflows and important decisions easier.',tags:['Product discovery','Dashboards','Onboarding flows','Component libraries'],label:'SaaS / Web App Design',cta:'Let’s talk SaaS design'},
  dev: {title:'From thoughtful design\nto a working website.',copy:'Bring your website to life with responsive development, accessible interactions and careful attention to performance. Built around the way your business works.',tags:['Responsive development','Content integration','Accessibility','Launch support'],label:'Website Development',cta:'Let’s talk development'}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectService(tab, focus = false) {
  const service = services[tab.dataset.service];
  tabs.forEach(item => {const active = item === tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex = active ? 0 : -1;});
  document.getElementById('service-panel').setAttribute('aria-labelledby',tab.id);
  const title = document.getElementById('panel-title');title.replaceChildren();
  service.title.split('\n').forEach((line,index) => {if(index) title.append(document.createElement('br'));title.append(document.createTextNode(line));});
  document.getElementById('panel-copy').textContent = service.copy;
  const tags = document.getElementById('panel-tags');tags.replaceChildren(...service.tags.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  document.getElementById('panel-cta').textContent = service.cta;
  document.getElementById('project-service').value = service.label;
  document.dispatchEvent(new CustomEvent('fusion:service-change'));
  if(focus) tab.focus();
}
tabs.forEach((tab,index) => {tab.addEventListener('click',()=>selectService(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown')next=(index+1)%tabs.length;if(event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectService(tabs[next],true);}});});
document.getElementById('project-form').addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(event.currentTarget);
  const subject=`Project enquiry: ${data.get('service')}`;
  const body=`Hello Fusion Labs,\n\nMy name is ${data.get('name')}. I’m interested in ${data.get('service')}.\n\n${data.get('message')}\n\nYou can reach me at ${data.get('email')}.\n\nThanks,\n${data.get('name')}`;
  window.location.href=`mailto:info@fusionlabs.co.zw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status=document.getElementById('form-status');status.replaceChildren(document.createTextNode('Your email draft is ready. If your email app did not open, '));
  const copy=document.createElement('button');copy.type='button';copy.className='panel-link';copy.style.background='transparent';copy.style.border='0';copy.style.padding='0';copy.textContent='copy your enquiry';
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`${subject}\n\n${body}`);status.textContent='Enquiry copied. Send it to info@fusionlabs.co.zw when you are ready.';}catch{status.textContent='Copy the details below and email info@fusionlabs.co.zw.';const fallback=document.createElement('textarea');fallback.value=`${subject}\n\n${body}`;fallback.readOnly=true;status.append(fallback);fallback.focus();fallback.select();}});status.append(copy,document.createTextNode('.'));
});
document.getElementById('year').textContent=new Date().getFullYear();
