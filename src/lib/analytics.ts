export type AnalyticsEvent = 'page_view' | 'click_whatsapp' | 'service_click' | 'cta_click' | 'scroll_depth';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/**
 * Fire a GA4 event. Safe to call before gtag.js has loaded (e.g. blocked by
 * an ad blocker or a slow connection) since gtag pushes onto dataLayer.
 */
export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
