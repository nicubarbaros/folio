import { useEffect } from 'react';
import { animate, stagger, spring } from 'motion';

const soft = { easing: spring({ stiffness: 220, damping: 24 }) };
const snap = { easing: spring({ stiffness: 320, damping: 26 }) };
const ease = [0.2, 0.8, 0.2, 1] as const;

const cardRest = { y: '60%', rotate: -8, opacity: 0 };
const cardShown = { y: '-50%', rotate: -2.5, opacity: 1 };

type Tile = {
  element: HTMLElement;
  show: () => void;
  hide: () => void;
};

/**
 * Wires the project tiles: at rest a tile shows its wordmark, on hover the
 * letters lift out and the preview card springs up from below.
 */
export function useAnimatedTiles() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-tile]'));

    // The stylesheet already parks the card in its reduced-motion rest state.
    if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiles: Tile[] = [];

    elements.forEach(element => {
      const card = element.querySelector<HTMLElement>('.home-mock');
      const word = element.querySelector<HTMLElement>('.home-tile-word');
      if (!card || !word) return;

      const letters = Array.from(word.children) as HTMLElement[];
      animate(card, cardRest, { duration: 0 });

      tiles.push({
        element,
        show() {
          animate(
            letters,
            { y: [0, -60], opacity: [1, 0], rotate: [0, -6] },
            { duration: 0.45, delay: stagger(0.03), easing: ease }
          );
          animate(card, cardShown, { ...soft, delay: 0.08 });
        },
        hide() {
          animate(card, cardRest, { duration: 0.4, easing: [0.4, 0, 0.2, 1] });
          animate(
            letters,
            { y: [-40, 0], opacity: [0, 1], rotate: 0 },
            { duration: 0.5, delay: stagger(0.03, { from: 'last' }), ...snap }
          );
        }
      });
    });

    const canHover = window.matchMedia('(hover: hover)').matches;
    const teardowns: Array<() => void> = [];
    let revealed: Tile | null = null;

    tiles.forEach(tile => {
      // A tap fires pointerenter and pointerleave inside the same touch, so
      // touch drives the reveal from the click instead: the first tap opens the
      // card, the second one follows the link.
      if (!canHover) {
        const handleClick = (event: MouseEvent) => {
          if (revealed === tile) return;
          event.preventDefault();
          revealed?.hide();
          revealed = tile;
          tile.show();
        };

        tile.element.addEventListener('click', handleClick);
        teardowns.push(() => tile.element.removeEventListener('click', handleClick));
        return;
      }

      const handlePointerEnter = () => tile.show();
      const handlePointerLeave = () => tile.hide();

      tile.element.addEventListener('pointerenter', handlePointerEnter);
      tile.element.addEventListener('pointerleave', handlePointerLeave);
      teardowns.push(() => {
        tile.element.removeEventListener('pointerenter', handlePointerEnter);
        tile.element.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    return () => teardowns.forEach(teardown => teardown());
  }, []);
}
