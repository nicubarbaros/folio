import okie from '../settings/okie';
import type { AnalyticsRuntime } from './gtag';
import { trackEvent } from './gtag';

export const OKIE_SECTIONS = ['hero', 'product', 'problem', 'how', 'download', 'footer'] as const;
export type OkieSection = (typeof OKIE_SECTIONS)[number];
export type OkieCtaLocation = 'hero' | 'download';

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;
const OWN_HOSTS = new Set(['nicubarbaros.com', 'www.nicubarbaros.com', 'localhost', '127.0.0.1']);
const DOWNLOAD_EXTENSIONS = new Set(['dmg', 'zip']);

type TrackOptions = {
  runtime?: AnalyticsRuntime;
};

export function downloadFileMeta(url: string): { fileName: string; fileExtension: string; version: string } {
  const empty = { fileName: '', fileExtension: '', version: '' };
  if (!url) return empty;
  try {
    const fileName = decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || '');
    const extensionMatch = fileName.match(/\.([a-z0-9]+)$/i);
    const versionMatch = fileName.match(/(\d+\.\d+\.\d+)/);
    return {
      fileName,
      fileExtension: extensionMatch ? extensionMatch[1].toLowerCase() : '',
      version: versionMatch ? versionMatch[1] : ''
    };
  } catch {
    return empty;
  }
}

export function scrollPercent(scrollTop: number, viewportHeight: number, documentHeight: number): number {
  if (viewportHeight <= 0 || documentHeight <= 0) return 0;
  if (documentHeight <= viewportHeight) return 100;
  if (scrollTop + viewportHeight >= documentHeight - 2) return 100;
  const ratio = ((scrollTop + viewportHeight) / documentHeight) * 100;
  return Math.min(100, Math.max(0, ratio));
}

export function newlyReachedMilestones(percent: number, seen: ReadonlySet<number>): number[] {
  return SCROLL_MILESTONES.filter(milestone => percent >= milestone && !seen.has(milestone));
}

export function sectionEnteredView(top: number, bottom: number, viewportHeight: number): boolean {
  if (viewportHeight <= 0) return false;
  if (bottom <= 0 && top < bottom) return true;
  return top < viewportHeight * 0.8 && bottom > 0;
}

export function isOkieSection(value: string): value is OkieSection {
  return (OKIE_SECTIONS as readonly string[]).includes(value);
}

export function trackOkieDownloadClick(location: OkieCtaLocation, options?: TrackOptions & { url?: string }) {
  try {
    const url = options?.url ?? okie.downloadUrl;
    const meta = downloadFileMeta(url);
    if (!DOWNLOAD_EXTENSIONS.has(meta.fileExtension)) return;
    trackEvent(
      'okie_download_click',
      {
        location,
        version: meta.version || undefined,
        file_name: meta.fileName,
        file_extension: meta.fileExtension,
        link_url: url
      },
      { beacon: true, runtime: options?.runtime }
    );
  } catch {
    // A bad download url must not break the click.
  }
}

export function trackOkieBuyLicenseClick(
  location: OkieCtaLocation,
  options?: TrackOptions & { url?: string; price?: number; currency?: string }
) {
  try {
    const url = options?.url ?? okie.buyLicenseUrl;
    if (!/^https?:\/\//i.test(url)) return;
    const price = options?.price ?? okie.licensePrice;
    const currency = options?.currency ?? okie.licenseCurrency;
    const params = { location, currency, value: price, link_url: url };
    trackEvent('okie_buy_license_click', params, { beacon: true, runtime: options?.runtime });
    trackEvent(
      'begin_checkout',
      {
        ...params,
        items: [{ item_id: 'okie-license', item_name: 'Okie license', price, quantity: 1 }]
      },
      { beacon: true, runtime: options?.runtime }
    );
  } catch {
    // A bad checkout url must not break the click.
  }
}

export function trackOkieSectionView(section: OkieSection, options?: TrackOptions) {
  trackEvent('okie_section_view', { section_name: section }, { runtime: options?.runtime });
}

export function trackOkieScrollDepth(percent: number, options?: TrackOptions) {
  if (!(SCROLL_MILESTONES as readonly number[]).includes(percent)) return;
  trackEvent('okie_scroll_depth', { percent_scrolled: percent }, { runtime: options?.runtime });
}

export function trackOkieHowStepSelect(
  step: { stepId: string; stepNumber: number; stepName: string },
  options?: TrackOptions
) {
  if (!step.stepId || !Number.isFinite(step.stepNumber)) return;
  trackEvent(
    'okie_how_step_select',
    { step_id: step.stepId, step_number: step.stepNumber, step_name: step.stepName },
    { runtime: options?.runtime }
  );
}

export function trackOkieOutboundClick(click: { location: string; linkUrl: string }, options?: TrackOptions) {
  try {
    const parsed = new URL(click.linkUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return;
    if (OWN_HOSTS.has(parsed.hostname)) return;
    trackEvent(
      'okie_outbound_click',
      {
        location: click.location,
        link_url: click.linkUrl,
        link_domain: parsed.hostname,
        outbound: true
      },
      { beacon: true, runtime: options?.runtime }
    );
  } catch {
    // A malformed href must not break the click.
  }
}
