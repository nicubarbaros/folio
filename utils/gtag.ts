export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export type AnalyticsRuntime = {
  nodeEnv?: string;
  trackingId?: string;
  gtag?: ((...args: unknown[]) => void) | undefined;
};

type EventParams = Record<string, unknown>;

type RoadmapEvent = {
  action: string;
  category: string;
  label: string;
  value: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __GA_TRACKING_ID?: string;
  }
}

function currentRuntime(): AnalyticsRuntime {
  const fromWindow = typeof window !== 'undefined' ? window.__GA_TRACKING_ID : '';
  return {
    nodeEnv: process.env.NODE_ENV,
    trackingId: fromWindow || process.env.GA_TRACKING_ID || '',
    gtag: typeof window === 'undefined' ? undefined : window.gtag
  };
}

function send(runtime: AnalyticsRuntime, command: 'config' | 'event', ...args: unknown[]) {
  if (runtime.nodeEnv !== 'production') return;
  const gtag = runtime.gtag;
  if (typeof gtag !== 'function') return;
  gtag(command, ...args);
}

export function shouldSendRoutePageView(url: string, initialUrl: string, alreadyHandledInitial: boolean): boolean {
  if (alreadyHandledInitial) return true;
  return url.split('#')[0] !== initialUrl;
}

export const pageView = (url: string, runtime: AnalyticsRuntime = currentRuntime()) => {
  try {
    if (!runtime.trackingId) return;
    send(runtime, 'config', runtime.trackingId, { page_path: url });
  } catch {
    // A blocked tag must not break navigation.
  }
};

export const event = (
  { action, category, label, value }: RoadmapEvent,
  runtime: AnalyticsRuntime = currentRuntime()
) => {
  try {
    send(runtime, 'event', action, {
      event_category: category,
      event_label: label,
      event_value: value
    });
  } catch {
    // A blocked tag must not break the form.
  }
};

export function trackEvent(
  action: string,
  params: EventParams = {},
  options?: { beacon?: boolean; runtime?: AnalyticsRuntime }
) {
  try {
    const runtime = options?.runtime ?? currentRuntime();
    const payload: EventParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) payload[key] = value;
    }
    if (options?.beacon) payload.transport_type = 'beacon';
    send(runtime, 'event', action, payload);
  } catch {
    // A blocked tag must not break the click.
  }
}
