/**
 * Okie landing + update-feed publish settings.
 *
 * Landing Download CTA → DMG on nicubarbaros/okie-app (`downloadUrl` below).
 * Update feed stays on the ZIP in public/okie/updates/latest-mac.yml.
 *
 * Landing price copy is $39 USD.
 */

/** Website /okie Download button (okie-app Release DMG). */
export const downloadUrl =
  'https://github.com/nicubarbaros/okie-app/releases/latest/download/Okie-arm64.dmg';

/** License price shown on the landing page. */
export const licensePrice = 39;
export const licenseCurrency = 'USD';

/**
 * Gumroad checkout URL. `wanted=true` opens the checkout directly.
 * Every Buy license link reads this constant.
 */
export const buyLicenseUrl = 'https://nicubarbaros.gumroad.com/l/zxoaf?wanted=true';

const okie = {
  downloadUrl,
  ctaLabel: 'Download for Mac',
  buyLicenseUrl,
  licensePrice,
  licenseCurrency,
  /**
   * Sales policy shown next to the CTAs:
   * $39 one-time · perpetual installed-app use · updates for one year · 7-day trial.
   * Repurchase extends updates for another year.
   */
  licenseNote: '7-day free trial. $39 · keep the app. Updates for one year.'
} as const;

export default okie;
