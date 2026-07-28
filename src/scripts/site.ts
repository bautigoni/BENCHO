import { inView } from 'motion';
import { getAssignedContact, buildWhatsAppUrl } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

function wireWhatsAppCtas(): void {
  const contact = getAssignedContact();
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-whatsapp-cta]');
  const pageMessage = document.body.dataset.defaultWhatsappMessage;

  links.forEach((link) => {
    const customMessage = link.dataset.whatsappMessage ?? pageMessage;
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

function wireParallax(): void {
  const roots = document.querySelectorAll<HTMLElement>('[data-parallax-root]');
  if (roots.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frame: number | undefined;

  const update = () => {
    const viewportHeight = window.innerHeight;

    roots.forEach((root) => {
      const rect = root.getBoundingClientRect();
      const travel = Math.max(rect.height - viewportHeight * 0.35, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      root.style.setProperty('--parallax-y', `${Math.round(progress * 64)}px`);
      root.style.setProperty('--parallax-content-y', `${Math.round(progress * 34)}px`);
      root.style.setProperty('--parallax-opacity', String(Math.max(0.35, 1 - progress * 0.78)));
      root.style.setProperty('--scroll-progress', String(progress));
    });

    frame = undefined;
  };

  const scheduleUpdate = () => {
    if (frame !== undefined) return;
    frame = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
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
  wireParallax();
  wireScrollDepthTracking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
