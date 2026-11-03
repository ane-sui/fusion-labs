// Tall cards scroll through completely before their bottom settles into the stack.
// Native sticky positioning still works if the animation library does not load.
const stackCards = [...document.querySelectorAll('.offer-card')];
let stackFrame;
function updateStackOffsets() {
  cancelAnimationFrame(stackFrame);
  stackFrame = requestAnimationFrame(() => {
    const offsets = stackCards.map((card, index) =>
      Math.min(24 + index * 14, window.innerHeight - card.offsetHeight - 24)
    );
    stackCards.forEach((card, index) => card.style.setProperty('--stack-top', `${offsets[index]}px`));
    window.ScrollTrigger?.refresh();
  });
}
updateStackOffsets();
window.addEventListener('resize', updateStackOffsets, { passive: true });
if ('ResizeObserver' in window) {
  const stackObserver = new ResizeObserver(updateStackOffsets);
  stackCards.forEach(card => stackObserver.observe(card));
}
document.fonts?.ready.then(updateStackOffsets);

document.querySelectorAll('[data-enquire]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('project-service').value = link.dataset.enquire;
  });
});
document.getElementById('project-form').addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(event.currentTarget);
  const subject=`Project enquiry: ${data.get('service')}`;
  const body=`Hello Fusion Labs,\n\nMy name is ${data.get('name')}. I’m interested in ${data.get('service')}.\n\n${data.get('message')}\n\nBudget: ${data.get('budget') || 'Not sure yet'}\nIdeal timing: ${data.get('timing') || 'Flexible / to discuss'}\n\nYou can reach me at ${data.get('email')}.\n\nThanks,\n${data.get('name')}`;
  try { window.location.href=`mailto:info@fusionlabs.co.zw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; } catch { /* Copy and download remain available. */ }
  const status=document.getElementById('form-status');status.replaceChildren(document.createTextNode('Your email draft is ready. Send it from your email app to complete your enquiry. If the app did not open, '));
  const copy=document.createElement('button');copy.type='button';copy.className='copy-enquiry';copy.textContent='copy your enquiry';
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`${subject}\n\n${body}`);status.textContent='Enquiry copied. Send it to info@fusionlabs.co.zw when you are ready.';}catch{status.textContent='Copy the details below and email info@fusionlabs.co.zw.';const fallback=document.createElement('textarea');fallback.value=`${subject}\n\n${body}`;fallback.readOnly=true;fallback.setAttribute('aria-label','Enquiry text to copy');status.append(fallback);fallback.focus();fallback.select();}});status.append(copy,document.createTextNode('.'));
});


// A local text brief gives visitors an alternative when no email app is configured.
document.getElementById('download-brief').addEventListener('click', () => {
  const data = new FormData(document.getElementById('project-form'));
  const brief = [
    'PROJECT BRIEF - FUSION LABS',
    'Send to: info@fusionlabs.co.zw', '',
    `Name: ${data.get('name') || 'To complete'}`,
    `Email: ${data.get('email') || 'To complete'}`,
    `Service: ${data.get('service')}`,
    `Budget: ${data.get('budget') || 'To discuss'}`,
    `Ideal timing: ${data.get('timing') || 'To discuss'}`, '',
    'Project goals:', data.get('message') || 'Describe your idea, audience and priorities here.'
  ].join('\n');
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fusion-labs-project-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('form-status').textContent = 'Your brief is ready to download. Review it and email it to info@fusionlabs.co.zw. Nothing has been sent.';
});

const enquiryForm = document.getElementById('project-form');
enquiryForm.addEventListener('invalid', () => {
  document.getElementById('form-status').textContent = 'Please complete your name, a valid email address and your project details before preparing your enquiry.';
}, true);
enquiryForm.addEventListener('input', () => {
  if ([...enquiryForm.elements].every(field => !field.willValidate || field.validity.valid)) document.getElementById('form-status').textContent = '';
});
