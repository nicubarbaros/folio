import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

// There is no build to hand out yet. Fill this in and both calls to action
// become real download links; until then they anchor to the download section.
const downloadUrl = '';
const ctaLabel = 'Download for Mac';

type Tone = 'critical' | 'changed' | 'plain';

const meaningfulChanges: Array<{ label: string; description: string; files: string; tone: Tone }> = [
  {
    label: 'We move continue-watching to a precomputed feed.',
    description: 'The TV home reads a cached feed instead of querying playback history on render.',
    files: '4 files',
    tone: 'critical'
  },
  {
    label: 'We rebuild the feed when playback stops.',
    description: 'A new worker listens for playback-stop events and writes the feed.',
    files: '3 files',
    tone: 'critical'
  },
  {
    label: 'We retry a failed feed rebuild.',
    description: 'Three attempts with backoff. The retry wraps the whole rebuild, not only the write.',
    files: '3 files',
    tone: 'critical'
  },
  {
    label: 'The row shows a stale badge while a rebuild is pending.',
    description: 'Badge and skeleton state on the TV home row.',
    files: '2 files',
    tone: 'changed'
  }
];

const architectureSteps: Array<{ label: string; tone: Tone }> = [
  { label: 'You open the TV home on a profile.', tone: 'plain' },
  { label: 'We read the continue-watching feed for that profile.', tone: 'critical' },
  { label: 'A worker rebuilds the feed when playback stops.', tone: 'critical' },
  { label: 'We store the feed with a TTL.', tone: 'changed' }
];

const briefSteps: Array<{ label: string; tone: Tone }> = [
  { label: 'You open the TV home on a profile.', tone: 'plain' },
  { label: 'You resume a title from the row.', tone: 'critical' },
  { label: 'We read the continue-watching feed for that profile.', tone: 'critical' },
  { label: 'The player starts from the saved position.', tone: 'changed' }
];

const inboxItems = [
  { id: '#481', title: 'Add continue-watching row to the TV home', meta: 'critical · 12 min', tone: 'critical' },
  { id: '#479', title: 'Refactor profile switcher state', meta: 'high · 8 min', tone: 'high' },
  { id: '#483', title: 'Migrate playback events to v2 schema', meta: 'medium · 6 min', tone: 'medium' },
  { id: '#312', title: 'Retry failed playback heartbeats', meta: 'routine · 1 min', tone: 'routine' }
];

const completedUnits = [
  'Retry policy for failed playback heartbeats',
  'Heartbeats carry a monotonic sequence number',
  'Tests cover the exhausted-retry path'
];

const toneLabel: Partial<Record<Tone, string>> = { critical: 'new', changed: 'changed' };

function AppleLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.64c.03 2.8 2.45 3.73 2.48 3.74-.02.07-.39 1.33-1.28 2.63-.77 1.13-1.57 2.25-2.83 2.27-1.24.02-1.64-.73-3.05-.73-1.42 0-1.86.71-3.03.76-1.22.05-2.14-1.22-2.92-2.34C4.15 16.67 2.93 12.5 4.57 9.66c.81-1.41 2.27-2.3 3.85-2.33 1.2-.02 2.33.81 3.06.81.73 0 2.11-1 3.55-.85.6.02 2.3.24 3.39 1.83-.09.05-2.02 1.18-2.05 3.52M13.2 5.97c.65-.79 1.09-1.88.97-2.97-.94.04-2.07.62-2.74 1.41-.6.7-1.13 1.81-.99 2.88 1.04.08 2.11-.53 2.76-1.32" />
    </svg>
  );
}

