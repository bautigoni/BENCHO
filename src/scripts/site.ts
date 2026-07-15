import { inView } from 'motion';
import { getAssignedContact, buildWhatsAppUrl } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

function wireWhatsAppCtas(): void {
  const contact = getAssignedContact();
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-whatsapp-cta]');

  links.forEach((link) => {
    const customMessage = link.dataset.whatsappMessage;
    link.href = buildWhatsAppUrl(contact, customMessage);
    link.addEventListener('click', () => {
      trackEvent('click_whatsapp', {
        contact: contact.id,
        location: link.dataset.ctaLocation ?? 'unknown'
      });
    });
  });
}

function wireCtaTracking(): void {
  document.querySelectorAll<HTMLElement>('[data-track="cta_click"]').forEach((el) => {
    el.addEventListener('click', () => {
      trackEvent('cta_click', { location: el.dataset.ctaLocation ?? 'unknown' });
    });
  });

  document.querySelectorAll<HTMLElement>('[data-track="service_click"]').forEach((el) => {
    el.addEventListener('click', () => {
      trackEvent('service_click', { service: el.dataset.service ?? 'unknown' });
    });
  });
}

function wireScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal');
  if (targets.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  targets.forEach((el, index) => {
    const delay = el.dataset.revealDelay ?? String(Math.min(index % 4, 3) * 0.08);
    el.style.setProperty('--reveal-delay', `${delay}s`);

    inView(el, () => el.classList.add('is-visible'), { amount: 0.2, margin: '0px 0px -10% 0px' });
  });
}

function wireScrollDepthTracking(): void {
  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();

  const onScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const progress = (window.scrollY / scrollable) * 100;

    thresholds.forEach((threshold) => {
      if (progress >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackEvent('scroll_depth', { depth: threshold });
      }
    });

    if (fired.size === thresholds.length) {
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

function init(): void {
  wireWhatsAppCtas();
  wireCtaTracking();
  wireScrollReveal();
  wireScrollDepthTracking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
