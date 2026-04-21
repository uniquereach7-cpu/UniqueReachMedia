// handstatic.component.ts
import { Component, AfterViewInit, OnDestroy, viewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_COUNT = 9;
const MAX_SLOT   = Math.floor(CARD_COUNT / 2); // 4  →  slots: -4 … +4

// ─── Slot visual config ───────────────────────────────────────────────────────

interface SlotStyle {
  x:         number;
  rotation:  number;
  scale:     number;
  opacity:   number;
  zIndex:    number;
  filter:    string;
}

/**
 * Returns the GSAP-animatable properties for a card at the given slot position.
 * slot = 0  → center hero card
 * slot > 0  → right side  (positive rotation = clockwise tilt)
 * slot < 0  → left side   (negative rotation = counterclockwise tilt)
 */
function slotStyle(slot: number): SlotStyle {
  const abs  = Math.abs(slot);
  const sign = Math.sign(slot);

  //                 abs: 0      1      2      3      4
  const X_PX      = [0,   160,   282,   374,   448];
  const ROT_DEG   = [0,    12,    20,    27,    33];
  const SCALE_VAL = [1.00, 0.88,  0.76,  0.64,  0.52];
  const OPACITY   = [1.00, 0.73,  0.50,  0.30,  0.14];
  const GRAYSCALE = [0,    0.60,  0.85,  0.95,  1.00];
  const Z_INDEX   = [10,   8,     6,     4,     2];

  return {
    x:        sign * X_PX[abs],
    rotation: sign * ROT_DEG[abs],
    scale:    SCALE_VAL[abs],
    opacity:  OPACITY[abs],
    zIndex:   Z_INDEX[abs],
    filter:   `grayscale(${GRAYSCALE[abs]})`,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector:    'app-hand-static',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './handstatic.html',
  styleUrls:   ['./handstatic.css'],
})
export class handstatic implements AfterViewInit, OnDestroy {

  /** Template data — one entry per card DOM element */
  readonly cards = Array.from({ length: CARD_COUNT }, (_, i) => ({ id: i }));

  /** Signal query: all #cardEl references in order */
  readonly cardEls = viewChildren<ElementRef<HTMLElement>>('cardEl');

  /** slots[cardIndex] = current slot position of that card (-MAX_SLOT … +MAX_SLOT) */
  private slots: number[] = [];

  private timer: ReturnType<typeof setTimeout> | null = null;
  private alive = true;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    // Initialise slots: card 0 → slot -4, card 4 → slot 0 (center), card 8 → slot +4
    this.slots = this.cards.map((_, i) => i - MAX_SLOT);
    this.applyAll(true);
    this.scheduleNext();
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.timer) clearTimeout(this.timer);
    const els = this.cardEls().map(r => r.nativeElement);
    gsap.killTweensOf(els);
  }

  // ── Animation ─────────────────────────────────────────────────────────────

  /** Apply slot styles to all cards — instant (set) or animated (to). */
  private applyAll(instant = false): void {
    this.cardEls().forEach((ref, i) => {
      const s = slotStyle(this.slots[i]);
      const props = {
        transformOrigin: '50% 100%', // pivot at card's bottom-center
        x:        s.x,
        rotation: s.rotation,
        scale:    s.scale,
        opacity:  s.opacity,
        zIndex:   s.zIndex,
        filter:   s.filter,
      };
      if (instant) {
        gsap.set(ref.nativeElement, props);
      } else {
        gsap.to(ref.nativeElement, { ...props, duration: 0.32, ease: 'power2.inOut', overwrite: 'auto' });
      }
    });
  }

  private scheduleNext(): void {
    if (!this.alive) return;
    this.timer = setTimeout(() => this.advance(), 2000);
  }

  /**
   * Advance the carousel one step:
   *   • All slots shift by –1  (cards logically move left)
   *   • A card that would reach slot –(MAX_SLOT+1) wraps to +MAX_SLOT
   *   • The incoming card (new center) gets an instant z-index boost so it
   *     layers above the outgoing card during the 320 ms crossover.
   */
  private advance(): void {
    if (!this.alive) return;

    const newSlots = this.slots.map(s =>
      s - 1 < -MAX_SLOT ? MAX_SLOT : s - 1
    );

    const els = this.cardEls();

    els.forEach((ref, i) => {
      const prevSlot = this.slots[i];
      const nextSlot = newSlots[i];
      const s        = slotStyle(nextSlot);

      const isIncoming = nextSlot === 0;   // this card is becoming the hero
      const isOutgoing = prevSlot === 0;   // this card is leaving the hero spot

      // Incoming card must render above the outgoing card during the swap.
      if (isIncoming) {
        gsap.set(ref.nativeElement, { zIndex: 11 });
      }

      gsap.to(ref.nativeElement, {
        x:        s.x,
        rotation: s.rotation,
        scale:    s.scale,
        opacity:  s.opacity,
        filter:   s.filter,
        duration: 0.65,
        ease: isIncoming
          ? 'power3.out'    // pop-forward feel for new hero
          : isOutgoing
          ? 'power2.in'     // ease-in as it recedes into the stack
          : 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          // Settle to the canonical z-index once motion is done
          gsap.set(ref.nativeElement, { zIndex: s.zIndex });
        },
      });
    });

    this.slots = newSlots;
    this.scheduleNext();
  }
}
