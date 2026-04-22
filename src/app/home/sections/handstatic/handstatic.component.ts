// handstatic.component.ts
import { Component, AfterViewInit, OnDestroy, viewChildren, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_COUNT = 9;
const MAX_SLOT   = Math.floor(CARD_COUNT / 2); // 4  →  slots: -4 … +4

// ─── Slot visual config ───────────────────────────────────────────────────────

interface SlotStyle {
  x:        number;
  rotation: number;
  scale:    number;
  opacity:  number;
  zIndex:   number;
  filter:   string;
}

function slotStyle(slot: number): SlotStyle {
  const abs  = Math.abs(slot);
  const sign = Math.sign(slot);

  //                 abs: 0      1      2      3      4
  const X_PX      = [0,   230,   405,   538,   645];
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

  /**
   * ─── ADD / REMOVE SCREENS HERE ───────────────────────────────────────────
   * The carousel loops through these in order, repeating from the first after
   * the last. Add or remove entries freely — no other changes needed.
   */
  private static readonly SCREENS = [
    'assets/screens/screen1.webp',
    'assets/screens/screen2.webp',
    'assets/screens/screen3.webp',
    'assets/screens/screen4.webp',
    'assets/screens/screen5.webp',
  ];

  // ── Card state ────────────────────────────────────────────────────────────

  /** Each card's image is a signal so the template reacts when it is reassigned. */
  readonly cards = Array.from({ length: CARD_COUNT }, (_, i) => ({
    id: i,
    image: signal(handstatic.SCREENS[i % handstatic.SCREENS.length]),
  }));

  readonly cardEls = viewChildren<ElementRef<HTMLElement>>('cardEl');

  /** slots[cardIndex] = current slot position (-MAX_SLOT … +MAX_SLOT) */
  private slots: number[] = [];

  /**
   * Tracks the next sequential image index to assign when a card wraps from
   * far-left back to far-right. Starts after the initial CARD_COUNT images.
   */
  private imagePointer = CARD_COUNT;

  private timer: ReturnType<typeof setTimeout> | null = null;
  private alive = true;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.slots = this.cards.map((_, i) => i - MAX_SLOT);
    this.applyAll(true);
    this.scheduleNext();
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.timer) clearTimeout(this.timer);
    gsap.killTweensOf(this.cardEls().map(r => r.nativeElement));
  }

  // ── Animation ─────────────────────────────────────────────────────────────

  private applyAll(instant = false): void {
    this.cardEls().forEach((ref, i) => {
      const s = slotStyle(this.slots[i]);
      const props = {
        transformOrigin: '50% 100%',
        x: s.x, rotation: s.rotation, scale: s.scale,
        opacity: s.opacity, zIndex: s.zIndex, filter: s.filter,
      };
      if (instant) gsap.set(ref.nativeElement, props);
      else gsap.to(ref.nativeElement, { ...props, duration: 0.65, ease: 'power2.inOut', overwrite: 'auto' });
    });
  }

  private scheduleNext(): void {
    if (!this.alive) return;
    this.timer = setTimeout(() => this.advance(), 2000);
  }

  private advance(): void {
    if (!this.alive) return;

    const newSlots = this.slots.map(s =>
      s - 1 < -MAX_SLOT ? MAX_SLOT : s - 1
    );

    const els = this.cardEls();

    els.forEach((ref, i) => {
      const prevSlot   = this.slots[i];
      const nextSlot   = newSlots[i];
      const isWrapping = prevSlot === -MAX_SLOT && nextSlot === MAX_SLOT;
      const isIncoming = nextSlot === 0;
      const isOutgoing = prevSlot === 0;

      if (isWrapping) {
        // ── Recycled card ─────────────────────────────────────────────────
        // Update image to the next one in the sequence (loops back to 0).
        const nextImg = handstatic.SCREENS[this.imagePointer % handstatic.SCREENS.length];
        this.cards[i].image.set(nextImg);
        this.imagePointer++;

        // Instantly teleport to far-right — both edges share opacity 0.14
        // so the jump is invisible to the viewer.
        const s = slotStyle(MAX_SLOT);
        gsap.set(ref.nativeElement, {
          x: s.x, rotation: s.rotation, scale: s.scale,
          opacity: s.opacity, zIndex: s.zIndex, filter: s.filter,
        });
        return; // no tween needed
      }

      // ── Normal cards ───────────────────────────────────────────────────
      const s = slotStyle(nextSlot);

      if (isIncoming) gsap.set(ref.nativeElement, { zIndex: 11 });

      gsap.to(ref.nativeElement, {
        x: s.x, rotation: s.rotation, scale: s.scale,
        opacity: s.opacity, filter: s.filter,
        duration: 0.65,
        ease: isIncoming ? 'power3.out' : isOutgoing ? 'power2.in' : 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => { gsap.set(ref.nativeElement, { zIndex: s.zIndex }); },
      });
    });

    this.slots = newSlots;
    this.scheduleNext();
  }
}
