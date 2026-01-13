import { Component, ElementRef, HostListener, NgZone, OnDestroy, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-cursor-dot",
  templateUrl: "./cursor-dot.component.html",
  styleUrls: ["./cursor-dot.component.css"],
  standalone: true,
})
export class CursorDotComponent implements AfterViewInit, OnDestroy {
  private rafId: number | null = null;

  private targetX = -100;
  private targetY = -100;

  private currentX = -100;
  private currentY = -100;

  isHover = false;
  isDown = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const dot = this.dotEl();

    this.zone.runOutsideAngular(() => {
      const tick = () => {
        // smoothing
        this.currentX += (this.targetX - this.currentX) * 0.18;
        this.currentY += (this.targetY - this.currentY) * 0.18;

        dot.style.transform = `translate3d(${this.currentX - 5}px, ${this.currentY - 5}px, 0)`;
        dot.style.setProperty("--x", `${this.currentX - 5}px`);
        dot.style.setProperty("--y", `${this.currentY - 5}px`);

        this.rafId = requestAnimationFrame(tick);
      };

      this.rafId = requestAnimationFrame(tick);
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private dotEl(): HTMLDivElement {
    return this.el.nativeElement.querySelector(".cursor-dot") as HTMLDivElement;
  }

  @HostListener("document:mousemove", ["$event"])
  onMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  @HostListener("document:mousedown")
  onDown(): void {
    this.isDown = true;
  }

  @HostListener("document:mouseup")
  onUp(): void {
    this.isDown = false;
  }

  @HostListener("document:mouseover", ["$event"])
  onOver(e: MouseEvent): void {
    const t = e.target as HTMLElement | null;
    const interactive = t?.closest("a,button,[role='button'],input,textarea,select,label");
    this.isHover = !!interactive;
  }
}
