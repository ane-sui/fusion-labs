/* Fusion Labs: short, interruptible motion with a readable static fallback. */
(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();


  media.add({
    desktop: '(min-width: 768px)',
    mobile: '(max-width: 767px)',
    stack: '(min-width:900px) and (min-height:760px)',
    reduced: '(prefers-reduced-motion: reduce)'
  }, context => {
    const { desktop, reduced, stack } = context.conditions;
    const distance = desktop ? 28 : 14;
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

    if (!reduced) {
      // One focal sequence: the two parts of an idea resolve into a whole.
      intro.from('.hero h1', {
        y: distance, opacity: 0.65, clipPath: 'inset(0 0 18% 0)',
        duration: 0.8, clearProps: 'transform,opacity,clipPath'
      }).from('.hero h1 > span', {
        x: desktop ? 38 : 16, opacity: 0.65, duration: 0.7,
        clearProps: 'transform,opacity'
      }, 0.12).from('.asterisk g', {
        rotation: -100, scale: 0.65, duration: 1,
        transformOrigin: '50% 50%', clearProps: 'transform'
      }, 0.08).from('.hero-bottom > *', {
        y: 12, opacity: 0.7, duration: 0.5, stagger: 0.07,
        clearProps: 'transform,opacity'
      }, 0.3);

      // Small positional reveals keep the content readable even mid-animation.
      gsap.utils.toArray('.section-intro, .faq > h2, .contact-heading').forEach(element => {
        gsap.from(element, {
          y: distance, opacity: 0.75, duration: 0.65, ease: 'expo.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true }
        });
      });

      gsap.from('.process article', {
        x: desktop ? -18 : 0, y: desktop ? 0 : 12,
        opacity: 0.7, duration: 0.6, stagger: 0.1, ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.process', start: 'top 88%', once: true }
      });

      // The studio mark responds to scroll; it never runs an idle animation loop.
      gsap.to('.asterisk', {
        rotation: 75, y: desktop ? 22 : 8, ease: 'none',
        scrollTrigger: {
          trigger: '.hero', start: 'top top', end: 'bottom top',
          scrub: 0.6, invalidateOnRefresh: true
        }
      });
    }

    if (stack && !reduced) {
      const cards = gsap.utils.toArray('.offer-card');
      const container = document.querySelector('.service-stack');
      const checkFit = () => container.classList.toggle('stack-fit', cards.every(card => card.offsetHeight <= window.innerHeight - 120));
      checkFit();
      window.addEventListener('resize', checkFit);
      const observer = new ResizeObserver(checkFit);
      cards.forEach(card => observer.observe(card));
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card, {
          scale: 0.97, ease: 'none',
          scrollTrigger: {trigger: cards[index + 1], start: 'top 80%', end: 'top 120px', scrub: 0.4, invalidateOnRefresh: true}
        });
      });
      return () => {
        window.removeEventListener('resize', checkFit);
        observer.disconnect();
        container.classList.remove('stack-fit');
      };
    }
  });

  // Font metrics can affect scroll positions. Refresh without delaying the page.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
