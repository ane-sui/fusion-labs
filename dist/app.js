document.querySelectorAll('[data-enquire]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('project-service').value = link.dataset.enquire;
  });
});
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
