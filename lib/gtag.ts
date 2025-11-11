// lib/gtag.ts

export const GA_MEASUREMENT_ID = 'G-MCK5LMW6WR';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events (optional)
type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
