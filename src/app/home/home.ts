import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesSnapshotComponent } from './sections/services/servicesection.component';
import { CreativeProcessComponent } from './sections/process/creative-process.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ServicesSnapshotComponent, CreativeProcessComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper', { static: false }) wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('bgVideo', { static: false }) bgVideoRef?: ElementRef<HTMLVideoElement>;

  mobileMenuOpen = false;

  // Testimonials (existing)
  testimonials = [
    {
      quote:
        '“Unique Reach Media played a crucial role in helping us connect with parents in a meaningful way. Their approach allowed us to clearly showcase the value of personalized learning, highlighting how it truly makes a difference in every child’s growth. With their support, we were able to build stronger trust with parents and effectively communicate our vision.”',
      author: 'Queenie Das',
      position: 'Principal, Gateway Academy',
      image: 'assets/Gateway.png'
    },
    {
      quote:
        '“They have a deep understanding of both marketing and design, which makes every post feel authentic to our brand. The consistency, creativity, and attention to detail in their work truly reflect who we are, helping us engage with our audience effortlessly.”',
      author: 'Prathyusha',
      position: 'Founder, Pranalika',
      image: 'assets/Pranalika.png'
    },
    {
      quote:
        '“Thanks to their creative expertise, our visuals now look polished and premium. We’ve seen a noticeable increase in online engagement, and that impact has translated into more walk-ins at our store. Their work has truly elevated the way people experience our brand.”',
      author: 'Sowjanya K',
      position: 'Founder, Wash & Go',
      image: 'assets/Wash & Go Logo (2).png'
    },
    {
      quote:
        '“They shaped our message with such care and clarity that it truly reflects what we stand for. As a result, families are now able to find us more easily, connect with our values, and understand the difference we bring. Their thoughtful approach has made our communication both simple and impactful.”',
      author: 'Tina',
      position: 'Principal, Einstein Child Therapy Centre',
      image: 'assets/Einstein.png'
    },
    {
      quote:
        '“They gave our vibe a powerful voice and transformed the way our brand shows up online. Every post now carries the same energy, strength, and boldness that define our workouts. Our social feed doesn’t just look alive—it inspires action, motivates our community, and reflects the spirit of our fitness journey.”',
      author: 'Rehman',
      position: 'Founder, Fitness & More',
      image: 'assets/Fitness & More.png'
    }
  ];

  repeatedTestimonials = [...this.testimonials, ...this.testimonials];
  currentIndex = 0;
  intervalId: any = null;

  // === New: Achievements & Process data & state ===
  stats = [
  {
    key: 'projects',
    target: 300,
    suffix: '+',
    label: 'Campaigns Launched',
    showFloating: true,
    gifUrl: 'assets/gif1.gif'
  },
  {
    key: 'reviews',
    target: 100,
    suffix: 'K',
    label: 'Markets Tapped',
    showFloating: true,
    gifUrl: 'assets/gif2.gif'
  },
  {
    key: 'experience',
    target: 20,
    suffix: 'L+',
    label: 'Revenue Generated',
    showFloating: true,
    gifUrl: 'assets/gif4.gif'
  },
  {
    key: 'Clients',
    target: 25,
    suffix: '+',
    label: 'Clients Served',
    showFloating: true,
    gifUrl: 'assets/gif3.gif'
  }
];

  currentCounts: { [k: string]: number } = {};

  // process steps (4)
  steps = [
    {
      title: 'We Stalk',
      desc:
        'We start with in-depth research—learning about your business, your audience, and your competitors to build a data-backed strategy.'
    },
    {
      title: 'We Create Cool Stuff',
      desc:
        'Our team designs high-impact creatives, writes persuasive copy, and sets up campaigns tailored to your goals.'
    },
    {
      title: 'We Push Buttons',
      desc:
        'Ads are launched with precision targeting and smart budgeting to ensure every rupee works harder.'
    },
    {
      title: 'We Show You the Numbers',
      desc:
        'You’ll receive regular performance updates with clear metrics, actionable insights, and full transparency.'
    }
  ];

  angles = [210, 150, 90, 30]; // placement for 4 dots
  currentRotate = 0;
  activeIndex = 0;

  // timers for process rotation and counters
  private processAutoRotateInterval: any = null;
  private counterIntervals: { [k: string]: any } = {};

  private resizeListener: any = null;
  private scrollListener: any = null;
  private loadListener: any = null;

  constructor(private renderer: Renderer2) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobile(): void {
    this.mobileMenuOpen = false;
  }

  ngAfterViewInit(): void {
    // existing inits
    this.initVideoAutoplay();
    this.initTestimonialsSlider();

    // initialize achievements/process section
    this.initAchievementsAndProcess();

    // resize listener
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener('resize', this.resizeListener);

    // reveal on scroll and load
    this.scrollListener = this.revealOnScroll;
    this.loadListener = this.revealOnScroll;
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('load', this.loadListener);

    // initial reveal
    setTimeout(() => this.revealOnScroll(), 40);
  }

  ngOnDestroy(): void {
    // testimonials slider
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // achievements/process timers
    this.stopProcessAutoRotate();
    Object.values(this.counterIntervals).forEach((id: any) => clearInterval(id));

    // listeners
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
    if (this.loadListener) {
      window.removeEventListener('load', this.loadListener);
      this.loadListener = null;
    }
  }

  // ---------------- existing helpers ----------------
  private initVideoAutoplay(): void {
    try {
      const videoEl = this.bgVideoRef ? this.bgVideoRef.nativeElement : (document.getElementById('bgVideo') as HTMLVideoElement | null);
      if (!videoEl) return;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      const p = videoEl.play();
      if (p && typeof (p as any).catch === 'function') {
        (p as Promise<void>).catch(err => console.warn('Autoplay blocked:', err));
      }
    } catch (err) {
      console.warn('Video init error', err);
    }
  }

  private initTestimonialsSlider(): void {
    const slider = document.getElementById('slider') as HTMLElement | null;
    const wrapper = this.wrapperRef ? (this.wrapperRef.nativeElement as HTMLElement) : null;
    if (!slider || !wrapper) return;

    const totalSlides = this.repeatedTestimonials.length;
    const slideWidth = () => wrapper.offsetWidth;

    slider.style.transition = 'none';
    slider.style.transform = `translateX(0px)`;
    this.currentIndex = 0;

    const moveSlide = () => {
      const w = slideWidth();
      this.currentIndex++;
      slider.style.transition = 'transform 0.5s linear';
      slider.style.transform = `translateX(-${this.currentIndex * w}px)`;

      if (this.currentIndex === totalSlides / 2) {
        setTimeout(() => {
          slider.style.transition = 'none';
          slider.style.transform = `translateX(0px)`;
          this.currentIndex = 0;
        }, 520);
      }
    };

    this.intervalId = setInterval(moveSlide, 4000);
  }

  private onResize(): void {
    const slider = document.getElementById('slider') as HTMLElement | null;
    const wrapper = this.wrapperRef ? (this.wrapperRef.nativeElement as HTMLElement) : null;
    if (slider && wrapper) {
      const w = wrapper.offsetWidth;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${this.currentIndex * w}px)`;
    }
  }

  // ---------------- new: achievements & process ----------------
  private initAchievementsAndProcess(): void {
    // init counters
    this.stats.forEach(s => {
      this.currentCounts[s.key] = 0;
      this.animateCount(s.key, s.target, 1200);
    });

    // start auto rotate for process dots
    this.startProcessAutoRotate();
  }

  selectStep(i: number) {
    if (i < 0 || i >= this.steps.length) return;
    this.activeIndex = i;
    const angle = this.angles[i] ?? 0;
    this.currentRotate = -angle;
    this.resetProcessAutoRotate();
  }

  private startProcessAutoRotate() {
    this.processAutoRotateInterval = setInterval(() => {
      const next = (this.activeIndex + 1) % this.steps.length;
      this.activeIndex = next;
      const angle = this.angles[next];
      this.currentRotate = -angle;
    }, 4200);
  }

  private stopProcessAutoRotate() {
    if (this.processAutoRotateInterval) {
      clearInterval(this.processAutoRotateInterval);
      this.processAutoRotateInterval = null;
    }
  }

  private resetProcessAutoRotate() {
    this.stopProcessAutoRotate();
    // restart after user inactivity
    setTimeout(() => this.startProcessAutoRotate(), 6000);
  }

  private animateCount(key: string, target: number, duration = 1200) {
    const start = 0;
    const range = target - start;
    const minFrame = 20;
    const steps = Math.ceil(duration / minFrame);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = this.easeOutCubic(progress);
      const value = Math.round(start + range * eased);
      this.currentCounts[key] = value;
      if (currentStep >= steps) {
        this.currentCounts[key] = target;
        clearInterval(interval);
      }
    }, minFrame);

    this.counterIntervals[key] = interval;
  }

  private easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ---------------- reveal on scroll (kept as-is) ----------------
  private revealOnScroll = (): void => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top < windowHeight - elementVisible && rect.bottom > 0) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    const leftReveals = document.querySelectorAll('.reveal-left');
    leftReveals.forEach((el, i) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top < windowHeight - elementVisible && rect.bottom > 0) {
        setTimeout(() => el.classList.add('active'), i * 150);
      } else {
        el.classList.remove('active');
      }
    });
  };
}
