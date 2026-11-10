/**
 * Okie landing + update-feed publish settings.
 *
 * Release: https://github.com/nicubarbaros/folio/releases/tag/okie-v1.0.0
 * Asset: Okie-darwin-arm64-1.0.0.zip (unsigned Apple Silicon)
 * size 118213399
 * SHA256 878999950c557a9faf289844421ab75afac4d9ddfd70c758c4020cf1553117fd
 * SHA512 base64 in public/okie/updates/latest-mac.yml
 *
 * Landing price copy matches live Lemon Squeezy checkout display: $39 USD.
 */
const okie = {
  downloadUrl:
    'https://github.com/nicubarbaros/folio/releases/download/okie-v1.0.0/Okie-darwin-arm64-1.0.0.zip',
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
