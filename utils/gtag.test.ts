import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { AnalyticsRuntime } from './gtag';
import { event, pageView, shouldSendRoutePageView, trackEvent } from './gtag';

function production(gtag: (...args: unknown[]) => void, trackingId = 'G-TEST'): AnalyticsRuntime {
  return { nodeEnv: 'production', trackingId, gtag };
}

const roadmapEvent = {
  action: 'submit_form',
  category: 'Roadmap',
  label: 'email',
  value: 'reader@example.com'
};

test('the load path is not sent again as the first client route', () => {
  assert.equal(shouldSendRoutePageView('/okie', '/okie', false), false);
  assert.equal(shouldSendRoutePageView('/okie?ref=1', '/okie', false), true);
  assert.equal(shouldSendRoutePageView('/', '/okie', false), true);
  assert.equal(shouldSendRoutePageView('/okie', '/okie', true), true);
});

test('pageView sends the path in production when gtag is loaded', () => {
  const calls: unknown[][] = [];
  pageView(
    '/okie',
    production((...args) => {
      calls.push(args);
    })
  );
  assert.deepEqual(calls, [['config', 'G-TEST', { page_path: '/okie' }]]);
});

test('pageView does nothing in development', () => {
  const calls: unknown[][] = [];
  pageView('/okie', {
    nodeEnv: 'development',
    trackingId: 'G-TEST',
    gtag: (...args) => {
      calls.push(args);
    }
  });
  assert.deepEqual(calls, []);
});

test('pageView does nothing when gtag or the measurement id is missing', () => {
  const calls: unknown[][] = [];
  assert.doesNotThrow(() => pageView('/okie', { nodeEnv: 'production', trackingId: 'G-TEST', gtag: undefined }));
  pageView('/okie', {
    nodeEnv: 'production',
    trackingId: '',
    gtag: (...args) => {
      calls.push(args);
    }
  });
  assert.deepEqual(calls, []);
});

test('pageView swallows gtag errors', () => {
  assert.doesNotThrow(() =>
    pageView('/okie', {
      nodeEnv: 'production',
      trackingId: 'G-TEST',
      gtag: () => {
        throw new Error('blocked');
      }
    })
  );
});

test('event keeps the roadmap payload', () => {
  const calls: unknown[][] = [];
  event(
    roadmapEvent,
    production((...args) => {
      calls.push(args);
    })
  );
  assert.deepEqual(calls, [
    [
      'event',
      'submit_form',
      {
        event_category: 'Roadmap',
        event_label: 'email',
        event_value: 'reader@example.com'
      }
    ]
  ]);
});

test('event does nothing in development and when gtag is missing', () => {
  const calls: unknown[][] = [];
  event(roadmapEvent, {
    nodeEnv: 'development',
    trackingId: 'G-TEST',
    gtag: (...args) => {
      calls.push(args);
    }
  });
  assert.doesNotThrow(() => event(roadmapEvent, { nodeEnv: 'production', trackingId: 'G-TEST', gtag: undefined }));
  assert.deepEqual(calls, []);
});

test('trackEvent sends beacon transport and drops empty params', () => {
  const calls: unknown[][] = [];
  trackEvent(
    'okie_download_click',
    { location: 'hero', version: '1.0.0', file_name: undefined },
    {
      beacon: true,
      runtime: production((...args) => {
        calls.push(args);
      })
    }
  );
  assert.deepEqual(calls, [
    ['event', 'okie_download_click', { location: 'hero', version: '1.0.0', transport_type: 'beacon' }]
  ]);
});

test('trackEvent does nothing in development and swallows gtag errors', () => {
  const calls: unknown[][] = [];
  trackEvent(
    'okie_download_click',
    { location: 'hero' },
    {
      beacon: true,
      runtime: {
        nodeEnv: 'development',
        trackingId: 'G-TEST',
        gtag: (...args) => {
          calls.push(args);
        }
      }
    }
  );
  assert.doesNotThrow(() =>
    trackEvent(
      'okie_download_click',
      { location: 'hero' },
      {
        runtime: {
          nodeEnv: 'production',
          trackingId: 'G-TEST',
          gtag: () => {
            throw new Error('blocked');
          }
        }
      }
    )
  );
  assert.deepEqual(calls, []);
});
