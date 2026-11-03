// A disclosure menu retains ordinary navigation when scripts are unavailable.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.getElementById('main-navigation');
const mobileNavigation = window.matchMedia('(max-width: 900px)');
function closeMenu(returnFocus = false) {
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuToggle.focus();
}
header.classList.add('menu-ready');
menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
mainNavigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobileNavigation.matches) return;
  closeMenu();
  const target = document.querySelector(link.hash);
  if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
});
header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
mobileNavigation.addEventListener('change', () => closeMenu());
const backToTop = document.querySelector('.back-to-top');
function updateBackToTop() { if (!backToTop) return; backToTop.hidden = window.scrollY < window.innerHeight; }
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('top').setAttribute('tabindex', '-1');
    document.getElementById('top').focus({ preventScroll: true });
  });
});

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
