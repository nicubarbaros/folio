import Head from 'next/head';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useOkieEngagement } from '../hooks/useOkieEngagement';
import OkieFooter from './OkieFooter';

type OkieLegalPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function OkieLegalPage({ title, description, children }: OkieLegalPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  useOkieEngagement(pageRef);

  return (
    <div className="okie okie-legal" ref={pageRef}>
      <Head>
        <title>{`${title} - Okie`}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="okie-inner">
        <header className="okie-legal-head">
          <Link href="/okie">
            <a className="okie-brand" aria-label="Okie">
              <span className="okie-brand-mark" aria-hidden="true">
                O
              </span>
              <span className="okie-brand-name">Okie</span>
            </a>
          </Link>
          <h1 className="okie-legal-title">{title}</h1>
          <p className="okie-legal-updated">Last updated: November 11, 2026</p>
        </header>

        <article className="okie-legal-body">{children}</article>

        <OkieFooter />
      </div>
    </div>
  );
}
