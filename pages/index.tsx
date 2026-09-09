import type { NextPage } from 'next';
import Footer from '../components/Footer';
import { useAnimatedTiles } from '../hooks/useAnimatedTiles';

// Each letter animates on its own, so the wordmark is split into spans. The
// caption already names the project, so screen readers skip this.
function Wordmark({ text }: { text: string }) {
  return (
    <div className="home-tile-word" aria-hidden="true">
      {text
        .split('')
        .map((character, index) =>
          character === ' ' ? (
            <span key={index} className="home-tile-word-space" />
          ) : (
            <span key={index}>{character}</span>
          )
        )}
    </div>
  );
}

const Home: NextPage = () => {
  useAnimatedTiles();

  return (
    <div className="home">
      <div className="home-inner">
        <header className="home-intro">
          <div className="home-eyebrow">
            <span className="home-wave" role="img" aria-label="Waving hand">
              👋
            </span>
            HELLO
          </div>

          <h1 className="home-title">
            My name is Nicu, I’m a product builder making <em>micro SaaS</em> tools that do one job well.
          </h1>

          <div className="home-facts">
            <div className="home-fact">
              <span className="home-fact-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M3 12h18" />
                </svg>
              </span>
              <div className="home-fact-body">
                <span className="home-fact-label">Recent Experience</span>
                <span className="home-fact-value">
                  Building Partners and Okie, while full time job at Planable as product engineer.
                </span>
              </div>
            </div>

            <div className="home-fact">
              <span className="home-fact-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div className="home-fact-body">
                <span className="home-fact-label">Location</span>
                <span className="home-fact-value">Chișinău, Moldova</span>
              </div>
            </div>
          </div>
        </header>

        <section className="home-work">
          <div className="home-work-divider">
            <span className="home-work-heading">Things I’m making</span>
            <span className="home-work-rule" />
            <span className="home-work-count">03</span>
          </div>

          <div className="home-project">
            <div className="home-preview home-preview-okie" data-tile="okie">
              <Wordmark text="Okie" />
              <div className="home-tile-pill">COMING SOON</div>
              <div className="home-mock home-mock-okie">
                <div className="home-mock-okie-head">
                  <span>
                    Review <b>3</b> / <b>4</b>
                  </span>
                  <span className="home-mock-okie-severity">
                    <span className="home-mock-okie-dot" />
                    Critical
                  </span>
                </div>
                <div className="home-mock-okie-title">Retry semantics changed</div>
                <p className="home-mock-okie-body">
                  The retry wraps the whole publish step, not only the upload, so a retry can re-run the Instagram
                  publish call.
                </p>
                <div className="home-mock-okie-checklist">
                  <div className="home-mock-okie-item">
                    <span className="home-mock-okie-check">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 5l2.2 2.2L8 3" />
                      </svg>
                    </span>
                    <span className="home-mock-okie-done">Can retries create duplicate posts?</span>
                  </div>
                  <div className="home-mock-okie-item">
                    <span className="home-mock-okie-box" />
                    <span>Should retry wrap only the upload?</span>
                  </div>
                </div>
                <div className="home-mock-okie-actions">
                  <span className="home-mock-okie-ghost">Needs changes</span>
                  <span className="home-mock-okie-primary">Looks good</span>
                </div>
              </div>
            </div>
            <p className="home-caption">
              <strong>Okie</strong>
              <br />
              Better PR reviews for GitHub. Cuts a 142-file PR down to the 4 changes that matter.
            </p>
          </div>

          <a className="home-project" href="https://www.trypartners.app" target="_blank" rel="noopener noreferrer">
            <div className="home-preview home-preview-partners" data-tile="partners">
              <Wordmark text="Partners" />
              <div className="home-mock home-mock-partners">
                <div className="home-mock-partners-head">
                  <span className="home-mock-partners-title">Dashboard</span>
                  <span className="home-mock-partners-cta">New partner</span>
                </div>
                <div className="home-mock-partners-stats">
                  <div className="home-mock-partners-tile">
                    <div className="home-mock-partners-label">Total earned</div>
                    <div className="home-mock-partners-value">$16,505</div>
                  </div>
                  <div className="home-mock-partners-tile">
                    <div className="home-mock-partners-label">Outstanding</div>
                    <div className="home-mock-partners-value">$22,995</div>
                  </div>
                  <div className="home-mock-partners-tile">
                    <div className="home-mock-partners-label">Overdue</div>
                    <div className="home-mock-partners-value is-overdue">$1,200</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="home-caption">
              <strong>Partners</strong> <span className="home-caption-meta">· trypartners.app</span>
              <br />
              Track sponsorship payments and brand deals for creators. Never forget a payment again.
            </p>
          </a>

          <a
            className="home-project"
            href="https://youtube.com/c/WebUnlocked"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="home-preview home-preview-web-unlocked" data-tile="web-unlocked">
              <Wordmark text="Web Unlocked" />
              <div className="home-mock home-mock-video">
                <div className="home-mock-video-inner">
                  <div className="home-mock-video-brand">Web Unlocked</div>
                  <div className="home-mock-video-play">
                    <span />
                  </div>
                  <div className="home-mock-video-duration">12:40</div>
                </div>
              </div>
            </div>
            <p className="home-caption">
              <strong>Web Unlocked</strong> <span className="home-caption-meta">· YouTube</span>
              <br />
              Tutorials on creative web development.
            </p>
          </a>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
