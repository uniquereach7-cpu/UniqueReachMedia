import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = { title: string; subtitle: string; img: string };

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

  leftWord = "SELECTED";
  rightWord = "WORK";

  cards: Card[] = [
    { title: "GroundZero", subtitle: "Tutoring", img: "assets/img1.png" },
    { title: "Einstein", subtitle: "Child Therapy", img: "assets/img2.png" },
    { title: "Vaikuntapuram", subtitle: "Catering", img: "assets/img3.png" },
    { title: "Banyan Springs", subtitle: "Villas", img: "assets/img4.png" },
  ];

  get leftChars() { return this.leftWord.split(""); }
  get rightChars() { return this.rightWord.split(""); }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: "power3.out" },
      });

      // initial states
      gsap.set(".letter-inner", { y: 420 });
      gsap.set(".line p", { y: 44 });

      gsap.set(".frame", { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
      gsap.set(".screen img", { scale: 1.06 });

      // title rises into title-lane
      gsap.set(".title", { yPercent: 120 });

      tl.to(".letter-inner", { y: 0, stagger: 0.06 })
        .to(".title-left", { left: "12vw" }, 0.55)
        .to(".title-right", { right: "8vw" }, 0.55)
        .to(".title-left", { left: 0, scale: 1 }, 0.95)
        .to(".title-right", { right: 0, scale: 1 }, 0.95)
        .to(
          ".frame",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            stagger: 0.10,
          },
          0.95
        )
        .to(".screen img", { scale: 1, stagger: 0.10 }, 0.95)
        .to(".title", { yPercent: 0 }, 1.05)
        .to(".line p", { y: 0, stagger: 0.04 }, 1.05);

      ScrollTrigger.create({
        trigger: this.root.nativeElement,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });

      // magnetic hover (must be inside here)
      const frames = gsap.utils.toArray<HTMLElement>(".frame");
      frames.forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;

          gsap.to(el, {
            rotateY: dx * 8,
            rotateX: -dy * 8,
            scale: 1.02,
            duration: 0.25,
            ease: "power2.out",
            transformPerspective: 900,
            transformOrigin: "50% 50%",
          });
        };

        const leave = () => {
          gsap.to(el, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);

        // cleanup on destroy
        this.ctx!.add(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });
    }, this.root.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
