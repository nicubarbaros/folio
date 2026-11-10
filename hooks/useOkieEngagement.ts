import { useEffect } from 'react';
import type { RefObject } from 'react';
import {
  isOkieSection,
  newlyReachedMilestones,
  scrollPercent,
  sectionEnteredView,
  trackOkieScrollDepth,
  trackOkieSectionView
} from '../utils/okieAnalytics';

export function useOkieEngagement(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return undefined;

    const seenSections = new Set<string>();
    const seenDepth = new Set<number>();

    const report = () => {
      const doc = document.documentElement;
      const viewportHeight = window.innerHeight;
      const percent = scrollPercent(window.scrollY || doc.scrollTop || 0, viewportHeight, doc.scrollHeight);
      newlyReachedMilestones(percent, seenDepth).forEach(milestone => {
        seenDepth.add(milestone);
        trackOkieScrollDepth(milestone);
      });
      root.querySelectorAll<HTMLElement>('[data-okie-section]').forEach(node => {
        const name = node.dataset.okieSection;
        if (!name || !isOkieSection(name) || seenSections.has(name)) return;
        const rect = node.getBoundingClientRect();
        if (!sectionEnteredView(rect.top, rect.bottom, viewportHeight)) return;
        seenSections.add(name);
        trackOkieSectionView(name);
      });
    };

    report();
    window.addEventListener('scroll', report, { passive: true });
    window.addEventListener('resize', report);
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(report) : undefined;
    resizeObserver?.observe(document.documentElement);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', report);
      window.removeEventListener('resize', report);
    };
  }, [rootRef]);
}
