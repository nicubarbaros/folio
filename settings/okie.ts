/**
 * Okie landing + update-feed publish settings.
 *
 * App source (LS-only, owner merge approval required):
 *   https://github.com/nicubarbaros/okie/pull/10
 *   head e4f865ca2fe0e8b1b92396bd6a700084f6099245
 *   version 1.0.0
 *
 * Built artifact (runtime test in progress; not on GitHub Releases):
 *   Okie-darwin-arm64-1.0.0.zip
 *   size 118198726
 *   SHA256 a3eaced89fd85c8437b7b28f30662592df19c968470f10fdfd6b6ce626203565
 *   SHA512 hex fb9e8dfea438b4623c7e070f3f5cb9496d76bc90cb3a0bf71eac43f6614d9d11e9fd5dcec4ffdb241e89f28bab4ee0d98c41c6cc4fc1028f3c161cb2e3141fd6
 *   feed sha512 base64: +56N/qQ4tGI8fgcPP1y5SW12vJDLOgv3HqxD9mFNnRHp/V3OxP/bJB6J8ourTuDZjEHGzE/BAo88Fhyy4xQf1g==
 *
 * Landing price copy matches live Lemon Squeezy checkout display: $39 USD.
 * Do not change the Lemon product/price/account from folio.
 *
 * downloadUrl stays empty until the public Release asset URL is verified.
 * Proposed Release tag (accepted plan, not created): okie-v1.0.0
 * Keep latest-mac.yml files: [] until absolute asset URL is known — never deploy
 * a relative zip name that does not exist beside the feed.
 *
 * Folio source of truth: cloud branch nicubarbaros/okie-release-publish-2b92.
 */
const okie = {
  /** Public GitHub Release asset URL. Empty until the Release asset is verified. */
  downloadUrl: '',
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
