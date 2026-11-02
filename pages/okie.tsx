import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const HOW_DUR = 4500;
const HOW_TICK = 100;

// There is no build to hand out yet. Fill this in and both calls to action
// become real download links; until then they anchor to the download section.
const downloadUrl = '';
const ctaLabel = 'Download for Mac';

// TODO: swap the test Lemon Squeezy checkout for the live Okie license product.
const buyLicenseUrl = 'https://okie.lemonsqueezy.com/checkout/buy/a53f9af4-e179-4ae0-8ef8-a85872758f84';

type Tone = 'critical' | 'changed' | 'plain';
type HowStepId = 'inbox' | 'workflows' | 'brief' | 'guided' | 'approve';

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

const howSteps: Array<{ id: HowStepId; number: string; title: string; body: string }> = [
  {
    id: 'inbox',
    number: '1',
    title: 'Inbox',
    body: 'PRs waiting on you, sorted by how much attention they need.'
  },
  {
    id: 'workflows',
    number: '2',
    title: 'Workflows',
    body: 'New PRs land in sections. Routine ones get analyzed before you look.'
  },
  {
    id: 'brief',
    number: '3',
    title: 'Brief',
    body: 'What changed, why, and the files you can skip.'
  },
  {
    id: 'guided',
    number: '4',
    title: 'Guided review',
    body: 'One unit at a time, then a decision. Enter, C, J/K.'
  },
  {
    id: 'approve',
    number: '5',
    title: 'Approve on GitHub',
    body: 'Your decisions post back as a real review.'
  }
];

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

function BuyLicenseCta({ variant }: { variant: 'ghost' | 'on-blue' }) {
  return (
    <a
      className={`okie-cta okie-cta-${variant === 'ghost' ? 'ghost' : 'on-blue'}`}
      href={buyLicenseUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      Buy license, €39
    </a>
  );
}

function IconRepos() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7h6l2 2h10v10H3z" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5 5h14l3 7v7H2v-7z" />
    </svg>
  );
}

function IconTracked() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function IconWorkflows() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4v7.5" />
    </svg>
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

function InboxMock() {
  return (
    <div className="okie-stage-card">
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
  );
}

function WorkflowsMock() {
  return (
    <div className="okie-stage-card okie-stage-card-wf">
      <div className="okie-wf-mini-bar">
        <div className="okie-window-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="okie-wf-mini-brand">
          <span className="okie-window-mark" aria-hidden="true">
            O
          </span>
          Okie <span className="okie-window-slash">/</span> <span className="okie-mono">Default</span>
        </div>
        <div />
      </div>
      <div className="okie-wf-mini-body">
        <div className="okie-wf-pipeline-title">Automated workflows</div>
        <div className="okie-wf-pipeline-sub">How Default sorts and acts on incoming pull requests.</div>
        <div className="okie-wf-trigger">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 4l13 8-13 8z" />
          </svg>
          A pull request needs your review
        </div>
        <div className="okie-wf-node">
          <span className="okie-wf-node-icon is-inbox">
            <IconInbox />
          </span>
          <div className="okie-wf-node-body">
            <div className="okie-wf-node-title">All review requests in Default</div>
            <div className="okie-wf-node-detail">Enters the workflow</div>
          </div>
          <span className="okie-wf-count">7</span>
        </div>
        <div className="okie-wf-node">
          <span className="okie-wf-node-icon is-queue">✦</span>
          <div className="okie-wf-node-body">
            <div className="okie-wf-node-title">Queue</div>
            <div className="okie-wf-node-detail">Categorize first, then analyze</div>
          </div>
          <span className="okie-wf-count">2</span>
        </div>
        <div className="okie-wf-route">then route to the first match</div>
        <div className="okie-wf-node is-danger">
          <span className="okie-wf-node-icon is-danger">⛨</span>
          <div className="okie-wf-node-body">
            <div className="okie-wf-node-title">
              Critical<span className="okie-wf-wait">Wait</span>
            </div>
            <div className="okie-wf-node-detail">Touches billing, auth or data deletion</div>
          </div>
          <span className="okie-wf-count">3</span>
        </div>
      </div>
    </div>
  );
}

function BriefMock() {
  return (
    <div className="okie-stage-card">
      <div className="okie-tabs okie-tabs-mock">
        <span className="is-active">Review</span>
        <span>Map</span>
      </div>
      <div className="okie-mock-title">Architecture affected</div>
      <Flow steps={briefSteps} />
    </div>
  );
}

