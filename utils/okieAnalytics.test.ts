import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { AnalyticsRuntime } from './gtag';
import {
  downloadFileMeta,
  isOkieSection,
  sectionEnteredView,
  newlyReachedMilestones,
  scrollPercent,
  trackOkieBuyLicenseClick,
  trackOkieDownloadClick,
  trackOkieHowStepSelect,
  trackOkieOutboundClick,
  trackOkieScrollDepth,
  trackOkieSectionView
} from './okieAnalytics';

const DMG = 'https://github.com/nicubarbaros/okie-app/releases/download/v1.0.0/Okie-1.0.0-arm64.dmg';
const CHECKOUT = 'https://trypartners.lemonsqueezy.com/checkout/buy/833b60f9-4e69-4dc0-a870-03cd0f2f06df';

function production(gtag: (...args: unknown[]) => void): AnalyticsRuntime {
  return { nodeEnv: 'production', trackingId: 'G-TEST', gtag };
}

test('downloadFileMeta reads the dmg name and version', () => {
  assert.deepEqual(downloadFileMeta(DMG), {
    fileName: 'Okie-1.0.0-arm64.dmg',
    fileExtension: 'dmg',
    version: '1.0.0'
  });
});

test('downloadFileMeta ignores an in-page anchor', () => {
  assert.equal(downloadFileMeta('https://nicubarbaros.com/okie#download').fileExtension, '');
});

test('scrollPercent reports how much of the page is in view', () => {
  assert.equal(scrollPercent(0, 800, 4000), 20);
  assert.equal(scrollPercent(0, 800, 800), 100);
  assert.equal(scrollPercent(0, 0, 4000), 0);
  assert.equal(scrollPercent(3200, 800, 4000), 100);
  assert.equal(scrollPercent(3198, 800, 4000), 100);
  assert.ok(scrollPercent(3000, 800, 4000) < 100);
});

test('newlyReachedMilestones fires each threshold once', () => {
  const seen = new Set<number>();
  assert.deepEqual(newlyReachedMilestones(10, seen), []);
  assert.deepEqual(newlyReachedMilestones(24.9, seen), []);
  assert.deepEqual(newlyReachedMilestones(25, seen), [25]);
  seen.add(25);
  assert.deepEqual(newlyReachedMilestones(80, seen), [50, 75]);
  seen.add(50);
  seen.add(75);
  assert.deepEqual(newlyReachedMilestones(99.6, seen), []);
  assert.deepEqual(newlyReachedMilestones(100, seen), [100]);
  seen.add(100);
  assert.deepEqual(newlyReachedMilestones(100, seen), []);
});

test('sectionEnteredView marks the top of the window and sections already passed', () => {
  assert.equal(sectionEnteredView(0, 400, 800), true);
  assert.equal(sectionEnteredView(900, 1100, 800), false);
  assert.equal(sectionEnteredView(-200, -20, 800), true);
  assert.equal(sectionEnteredView(700, 780, 800), false);
  assert.equal(sectionEnteredView(600, 700, 800), true);
});

test('isOkieSection accepts the landing sections', () => {
  assert.equal(isOkieSection('hero'), true);
  assert.equal(isOkieSection('product'), true);
  assert.equal(isOkieSection('problem'), true);
  assert.equal(isOkieSection('how'), true);
  assert.equal(isOkieSection('download'), true);
  assert.equal(isOkieSection('footer'), true);
  assert.equal(isOkieSection('pricing'), false);
});

test('download click sends one beacon event', () => {
  const calls: unknown[][] = [];
  trackOkieDownloadClick('hero', {
    url: DMG,
    runtime: production((...args) => {
      calls.push(args);
    })
  });
  assert.deepEqual(calls, [
    [
      'event',
      'okie_download_click',
      {
        location: 'hero',
        version: '1.0.0',
        file_name: 'Okie-1.0.0-arm64.dmg',
        file_extension: 'dmg',
        link_url: DMG,
        transport_type: 'beacon'
      }
    ]
  ]);
});

