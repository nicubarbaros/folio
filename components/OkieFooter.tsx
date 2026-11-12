import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { trackOkieOutboundClick } from '../utils/okieAnalytics';

export const OKIE_GITHUB_URL = 'https://github.com/nicubarbaros';
export const OKIE_ISSUES_URL = 'https://github.com/nicubarbaros/okie-app/issues';

export function OkieExternalLink({
  href,
  location,
  className,
  children
}: {
  href: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        trackOkieOutboundClick({ location, linkUrl: event.currentTarget.href });
      }}
    >
      {children}
    </a>
  );
}

export default function OkieFooter() {
  return (
    <footer className="okie-footer" data-okie-section="footer">
      <span className="okie-footer-brand">
        <span>Okie</span>· Better PR reviews for GitHub.
      </span>
      <div className="okie-footer-links">
        <Link href="/">
          <a className="okie-footer-link">Nicu Barbaros</a>
        </Link>
        <OkieExternalLink className="okie-footer-link" href={OKIE_GITHUB_URL} location="footer">
          GitHub
        </OkieExternalLink>
        <Link href="/okie/privacy">
          <a className="okie-footer-link">Privacy</a>
        </Link>
        <Link href="/okie/terms">
          <a className="okie-footer-link">Terms</a>
        </Link>
      </div>
    </footer>
  );
}