function GuidedMock() {
  return (
    <div className="okie-stage-card">
      <div className="okie-mock-head okie-mock-head-plain">
        <span>
          Review <strong>1</strong> / 3
        </span>
        <span className="okie-mock-attention">
          <span className="okie-dot-live" />
          Routine attention
        </span>
      </div>
      <div className="okie-mock-title okie-mock-title-lg">We add a retry policy for failed playback heartbeats.</div>
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
  );
}

function ApproveMock() {
  return (
    <div className="okie-stage-card">
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
  );
}

function HowMock({ step }: { step: HowStepId }) {
  switch (step) {
    case 'inbox':
      return <InboxMock />;
    case 'workflows':
      return <WorkflowsMock />;
    case 'brief':
      return <BriefMock />;
    case 'guided':
      return <GuidedMock />;
    case 'approve':
      return <ApproveMock />;
    default: {
      const _exhaustive: never = step;
      return _exhaustive;
    }
  }
}

// Renders children at a fixed desktop design width, then scales them down to the
// container so mobile shows a crisp miniature instead of a reflowed/squished layout.
// When the container is at least `fluidAbove` (defaults to designWidth), children
// layout fluidly at 100% width with no transform — used by the How stage so
// desktop stays 1:1 while mobile still miniaturizes.
function ScaleFrame({
  designWidth,
  fluidAbove,
  className,
  children
}: {
  designWidth: number;
  fluidAbove?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<{ scale: number; height: number; fluid: boolean } | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return undefined;

    const threshold = fluidAbove ?? designWidth;

    const measure = () => {
      const width = outer.clientWidth;
      const fluid = width >= threshold;
      const scale = fluid || width <= 0 ? 1 : width / designWidth;
      const height = fluid ? 0 : inner.offsetHeight * scale;
      setMetrics(prev =>
        prev && prev.scale === scale && prev.fluid === fluid && Math.abs(prev.height - height) < 0.5
          ? prev
          : { scale, height, fluid }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth, fluidAbove]);

  const ready = metrics !== null;
  const fluid = metrics?.fluid ?? true;

  return (
    <div
      ref={outerRef}
      className={[className, fluid ? 'is-fluid-frame' : 'is-scaled-frame'].filter(Boolean).join(' ')}
      style={{
        ...(!fluid && metrics && metrics.height > 0 ? { height: metrics.height } : null),
        visibility: ready ? 'visible' : 'hidden'
      }}
    >
      <div
        ref={innerRef}
        className={`okie-scale-inner${fluid ? ' is-fluid' : ''}`}
        style={
          fluid
            ? { width: '100%' }
            : {
                width: designWidth,
                transform: `scale(${metrics?.scale ?? 1})`,
                transformOrigin: 'top left'
              }
        }
      >
        {children}
      </div>
    </div>
  );
}

const SHOT_DESIGN_WIDTH = 1040;
const HOW_STAGE_DESIGN_WIDTH = 464;

const Okie: NextPage = () => {
  // Mirror the design canvas: { step: 1, paused: false, cycle: 0 }, DUR = 4500.
  const [how, setHow] = useState({ step: 1, paused: false, cycle: 0 });
  const leftRef = useRef(HOW_DUR);
  const howRef = useRef(how);
  const reduceMotionRef = useRef(false);
  howRef.current = how;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reduceMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener?.('change', sync);
    mq.addListener?.(sync);
    return () => {
      mq.removeEventListener?.('change', sync);
      mq.removeListener?.(sync);
    };
  }, []);

  useEffect(() => {
    leftRef.current = HOW_DUR;
    const iv = window.setInterval(() => {
      if (reduceMotionRef.current || howRef.current.paused) return;
      leftRef.current -= HOW_TICK;
      if (leftRef.current > 0) return;
      leftRef.current = HOW_DUR;
      setHow(s => ({ step: (s.step % 5) + 1, paused: false, cycle: s.cycle + 1 }));
    }, HOW_TICK);
    return () => window.clearInterval(iv);
  }, []);

  const hoverStep = useCallback((n: number) => {
    setHow(s => {
      if (s.step === n && s.paused) return s;
      return { step: n, paused: true, cycle: s.cycle };
    });
  }, []);

  const pickStep = useCallback((n: number) => {
    leftRef.current = HOW_DUR;
    setHow(s => ({ step: n, paused: false, cycle: s.cycle + 1 }));
  }, []);

  const resumeHow = useCallback(() => {
    setHow(s => {
      if (!s.paused) return s;
      leftRef.current = HOW_DUR;
      return { step: s.step, paused: false, cycle: s.cycle + 1 };
    });
  }, []);

  return (
    <div className="okie">
      <Head>
        <title>Okie — Better PR reviews for GitHub</title>
        <meta
          name="description"
          content="Okie is a Mac app for reviewing GitHub pull requests. It reads the PR before you do, writes the brief, groups 142 files into 4 review units, and walks you through them. You approve on GitHub."
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
            <BuyLicenseCta variant="ghost" />
            <span className="okie-actions-note">7-day free trial. One-time license.</span>
          </div>
        </header>

        <section className="okie-shot">
          <ScaleFrame designWidth={SHOT_DESIGN_WIDTH} className="okie-shot-scale">
            <div className="okie-shot-frame">
              <div className="okie-shot-watermark" aria-hidden="true">
                Okie
              </div>

              <div className="okie-window">
                <div className="okie-window-bar okie-window-bar-simple">
                  <div className="okie-window-lights" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="okie-window-title">
                    Okie <span className="okie-window-slash">/</span>{' '}
                    <span className="okie-mono okie-window-repo">netflix/web</span>
                  </div>
                  <div className="okie-window-sync">
                    <span className="okie-dot-live" />
                    Synced
                  </div>
                </div>

                <div className="okie-window-body okie-window-body-shot">
                  <aside className="okie-sidebar">
                    <div className="okie-workspace-switch">
                      <span className="okie-workspace-name">Default</span>
                      <span className="okie-workspace-caret" aria-hidden="true">
                        ⌄
                      </span>
                    </div>

                    <div className="okie-sidebar-label">
                      <span className="okie-sidebar-label-text">
                        <IconRepos />
                        REPOS
                      </span>
                    </div>
                    <div className="okie-sidebar-row is-active">All repositories</div>
                    <div className="okie-sidebar-row">netflix/web</div>
                    <div className="okie-sidebar-row okie-sidebar-row-spaced">netflix/tv-ui</div>

                    <div className="okie-sidebar-nav is-active">
                      <span className="okie-sidebar-nav-label">
                        <IconInbox />
                        INBOX
                      </span>
                      <span className="okie-mono okie-sidebar-count">3</span>
                    </div>
                    <div className="okie-sidebar-nav">
                      <span className="okie-sidebar-nav-label">
                        <IconTracked />
                        TRACKED
                      </span>
                      <span className="okie-mono okie-sidebar-count">0</span>
                    </div>
                    <div className="okie-sidebar-nav">
                      <span className="okie-sidebar-nav-label">
                        <IconWorkflows />
                        WORKFLOWS
                      </span>
                      <span className="okie-sidebar-action">Add</span>
                    </div>

                    <div className="okie-trial-badge">Trial, 7 days left</div>
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
          </ScaleFrame>

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
            <span className="okie-divider-count">05</span>
          </div>

          <div className="okie-how-layout">
            <ol className="okie-how-steps" onMouseLeave={resumeHow}>
              {howSteps.map((step, index) => {
                const n = index + 1;
                const on = how.step === n;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      className={`okie-how-step${on ? ' is-active' : ''}`}
                      onClick={() => pickStep(n)}
                      onMouseEnter={() => hoverStep(n)}
                      aria-pressed={on}
                    >
                      {on && (
                        <span
                          key={`b${how.step}-${how.cycle}${how.paused ? 'p' : ''}`}
                          className={`okie-how-progress${how.paused ? ' is-paused' : ''}`}
                          aria-hidden="true"
                        />
                      )}
                      <span className="okie-how-step-number">{step.number}</span>
                      <span className="okie-how-step-copy">
                        <span className="okie-how-step-title">{step.title}</span>
                        <span className="okie-how-step-body">{step.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="okie-how-stage" aria-live="polite">
              <ScaleFrame
                designWidth={HOW_STAGE_DESIGN_WIDTH}
                fluidAbove={360}
                className="okie-how-stage-scale"
              >
                <div className="okie-how-stage-stack">
                  {howSteps.map((step, index) => {
                    const on = how.step === index + 1;
                    return (
                      <div
                        key={step.id}
                        className={`okie-how-stage-pane${on ? ' is-active' : ''}`}
                        aria-hidden={!on}
                      >
                        <HowMock step={step.id} />
                      </div>
                    );
                  })}
                </div>
              </ScaleFrame>
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
          <div className="okie-download-actions">
            <DownloadCta variant="invert" />
            <BuyLicenseCta variant="on-blue" />
            <span className="okie-download-note">7-day free trial. One-time license.</span>
          </div>
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