function DownloadCta({ variant }: { variant: 'primary' | 'invert' }) {
  const isLink = Boolean(downloadUrl);

  return (
    <a
      className={`okie-cta okie-cta-${variant}`}
      href={isLink ? downloadUrl : '#download'}
      {...(isLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <AppleLogo />
      {ctaLabel}
    </a>
  );
}

function SidebarGroup({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <>
      <div className="okie-sidebar-heading">
        {label} <span>{count}</span>
      </div>
      {children}
    </>
  );
}

function SidebarRow({ label, count, active }: { label: string; count?: number; active?: boolean }) {
  return (
    <div className={`okie-sidebar-row${active ? ' is-active' : ''}`}>
      <span>{label}</span>
      <span className="okie-mono">{count}</span>
    </div>
  );
}

function FlowStep({ label, tone }: { label: string; tone: Tone }) {
  return (
    <div className={`okie-flow-step is-${tone}`}>
      <span>{label}</span>
      {toneLabel[tone] && <span className="okie-flow-tag">{toneLabel[tone]}</span>}
    </div>
  );
}

function Flow({ steps }: { steps: Array<{ label: string; tone: Tone }> }) {
  return (
    <>
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          {index > 0 && <div className="okie-flow-arrow">↓</div>}
          <FlowStep label={step.label} tone={step.tone} />
        </React.Fragment>
      ))}
    </>
  );
}

