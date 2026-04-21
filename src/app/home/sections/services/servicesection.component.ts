import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  title: string;
  image: string;
  alt: string;
  href: string;
  tags: string[];
  angle: string;
  tilt: string;
}

@Component({
  selector: "app-services-snapshot",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./servicesection.html",
  styleUrls: ["./servicesection.css"],
})
export class ServicesSnapshotComponent implements AfterViewInit, OnDestroy {
  @ViewChild("servicesStory", { static: true })
  servicesStory!: ElementRef<HTMLElement>;

  private mm?: gsap.MatchMedia;

  services: ServiceItem[] = [
    {
      title: "SOCIAL MEDIA\nMARKETING",
      image:
        "https://images.unsplash.com/photo-1622549037543-49cf1ca0babc?q=80&w=2940&auto=format&fit=crop",
      alt: "Social media marketing",
      href: "/social-media-marketing",
      tags: ["Instagram Ads", "Content Calendar", "Community", "Influencers"],
      angle: "-52deg",
      tilt: "-18deg",
    },
    {
      title: "PERFORMANCE\nMARKETING",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1200&fit=crop",
      alt: "Performance marketing",
      href: "/performance-marketing",
      tags: ["Google Ads", "Facebook Ads", "Analytics", "CRO"],
      angle: "0deg",
      tilt: "0deg",
    },
    {
      title: "BRANDING\n& IDENTITY",
      image:
        "https://plus.unsplash.com/premium_photo-1661328251929-c530c82c59a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Branding and identity",
      href: "/branding",
      tags: ["Brand Strategy", "Logo", "Visual System", "Guidelines"],
      angle: "52deg",
      tilt: "18deg",
    },
    {
      title: "SEO\nOPTIMIZATION",
      image:
        "https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=2070&auto=format&fit=crop",
      alt: "SEO optimization",
      href: "/seo-optimization",
      tags: ["Technical SEO", "Content Strategy", "Local SEO", "Analytics"],
      angle: "122deg",
      tilt: "18deg",
    },
    {
      title: "WEB\nDEVELOPMENT",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=1200&fit=crop",
      alt: "Web development code",
      href: "/web-development",
      tags: ["ReactJS", "VueJS", "NodeJS", "Webflow"],
      angle: "180deg",
      tilt: "0deg",
    },
    {
      title: "VIDEO\nPRODUCTION",
      image: "assets/videoprod.jpg",
      alt: "Video production",
      href: "/video-production",
      tags: ["Reels", "Editing", "Motion", "YouTube"],
      angle: "-122deg",
      tilt: "-18deg",
    },
  ];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.mm = gsap.matchMedia();

    this.mm.add("(min-width: 992px)", () => {
      const root = this.servicesStory.nativeElement;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2400",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".services-core",
        {
          scale: 0.86,
          autoAlpha: 0.65,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
        },
        0
      );

      tl.fromTo(
        ".orbit-track",
        {
          rotation: -34,
        },
        {
          rotation: 28,
          duration: 1,
        },
        0
      );

      tl.fromTo(
        ".orbit-item",
        {
          autoAlpha: 0,
          scale: 0.76,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.03,
        },
        0
      );

      tl.to(
        ".service-img",
        {
          scale: 1.16,
          duration: 1,
        },
        0
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}