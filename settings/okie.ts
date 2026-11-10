/**
 * Okie landing + update-feed publish settings.
 *
 * Landing Download CTA → DMG on nicubarbaros/okie-app (`downloadUrl` below).
 * Update feed stays on the ZIP in public/okie/updates/latest-mac.yml.
 *
 * Landing price copy matches live Lemon Squeezy checkout display: $39 USD.
 */

/** Website /okie Download button (okie-app Release DMG). */
export const downloadUrl =
  'https://github.com/nicubarbaros/okie-app/releases/latest/download/Okie-arm64.dmg';

/** Live Lemon Squeezy checkout display price. */
export const licensePrice = 39;
export const licenseCurrency = 'USD';

const okie = {
  downloadUrl,
  ctaLabel: 'Download for Mac',
  buyLicenseUrl:
    'https://trypartners.lemonsqueezy.com/checkout/buy/833b60f9-4e69-4dc0-a870-03cd0f2f06df',
  licensePrice,
  licenseCurrency,
  /**
   * Sales policy shown next to the CTAs (price matches live LS checkout $39 USD):
   * $39 one-time · perpetual installed-app use · updates for one year · 7-day trial.
   * Repurchase extends updates for another year.
   */
  licenseNote: '7-day free trial. $39 · keep the app. Updates for one year.'
} as const;

export default okie;
