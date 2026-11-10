/**
 * Okie landing + update-feed publish settings.
 *
 * Landing Download CTA → DMG on nicubarbaros/okie-app (swap `downloadUrl` when the
 * final DMG filename is confirmed). Update feed stays on the ZIP in
 * public/okie/updates/latest-mac.yml — do not point the feed at the DMG.
 *
 * Landing price copy matches live Lemon Squeezy checkout display: $39 USD.
 */

/** Website /okie Download button. Swap this when the final DMG asset URL is confirmed. */
export const downloadUrl =
  'https://github.com/nicubarbaros/okie-app/releases/download/v1.0.0/Okie-1.0.0-arm64.dmg';

const okie = {
  downloadUrl,
  ctaLabel: 'Download for Mac',
  buyLicenseUrl:
    'https://trypartners.lemonsqueezy.com/checkout/buy/833b60f9-4e69-4dc0-a870-03cd0f2f06df',
  /**
   * Sales policy shown next to the CTAs (price matches live LS checkout $39 USD):
   * $39 one-time · perpetual installed-app use · updates for one year · 7-day trial.
   * Repurchase extends updates for another year.
   */
  licenseNote: '7-day free trial. $39 · keep the app. Updates for one year.'
} as const;

export default okie;
