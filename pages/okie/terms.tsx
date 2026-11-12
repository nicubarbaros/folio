import type { NextPage } from 'next';
import Link from 'next/link';
import OkieLegalPage from '../../components/OkieLegalPage';
import { OKIE_ISSUES_URL, OkieExternalLink } from '../../components/OkieFooter';

const Terms: NextPage = () => {
  return (
    <OkieLegalPage
      title="Terms of Use"
      description="Terms for Okie: the license sold through Lemon Squeezy, the 7-day trial, one year of updates, and your responsibility for GitHub and AI use."
    >
      <section className="okie-legal-section">
        <h2>The software</h2>
        <p>These terms cover Okie, a Mac app.</p>
        <p>Okie is provided as is. The developer gives no warranty.</p>
        <p>
          As far as the law allows, the developer is not liable for damage that comes from using Okie, or from Okie
          failing. That includes lost data, lost profits, and actions the app takes on GitHub.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>License</h2>
        <p>A license is sold per purchase through Lemon Squeezy. Lemon Squeezy handles payment. Okie does not see card data.</p>
        <p>You get a 7-day free trial. Okie records the trial start on your Mac.</p>
        <p>
          The purchase includes updates for one year from the purchase. After that year, the installed app keeps
          working. Update checks stop until another purchase.
        </p>
        <p>If a license check cannot reach Lemon Squeezy, a key that was already active keeps working for 3 days.</p>
        <p>Refunds follow the terms Lemon Squeezy shows at checkout.</p>
      </section>

      <section className="okie-legal-section">
        <h2>GitHub</h2>
        <p>
          You are responsible for actions Okie takes on GitHub on your behalf. Those actions include pull request
          reviews, issue comments, review replies, resolving or unresolving a thread, and merges. The same
          responsibility covers actions fired by a workflow you configure.
        </p>
        <p>You must follow GitHub&apos;s terms.</p>
      </section>

      <section className="okie-legal-section">
        <h2>AI output</h2>
        <p>
          Okie can run Claude Code or the Cursor CLI on your Mac. Output from those tools can be wrong. You must follow
          the terms of the AI provider you use. Anthropic&apos;s terms cover Claude Code, and Cursor&apos;s terms cover
          the Cursor CLI.
        </p>
      </section>

      <section className="okie-legal-section">
        <h2>Contact</h2>
        <p>
          Questions go to GitHub issues on{' '}
          <OkieExternalLink href={OKIE_ISSUES_URL} location="contact">
            nicubarbaros/okie-app
          </OkieExternalLink>
          .
        </p>
        <p>
          Read the <Link href="/okie/privacy"><a>Privacy Policy</a></Link> for the data Okie handles.
        </p>
      </section>
    </OkieLegalPage>
  );
};

export default Terms;
