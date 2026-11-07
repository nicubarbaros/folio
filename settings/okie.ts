/**
 * Okie landing + update-feed publish settings.
 *
 * The Mac zip is hosted as a public GitHub Release asset on nicubarbaros/folio
 * (too large to commit). Leave downloadUrl empty until that asset URL exists.
 * Example shape once ready:
 *   https://github.com/nicubarbaros/folio/releases/download/<tag>/<asset>.zip
 *
 * After upload, also fill public/okie/updates/latest-mac.yml with the same
 * absolute asset URL, sha512, size, version, and releaseDate.
 */
const okie = {
  /** Public GitHub Release asset URL for the unsigned Apple Silicon Mac zip. */
  downloadUrl: '',
  ctaLabel: 'Download for Mac',
  buyLicenseUrl:
    'https://trypartners.lemonsqueezy.com/checkout/buy/833b60f9-4e69-4dc0-a870-03cd0f2f06df',
  /**
   * Sales policy shown next to the CTAs:
   * €39 one-time · perpetual installed-app use · updates for one year · 7-day trial.
   * Repurchase extends updates for another year.
   */
  licenseNote: '7-day free trial. €39 · keep the app. Updates for one year.'
} as const;

export default okie;
