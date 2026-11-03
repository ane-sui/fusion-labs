/* Fusion Labs: the idea assembles, then each iteration sharpens the work. */
(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
    const { desktop, reduced } = context.conditions;
    if (reduced) return;
    // A typographic cut reveals the studio promise; default HTML stays visible.
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero-line > span', { yPercent: 110, rotation: 3, duration: 1.05, stagger: .14, clearProps: 'transform' })
      .from('.hero .sculpture-front', { y: 45, opacity: .3, duration: 1.1, clearProps: 'transform,opacity' }, .12)
      .from('.hero-bottom > *', { y: 22, opacity: 0, duration: .65, stagger: .08, clearProps: 'transform,opacity' }, .45);
    gsap.to('.hero .studio-sculpture', { y: desktop ? 90 : 18, rotation: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .7 } });

    // Each word resolves as the visitor moves through our iterative mindset.
    const manifesto = gsap.timeline({ scrollTrigger: { trigger: '.manifesto-stage', start: 'top 85%', end: 'bottom 48%', scrub: .5, invalidateOnRefresh: true } });
    gsap.utils.toArray('.manifesto-statement > span').forEach((word, index) => {
      manifesto.from(word, { x: desktop ? 100 : 28, opacity: .22, clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power2.out' }, index * .6);
    });
    manifesto.fromTo('.manifesto-sculpture', { y: -25, rotation: -12 }, { y: 35, rotation: 8, duration: 2.2, ease: 'none' }, 0);

    // Opposing type layers make shared progress tangible without moving body copy.
    gsap.fromTo('.community-word-back', { x: desktop ? -22 : -8 }, { x: desktop ? 22 : 8, ease: 'none', scrollTrigger: { trigger: '.community-art', start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.community-word-front', { x: desktop ? 24 : 8 }, { x: desktop ? -16 : -8, ease: 'none', scrollTrigger: { trigger: '.community-art', start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.growth-type', { y: desktop ? -25 : -8 }, { y: desktop ? 25 : 8, ease: 'none', scrollTrigger: { trigger: '.offer-growth', start: 'top bottom', end: 'bottom top', scrub: .6 } });

    const cards = gsap.utils.toArray('.offer-card');
    cards.slice(0, -1).forEach((card, index) => {
      gsap.to(card, { scale: desktop ? .94 : .985, ease: 'none', scrollTrigger: { trigger: cards[index + 1], start: 'top 85%', end: () => 'top ' + Math.max(48, window.innerHeight * .2) + 'px', scrub: .5, invalidateOnRefresh: true } });
    });
    // Image movement stays within each photograph; it never obstructs the copy.
    if (desktop) gsap.utils.toArray('.offer-image img').forEach(img => {
      gsap.fromTo(img, { scale: 1.12, yPercent: -3 }, { scale: 1.04, yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.closest('.offer-card'), start: 'top bottom', end: 'top 15%', scrub: .7 } });
    });
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
