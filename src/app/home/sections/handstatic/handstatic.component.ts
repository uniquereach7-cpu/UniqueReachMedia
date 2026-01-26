// handstatic.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tile = { title: string; subtitle: string; img: string };
type WorkSet = { lt: Tile; lb: Tile; rt: Tile; rb: Tile };

const buildSets = (tiles: Tile[]): WorkSet[] => {
  const sets: WorkSet[] = [];
  for (let i = 0; i + 3 < tiles.length; i += 4) {
    sets.push({ lt: tiles[i], lb: tiles[i + 1], rt: tiles[i + 2], rb: tiles[i + 3] });
  }
  return sets;
};

@Component({
  selector: "app-hand-static",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./handstatic.html",
  styleUrls: ["./handstatic.css"],
})
export class handstatic implements AfterViewInit, OnDestroy {
  @ViewChild("root", { static: true }) root!: ElementRef<HTMLElement>;
  private ctx?: gsap.Context;

  sets: WorkSet[] = buildSets([
    { title: "GroundZero", subtitle: "Tutoring", img: "assets/img1.png" },
    { title: "Einstein", subtitle: "Child Therapy", img: "assets/img2.png" },
    { title: "Vaikuntapuram", subtitle: "Catering", img: "assets/img3.png" },
    { title: "Banyan Springs", subtitle: "Villas", img: "assets/img4.png" },
    { title: "App Suite", subtitle: "Mobile UI", img: "assets/phone-01.webp" },
    { title: "UX Lab", subtitle: "Product Design", img: "assets/phone-02.webp" },
    { title: "Growth Sprint", subtitle: "Performance", img: "assets/phoneslant1.png" },
    { title: "Launch Deck", subtitle: "Social", img: "assets/phoneslant2.png" },
    { title: "Scroll Story", subtitle: "Web Experience", img: "assets/phonescrool.png" },
    { title: "Prototype", subtitle: "Showcase", img: "assets/prototype.png" },
    { title: "Brand Home", subtitle: "Website", img: "assets/brandhome.png" },
    { title: "Studio Mood", subtitle: "Marketing", img: "assets/backgroundimage.png" },
    { title: "Idea Board", subtitle: "Concept", img: "assets/bacimg2.png" },
    { title: "Hand Craft", subtitle: "Visual", img: "assets/bghand.png" },
    { title: "Campaign", subtitle: "Backdrop", img: "assets/backimg.jpg" },
    { title: "Brand Book", subtitle: "Identity", img: "assets/brand.jpeg" },
  ]);

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const rootEl = this.root.nativeElement;
      const q = gsap.utils.selector(rootEl);

      const slots = ["lt", "lb", "rt", "rb"] as const;
      const n = this.sets.length;
      if (!n) return;

      const snapTo = n > 1 ? 1 / (n - 1) : 1;

      const layer = (slot: (typeof slots)[number], i: number) =>
        q(`.layer[data-slot="${slot}"][data-set="${i}"]`)[0] as HTMLElement;

      gsap.set(q(".layer"), { autoAlpha: 0, y: 48, scale: 0.985 });

      for (let i = 0; i < n; i++) {
        for (const s of slots) gsap.set(layer(s, i), { zIndex: i });
      }
      for (const s of slots) gsap.set(layer(s, 0), { autoAlpha: 1, y: 0, scale: 1 });

      gsap.set(q(".world-left"), { x: -140 });
      gsap.set(q(".world-right"), { x: 140 });
      gsap.set(q(".void"), { scaleX: 0.88, transformOrigin: "50% 50%" });

      // IMPORTANT: snap is either an object OR undefined (not false)
      const snapOpt =
        n > 1
          ? { snapTo, duration: { min: 0.08, max: 0.2 }, ease: "power2.out" }
          : undefined;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: `+=${n * 140}%`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          snap: snapOpt,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q(".world-left"), { x: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(q(".world-right"), { x: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(q(".void"), { scaleX: 1, duration: 0.8, ease: "power3.out" }, 0);

      if (n > 1) {
        tl.to(q(".left-stack"), { y: -44 * (n - 1), ease: "none" }, 0);
        tl.to(q(".right-stack"), { y: 44 * (n - 1), ease: "none" }, 0);
      }

      for (let i = 0; i < n - 1; i++) {
        const outLeft = [layer("lt", i), layer("lb", i)];
        const outRight = [layer("rt", i), layer("rb", i)];
        const inLeft = [layer("lt", i + 1), layer("lb", i + 1)];
        const inRight = [layer("rt", i + 1), layer("rb", i + 1)];

        tl.to({}, { duration: 0.35 });

        tl.to(outLeft, { autoAlpha: 0, y: -78, scale: 0.985, duration: 0.42, ease: "power2.inOut" }, ">")
          .to(outRight, { autoAlpha: 0, y: 78, scale: 0.985, duration: 0.42, ease: "power2.inOut" }, "<")
          .fromTo(inLeft, { autoAlpha: 0, y: 78, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }, "<0.14")
          .fromTo(inRight, { autoAlpha: 0, y: -78, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }, "<");
      }

      tl.to({}, { duration: 0.45 });
    }, this.root.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
