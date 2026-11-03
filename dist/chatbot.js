(() => {
  const widget = document.createElement('aside');
  widget.className = 'chat-widget';
  widget.setAttribute('aria-label', 'Fusion Labs chatbot');
  widget.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="chat-panel">Ask Fusion Labs</button>
    <section class="chat-panel" id="chat-panel" aria-labelledby="chat-title" hidden>
      <header class="chat-header"><div><h2 id="chat-title">Ask Fusion Labs</h2><p>Automated help · Contact the admin anytime</p></div><button class="chat-close" type="button" aria-label="Close chat">×</button></header>
      <div class="chat-messages" role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-suggestions"><button type="button">Services</button><button type="button">Prices</button><button type="button">Talk to admin</button></div>
      <form class="chat-form"><label for="chat-question">Your question</label><div><input id="chat-question" name="question" placeholder="How can we help?" maxlength="500" required autocomplete="off"><button type="submit">Send</button></div></form>
      <p class="chat-note">Chat stays in this page. Contact links prepare a message for you to send.</p>
    </section>`;
  document.body.append(widget);
  document.body.classList.add('chat-ready');
  const launcher = widget.querySelector('.chat-launcher');
  const panel = widget.querySelector('.chat-panel');
  const log = widget.querySelector('.chat-messages');
  const input = widget.querySelector('input');
  let pendingQuestion = '';
  let awaitingAdmin = false;

  function message(text, visitor = false) {
    const item = document.createElement('div');
    item.className = visitor ? 'chat-message chat-visitor' : 'chat-message';
    const author = document.createElement('strong');
    author.textContent = visitor ? 'You' : 'Fusion assistant';
    const content = document.createElement('p');
    content.textContent = text;
    item.append(author, content);
    log.append(item);
    log.scrollTop = log.scrollHeight;
    return item;
  }

  function contactAdmin() {
    awaitingAdmin = false;
    const item = message('You can contact the admin using our WhatsApp number or email. Your question is included in the draft. Send it when you’re ready; a reply may not be immediate.');
    const text = `Hello Fusion Labs, I would like to talk to the admin.\n\nMy question: ${pendingQuestion || 'I would like help with a project.'}`;
    const links = document.createElement('div');
    links.className = 'chat-actions';
    for (const [label, href] of [
      ['WhatsApp admin', `https://wa.me/263778066699?text=${encodeURIComponent(text)}`],
      ['Email admin', `mailto:info@fusionlabs.co.zw?subject=${encodeURIComponent('Question for the admin')}&body=${encodeURIComponent(text)}`]
    ]) {
      const link = document.createElement('a');
      link.textContent = label;
      link.href = href;
      if (href.startsWith('https:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      links.append(link);
    }
    item.append(links);
    log.scrollTop = log.scrollHeight;
  }

  function offerAdmin(question) {
    pendingQuestion = question;
    awaitingAdmin = true;
    const item = message('I don’t have an answer to that in the website information. Would you like to talk to the admin?');
    const actions = document.createElement('div');
    actions.className = 'chat-actions';
    for (const [label, accept] of [['Yes, talk to admin', true], ['No, keep chatting', false]]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => {
        actions.remove();
        message(label, true);
        if (accept) contactAdmin();
        else { awaitingAdmin = false; message('Of course. Ask another question about our services, prices or project process.'); }
      });
      actions.append(button);
    }
    item.append(actions);
    log.scrollTop = log.scrollHeight;
  }

  const services = [...document.querySelectorAll('.offer-services li')].map(item => {
    const link = item.querySelector('[data-enquire]');
    return { name: link.dataset.enquire, price: link.querySelector('.service-price').textContent.trim().replace(/\s+/g, ' '), detail: item.querySelector('p')?.textContent || '' };
  });
  const faqAnswers = [...document.querySelectorAll('.faq-list details p')].map(item => item.textContent);
  function answer(question) {
    const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (awaitingAdmin && /^(yes|yes please|sure|ok|okay)$/.test(q)) return contactAdmin();
    if (awaitingAdmin && /^(no|no thanks|not now)$/.test(q)) {
      awaitingAdmin = false;
      return message('No problem. What else would you like to know about Fusion Labs?');
    }
    awaitingAdmin = false;
    if (/\b(admin|human|person|agent|someone)\b/.test(q)) { if (!pendingQuestion) pendingQuestion = question; return contactAdmin(); }
    if (/^(hi|hello|hey|good morning|good afternoon)$/.test(q)) return message('Hello! I can help with Fusion Labs services, published prices and project FAQs. What would you like to know?');
    if (/^(thanks|thank you|thank you very much)$/.test(q)) return message('You’re welcome. Let me know if you have another question.');
    if (/^(services|what services do you offer|what do you do|what can you do)$/.test(q)) return message(`We offer ${services.map(service => service.name).join(', ')}. Ask about a service or its price.`);
    if (/^(prices|pricing|how much|how much will my project cost|what are your prices)$/.test(q)) return message(services.map(service => `${service.name}: ${service.price}.`).join('\n') + '\nPrices are in USD. Equipment, domains and third-party licences are separate. Final scope is agreed in your proposal.');
    const topics = [
      [/\b(how long|timeline|turnaround|duration)\b/, 4],
      [/\b(payment|pay|revisions|deposit)\b/, 5],
      [/\b(handover|ownership|deliverables)\b/, 6],
      [/\b(after launch|ongoing support)\b/, 7],
      [/\b(existing website|redesign|existing app)\b/, 3],
      [/\b(just an idea|start a project|start with an idea)\b/, 0]
    ];
    // Only match bounded questions: unknown requests must reach the admin offer.
    const unsupported = /\b(refund|cancel|guarantee|discount|free|urgent|today|tomorrow|status|password|login|broken|error|complaint|hours|open|weekend)\b/;
    if (!unsupported.test(q) && q.split(' ').length <= 18) {
      for (const [pattern, index] of topics) if (pattern.test(q) && faqAnswers[index]) return message(faqAnswers[index]);
      const aliases = [
        [/\b(website|web) (design)\b/, 'Website Design'],
        [/\b(website|web) (development|dev)\b/, 'Website Development'],
        [/\b(graphic|logo|branding)\b/, 'Graphic Design'],
        [/\b(hosting)\b/, 'Web Hosting Services'],
        [/\b(networking|wi fi)\b/, 'Networking'],
        [/\b(managed it|it support)\b/, 'Managed IT'],
        [/\b(digital marketing|marketing)\b/, 'Digital Marketing'],
        [/\b(website management|maintenance)\b/, 'Website Management'],
        [/\b(mobile app design)\b/, 'Mobile App Design'],
        [/\b(ui|ux)\b/, 'UI / UX Design'],
        [/\b(saas|web app design)\b/, 'SaaS / Web App Design'],
        [/\b(business systems)\b/, 'Business Systems']
      ];
      const matches = aliases.filter(([pattern]) => pattern.test(q));
      if (matches.length === 1 && /\b(price|cost|much|offer|about|services|design|hosting|networking|marketing|maintenance|managed|systems)\b/.test(q)) {
        const service = services.find(item => item.name === matches[0][1]);
        if (service) return message(`${service.name}: ${service.price}. ${service.detail}\nPrices are in USD. Scope and deliverables are agreed in your proposal.`);
      }
      if (/^(contact|email|phone|whatsapp|where are you based|location|address)$/.test(q)) return message('Fusion Labs is based in Harare, Zimbabwe. Email info@fusionlabs.co.zw or WhatsApp +263 778 066 699. Choose “Talk to admin” for contact links.');
    }
    offerAdmin(question);
  }
  function send(value) {
    const question = value.trim();
    if (!question) return;
    message(question, true);
    answer(question);
    input.value = '';
    input.focus();
  }
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) input.focus(); else launcher.focus();
  }
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  widget.querySelector('.chat-close').addEventListener('click', () => setOpen(false));
  widget.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  widget.querySelector('form').addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  widget.querySelectorAll('.chat-suggestions button').forEach(button => button.addEventListener('click', () => send(button.textContent)));
  message('Hello! I’m the Fusion Labs automated assistant. Ask about services, prices or starting a project. If I can’t answer, I’ll help you contact the admin.');
})();
