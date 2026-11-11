import type { NextPage } from 'next';
import Link from 'next/link';
import OkieLegalPage from '../../components/OkieLegalPage';
import { OKIE_ISSUES_URL, OkieExternalLink } from '../../components/OkieFooter';

const Privacy: NextPage = () => {
  return (
    <OkieLegalPage
      title="Privacy Policy"
      description="What Okie stores on your Mac, what it sends to GitHub, a local AI CLI, and Lemon Squeezy, and how this website uses Google Analytics 4."
    >
      <section className="okie-legal-section">
        <h2>What stays on your Mac</h2>
        <p>
          Okie keeps a data folder on the Mac at <code>~/Library/Application Support/Okie/okie</code>. An older install
          can still be using <code>~/Library/Application Support/Review Cockpit/review-cockpit</code>.
        </p>
        <p>
          <code>settings.json</code> stores:
        </p>
        <ul>
          <li>workspaces</li>
          <li>repository names</li>
          <li>tracked GitHub logins</li>
          <li>title filters</li>
          <li>workflow sections</li>
          <li>the poll interval</li>
          <li>the notification flag</li>
          <li>your GitHub login</li>
          <li>the AI CLI and model you chose</li>
          <li>local clone paths</li>
          <li>critical-area choices for each repository</li>
        </ul>
        <p>
          <code>token.bin</code> stores the GitHub access token. Electron safeStorage encrypts it with the macOS
          Keychain. The file mode is 0600. If encryption is unavailable, <code>token.local</code> stores the token
          unencrypted, with file mode 0600.
        </p>
        <p>
          <code>license.bin</code>, or <code>license.local</code>, stores the license proof:
        </p>
        <ul>
          <li>provider</li>
          <li>license key</li>
          <li>Lemon Squeezy instance id</li>
          <li>last validation</li>
          <li>expiry</li>
          <li>status</li>
          <li>purchase time</li>
          <li>the updates-until time</li>
        </ul>
        <p>
          <code>trial.json</code> stores the time the trial started.
        </p>
        <p>
          Okie also caches text on the Mac. The cache holds AI-generated triage, guide, questions, and impact text
          for a pull request, plus diff facts, a repository analysis, a feature map, workflow lane assignments, local
          review progress, and review logo URLs.
        </p>
        <p>
          The updater log is <code>~/Library/Logs/Okie/main.log</code>.
        </p>
        <p>
          <code>localStorage</code> stores UI preferences only: hidden experiments, and the panel width.
        </p>
        <p>
          A feature-map build with no linked clone downloads the default-branch tarball into a temporary folder. The
          download is capped at 150 MB. Okie deletes that folder when the build finishes.
        </p>
        <p>Okie has no server. This data stays on the Mac. The developer does not receive it.</p>
      </section>

      <section className="okie-legal-section">
        <h2>GitHub</h2>
        <p>
          Sign-in uses the GitHub OAuth device flow. The scopes are <code>read:user</code>, <code>read:org</code>, and{' '}
          <code>repo</code>. The token stays on the Mac, in the files above. Okie reads your GitHub login.
        </p>
        <p>With that token, Okie reads:</p>
        <ul>
          <li>your user</li>
          <li>repositories</li>
          <li>organizations</li>
          <li>pull requests that request your review</li>
          <li>reviews</li>
          <li>tracked authors</li>
          <li>pull request details</li>
          <li>patches</li>
          <li>comments</li>
          <li>commits</li>
          <li>check runs</li>
          <li>file contents</li>
          <li>the git tree</li>
          <li>the default-branch tarball</li>
        </ul>
        <p>
          Okie writes to GitHub when you act, or when a workflow you configured fires. A write can be a pull request
          review, an issue comment, a review reply, resolving or unresolving a thread, or a merge.
        </p>
        <p>
          Guided review can upload a small Okie logo image to GitHub user-attachments. The review body can include a
          link to{' '}
          <Link href="/okie">
            <a>https://www.nicubarbaros.com/okie</a>
          </Link>
          .
        </p>
        <p>A linked local clone is read only. Okie does not push it.</p>
      </section>

      <section className="okie-legal-section">
        <h2>Local AI CLI</h2>
        <p>
          Okie does not call an AI provider, and it stores no AI API key. It runs a CLI you install on the Mac: Claude
          Code (<code>claude</code>) or the Cursor CLI (<code>cursor-agent</code>). The prompt is passed through stdin.
        </p>
        <p>
          A prompt contains the pull request title, repository, number, author, and file stats. The description is
          limited to 4,000 characters. The prompt contains the file list and diff patches. Each file is limited to
          8,000 characters, and the patches together are limited to 60,000 characters. Generated files and binary files
          are skipped. Chat messages are included.
        </p>
        <p>
          For a repository analysis, the prompt contains the repository name, description, language, dependency names,
          and a directory outline.
        </p>
        <p>
          Those CLIs send that data to their own providers. Claude Code sends it to Anthropic, and the Cursor CLI sends
          it to Cursor. Each provider&apos;s own terms apply. That transfer is outside Okie.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>Lemon Squeezy</h2>
        <p>The trial lasts 7 days. Okie tracks it on the Mac only.</p>
        <p>
          Activation sends the license key and an instance name to <code>api.lemonsqueezy.com</code>. The instance name
          is the Mac&apos;s hostname, limited to 100 characters. Validation and deactivation send the license key and
          the instance id. While a license is saved, validation runs about once an hour.
        </p>
        <p>
          Updates are included for one year after purchase. After that year the app keeps working, and update checks
          stop.
        </p>
        <p>If validation cannot be reached, a key that was already active keeps working for 3 days.</p>
        <p>
          The Buy button opens the Lemon Squeezy checkout in the browser. Lemon Squeezy handles the payment as the
          merchant of record. Okie does not see card data.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>Update checks</h2>
        <p>
          The packaged app checks releases on the public GitHub repository <code>nicubarbaros/okie-app</code>. The check
          sends no token. It runs at launch and when the window gains focus, at most every 15 minutes. If an install
          fails, Okie opens the public DMG download URL.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>Analytics and crash reporting</h2>
        <p>The app contains no analytics SDK and no crash reporter. electron-log writes on the Mac only.</p>
        <p>
          This website, www.nicubarbaros.com, uses Google Analytics 4, including on /okie. The measurement ID is{' '}
          <code>G-LM06B10M7C</code>. Google Analytics 4 uses cookies.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>Contact</h2>
        <p>
          For support and questions, open a GitHub issue on{' '}
          <OkieExternalLink href={OKIE_ISSUES_URL} location="contact">
            nicubarbaros/okie-app
          </OkieExternalLink>
          .
        </p>
        <p>
          See the <Link href="/okie/terms"><a>Terms of Use</a></Link>.
        </p>
      </section>
    </OkieLegalPage>
  );
};

export default Privacy;