test('download click ignores an anchor and an empty url', () => {
  const calls: unknown[][] = [];
  const runtime = production((...args) => {
    calls.push(args);
  });
  trackOkieDownloadClick('hero', { url: 'https://nicubarbaros.com/okie#download', runtime });
  trackOkieDownloadClick('download', { url: '', runtime });
  assert.deepEqual(calls, []);
});

test('buy license sends the custom event and begin_checkout', () => {
  const calls: unknown[][] = [];
  trackOkieBuyLicenseClick('download', {
    url: CHECKOUT,
    price: 39,
    currency: 'USD',
    runtime: production((...args) => {
      calls.push(args);
    })
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], 'event');
  assert.equal(calls[0][1], 'okie_buy_license_click');
  assert.deepEqual(calls[0][2], {
    location: 'download',
    currency: 'USD',
    value: 39,
    link_url: CHECKOUT,
    transport_type: 'beacon'
  });
  assert.equal(calls[1][1], 'begin_checkout');
  assert.deepEqual(calls[1][2], {
    location: 'download',
    currency: 'USD',
    value: 39,
    link_url: CHECKOUT,
    items: [{ item_id: 'okie-license', item_name: 'Okie license', price: 39, quantity: 1 }],
    transport_type: 'beacon'
  });
});

test('buy license ignores a missing checkout url and development', () => {
  const calls: unknown[][] = [];
  trackOkieBuyLicenseClick('hero', {
    url: '',
    price: 39,
    currency: 'USD',
    runtime: production((...args) => {
      calls.push(args);
    })
  });
  trackOkieBuyLicenseClick('hero', {
    url: CHECKOUT,
    price: 39,
    currency: 'USD',
    runtime: {
      nodeEnv: 'development',
      trackingId: 'G-TEST',
      gtag: (...args) => {
        calls.push(args);
      }
    }
  });
  assert.deepEqual(calls, []);
});

test('section, scroll, how step, and outbound events use stable names', () => {
  const calls: unknown[][] = [];
  const runtime = production((...args) => {
    calls.push(args);
  });
  trackOkieSectionView('how', { runtime });
  trackOkieScrollDepth(50, { runtime });
  trackOkieScrollDepth(90, { runtime });
  trackOkieHowStepSelect({ stepId: 'brief', stepNumber: 3, stepName: 'Brief' }, { runtime });
  trackOkieOutboundClick({ location: 'footer', linkUrl: 'https://github.com/nicubarbaros' }, { runtime });
  trackOkieOutboundClick({ location: 'footer', linkUrl: 'https://www.nicubarbaros.com/' }, { runtime });
  assert.deepEqual(
    calls.map(call => call[1]),
    ['okie_section_view', 'okie_scroll_depth', 'okie_how_step_select', 'okie_outbound_click']
  );
  assert.deepEqual(calls[0][2], { section_name: 'how' });
  assert.deepEqual(calls[1][2], { percent_scrolled: 50 });
  assert.deepEqual(calls[2][2], { step_id: 'brief', step_number: 3, step_name: 'Brief' });
  assert.deepEqual(calls[3][2], {
    location: 'footer',
    link_url: 'https://github.com/nicubarbaros',
    link_domain: 'github.com',
    outbound: true,
    transport_type: 'beacon'
  });
});

test('analytics calls do not throw when gtag throws or the page has no window', () => {
  const runtime = {
    nodeEnv: 'production',
    trackingId: 'G-TEST',
    gtag: () => {
      throw new Error('blocked');
    }
  };
  assert.doesNotThrow(() => trackOkieDownloadClick('hero', { url: DMG, runtime }));
  assert.doesNotThrow(() => trackOkieSectionView('hero'));
  assert.doesNotThrow(() => trackOkieScrollDepth(25));
  assert.doesNotThrow(() => trackOkieOutboundClick({ location: 'footer', linkUrl: 'not a url' }));
});
