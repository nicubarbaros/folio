/**
 * Okie landing + update-feed publish settings.
 *
 * App source (LS-only release, do not merge without owner approval):
 *   https://github.com/nicubarbaros/okie/pull/10
 *   head e4f865ca2fe0e8b1b92396bd6a700084f6099245
 *   version 1.0.0
 *   expected zip: Okie-darwin-arm64-1.0.0.zip
 *
 * Mac packaging runs on the owner's personal arm64 Mac. Until that zip is
 * built, tested, uploaded, and its Release asset URL + sha512/size are known,
 * leave downloadUrl empty. Do not invent a published URL.
 *
 * Hosting: public GitHub Release asset on nicubarbaros/folio (zip >100MB —
 * never commit the zip). Cloud branch nicubarbaros/okie-release-publish-2b92
 * is the folio source of truth; ignore unrelated dirty local folio checkouts.
 *
 * After the asset exists, set downloadUrl to the Release asset URL, e.g.:
 *   https://github.com/nicubarbaros/folio/releases/download/<tag>/Okie-darwin-arm64-1.0.0.zip
 * and fill public/okie/updates/latest-mac.yml with the same absolute URL plus
 * the measured sha512/size/version/releaseDate (absolute URL required because
 * the zip is not served beside the feed).
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