const Okie: NextPage = () => {
  return (
    <div className="okie">
      <Head>
        <title>Okie — Better PR reviews for GitHub</title>
        <meta
          name="description"
          content="Okie is a Mac app for reviewing GitHub pull requests. It reads the PR before you do, writes the brief, groups 142 files into 4 review units, and walks you through them."
        />
      </Head>

      <div className="okie-inner">
        <header className="okie-intro">
          <div className="okie-brand">
            <span className="okie-brand-mark" aria-hidden="true">
              O
            </span>
            <span className="okie-brand-name">Okie</span>
          </div>

          <h1 className="okie-title">
            Understand the change. <em>Then decide.</em>
          </h1>

          <p className="okie-lede">
            Okie is a Mac app for reviewing GitHub pull requests. It reads the PR before you do, writes the brief,
            groups 142 files into 4 review units, and walks you through them. You approve on GitHub.
          </p>

          <div className="okie-actions">
            <DownloadCta variant="primary" />
            <a className="okie-cta okie-cta-ghost" href="#how">
              See how a review works
            </a>
          </div>
        </header>

        <section className="okie-shot">
          <div className="okie-shot-frame">
            <div className="okie-shot-watermark" aria-hidden="true">
              Okie
            </div>

            <div className="okie-window">
              <div className="okie-window-bar">
                <div className="okie-window-lights" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  Okie <span className="okie-window-slash">/</span> <span className="okie-mono">netflix/web</span>
                </div>
                <div className="okie-window-sync">
                  <span className="okie-dot-live" />
                  Synced
                </div>
              </div>

              <div className="okie-window-body">
                <aside className="okie-sidebar">
                  <SidebarGroup label="WORKSPACES" count={2}>
                    <SidebarRow label="Netflix" active />
                    <SidebarRow label="Personal" />
                  </SidebarGroup>
                  <SidebarGroup label="REPOS" count={3}>
                    <SidebarRow label="All repositories" />
                    <SidebarRow label="netflix/web" active />
                    <SidebarRow label="netflix/playback-api" />
                    <SidebarRow label="netflix/tv-ui" />
                  </SidebarGroup>
                  <SidebarGroup label="INBOX" count={4}>
                    <SidebarRow label="Critical" count={1} />
                    <SidebarRow label="High" count={1} />
                    <SidebarRow label="Routine" count={2} />
                  </SidebarGroup>
                </aside>

                <main className="okie-review">
                  <div className="okie-review-back">← Queue</div>

                  <div className="okie-review-badges">
                    <span className="okie-badge-critical">Critical</span>
                    <span className="okie-mono okie-review-ref">#481 · netflix/web</span>
                  </div>

                  <div className="okie-review-head">
                    <div className="okie-review-title">Add continue-watching row to the TV home</div>
                    <span className="okie-review-start">Start review →</span>
                  </div>

                  <div className="okie-review-meta">
                    jsmith · 3h ago ·{' '}
                    <span className="okie-mono">
                      142 files · <span className="okie-add">+3,821</span> <span className="okie-del">−912</span>
                    </span>
                  </div>

                  <div className="okie-tabs">
                    <span className="is-active">Review</span>
                    <span>Map</span>
                  </div>

                  <div className="okie-review-grid">
                    <div className="okie-review-col">
                      <div className="okie-card">
                        <div className="okie-card-block">
                          <div className="okie-card-title">What changed</div>
                          <div className="okie-card-body">
                            The continue-watching row now loads from a precomputed feed instead of querying playback
                            history on render. Feed rebuilds run in a background job and failed rebuilds are retried.
                          </div>
                        </div>
                        <div className="okie-card-block okie-card-block-split">
                          <div className="okie-card-title">Why</div>
                          <div className="okie-card-note">
                            Profiles with long histories made the TV home render slow enough to miss the frame budget.
                          </div>
                        </div>
                      </div>

                      <div className="okie-card okie-card-tight">
                        <div className="okie-card-head">
                          <span className="okie-card-title">Meaningful changes</span>
                          <span className="okie-card-count">142 files reduced to 4</span>
                        </div>
                        {meaningfulChanges.map((change, index) => (
                          <div className="okie-change" key={change.label}>
                            <span className={`okie-change-dot is-${change.tone}`} />
                            <div className="okie-change-body">
                              <div className="okie-change-label">
                                {index + 1}. {change.label}
                              </div>
                              <div className="okie-change-desc">{change.description}</div>
                            </div>
                            <span className="okie-mono okie-change-files">{change.files}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="okie-review-col">
                      <div className="okie-card okie-card-small">
                        <div className="okie-card-title okie-card-title-flow">Architecture affected</div>
                        <Flow steps={architectureSteps} />
                      </div>

                      <div className="okie-card okie-card-small">
                        <div className="okie-card-title">Risk areas</div>
                        <div className="okie-chips">
                          <span>Concurrency</span>
                          <span>Error handling</span>
                          <span>Data</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>

          <p className="okie-shot-caption">
            The Review Brief for PR #481. What changed, why, which parts of the system move, and the four units worth
            your time.
          </p>
        </section>

        <section className="okie-problem">
          <div className="okie-eyebrow">THE PROBLEM</div>
          <p className="okie-problem-text">
            You open a 2,000-line PR and start at file 1. Generated noise sits next to the one behavioral change. The
            diff viewer treats them the same. <span>Time to a confident approval is the cost.</span>
          </p>
        </section>

        <section className="okie-how" id="how">
          <div className="okie-divider">
            <span className="okie-divider-title">How a review works</span>
            <span className="okie-divider-rule" />
            <span className="okie-divider-count">04</span>
          </div>

          <div className="okie-steps">
            <div className="okie-step">
              <div className="okie-mock">
                <div className="okie-mock-head">
                  INBOX<span>⌘K</span>
                </div>
                {inboxItems.map(item => (
                  <div className={`okie-inbox-row${item.tone === 'critical' ? ' is-active' : ''}`} key={item.id}>
                    <span className="okie-inbox-label">
                      <span className={`okie-inbox-dot is-${item.tone}`} />
                      <span className="okie-mono okie-inbox-id">{item.id}</span>
                      <span className="okie-truncate">{item.title}</span>
                    </span>
                    <span className="okie-inbox-meta">{item.meta}</span>
                  </div>
                ))}
              </div>
              <div className="okie-step-text">
                <div className="okie-step-title">
                  <span className="okie-step-number">1</span>Inbox
                </div>
                <p>
                  PRs waiting on you, sorted by how much human attention they need. File count, risk count, time
                  estimate.
                </p>
              </div>
            </div>

            <div className="okie-step">
              <div className="okie-mock">
                <div className="okie-tabs okie-tabs-mock">
                  <span className="is-active">Review</span>
                  <span>Map</span>
                </div>
                <div className="okie-mock-title">Architecture affected</div>
                <Flow steps={briefSteps} />
              </div>
              <div className="okie-step-text">
                <div className="okie-step-title">
                  <span className="okie-step-number">2</span>Brief
                </div>
                <p>What changed, why, which parts of the system move, and the files you can skip.</p>
              </div>
            </div>

            <div className="okie-step">
              <div className="okie-mock">
                <div className="okie-mock-head okie-mock-head-plain">
                  <span>
                    Review <strong>1</strong> / 3
                  </span>
                  <span className="okie-mock-attention">
                    <span className="okie-dot-live" />
                    Routine attention
                  </span>
                </div>
                <div className="okie-mock-title okie-mock-title-lg">
                  We add a retry policy for failed playback heartbeats.
                </div>
                <div className="okie-questions">
                  <div className="okie-questions-label">REVIEW QUESTIONS</div>
                  <div className="okie-question">
                    <span className="okie-checkbox" />
                    <span>Can a retried heartbeat move the saved position backwards?</span>
                  </div>
                </div>
                <div className="okie-file">
                  <span className="okie-truncate">
                    <span className="okie-file-dir">playback/</span>heartbeat-retry.ts
                  </span>
                  <span className="okie-file-stat">
                    <span className="okie-add">+42</span> <span className="okie-del">−6</span>
                  </span>
                </div>
                <div className="okie-mock-actions">
                  <span className="okie-action-skip">Skip</span>
                  <span className="okie-action-ghost">Needs changes</span>
                  <span className="okie-action-primary">✓ Looks good</span>
                </div>
              </div>
              <div className="okie-step-text">
                <div className="okie-step-title">
                  <span className="okie-step-number">3</span>Guided review
                </div>
                <p>
                  One unit at a time. Why it matters, the questions, the few files that touch it, then a decision.
                  Enter, C, J/K.
                </p>
              </div>
            </div>

            <div className="okie-step">
              <div className="okie-mock">
                <div className="okie-mock-label">REVIEW COMPLETE</div>
                <div className="okie-mock-title okie-mock-title-lg">Retry failed playback heartbeats</div>
                <div className="okie-mock-meta">3 review units · 4 min elapsed · 18 files, 5 inspected</div>
                <div className="okie-summary">
                  {completedUnits.map(unit => (
                    <div className="okie-summary-row" key={unit}>
                      <span className="okie-summary-label">
                        <span className="okie-tick">✓</span>
                        <span className="okie-truncate">{unit}</span>
                      </span>
                      <span className="okie-summary-verdict">Looks good</span>
                    </div>
                  ))}
                </div>
                <div className="okie-mock-actions">
                  <span className="okie-action-pill">Request changes</span>
                  <span className="okie-action-pill-primary">Approve on GitHub</span>
                </div>
              </div>
              <div className="okie-step-text">
                <div className="okie-step-title">
                  <span className="okie-step-number">4</span>Approve on GitHub
                </div>
                <p>
                  Your decisions post back as a real review, with a record of what you inspected and what you skipped.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="okie-local">
          <div className="okie-local-col">
            <div className="okie-eyebrow">LOCAL AND PRIVATE</div>
            <p>
              GitHub OAuth on your Mac. The token is encrypted locally and settings live on disk. Okie sits in the menu
              bar and polls for new review requests.
            </p>
          </div>
          <div className="okie-local-col">
            <div className="okie-eyebrow">LOCAL AGENTS, OPTIONAL</div>
            <p>
              Point Okie at Claude or Cursor CLI on your machine. The agent reads the repo and the PR and fills the
              brief. Okie is the cockpit; the agent is the research assistant.
            </p>
          </div>
        </section>

        <section className="okie-for" id="for">
          <div className="okie-eyebrow">WHO IT’S FOR</div>
          <div className="okie-for-grid">
            <div className="okie-for-card">
              <span>The staff engineer</span>
              <br />
              reviewing an AI-authored PR.
            </div>
            <div className="okie-for-card">
              <span>The tech lead</span>
              <br />
              protecting an architecture.
            </div>
            <div className="okie-for-card">
              <span>The person</span>
              <br />
              who is “the reviewer” on too many repos.
            </div>
          </div>
        </section>

        <section className="okie-download" id="download">
          <div className="okie-download-watermark" aria-hidden="true">
            Okie
          </div>
          <h2 className="okie-download-title">
            macOS. Connect GitHub. Pick repos. <em>Review.</em>
          </h2>
          <DownloadCta variant="invert" />
          <p className="okie-download-note">
            Early builds aren’t notarized yet. If macOS blocks the first launch, open System Settings → Privacy &amp;
            Security and choose “Open Anyway”.
          </p>
        </section>

        <footer className="okie-footer">
          <span className="okie-footer-brand">
            <span>Okie</span>· Better PR reviews for GitHub.
          </span>
          <div className="okie-footer-links">
            <Link href="/">
              <a className="okie-footer-link">Nicu Barbaros</a>
            </Link>
            <a
              className="okie-footer-link"
              href="https://github.com/nicubarbaros"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Okie;
