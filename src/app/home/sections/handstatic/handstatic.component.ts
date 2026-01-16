// creative-process.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



@Component({
  selector: "app-hand-static",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./handstatic.html",
  styleUrls: ["./handstatic.css"],
})
export class handstatic {

    @ViewChild('phoneVid') phoneVid!: ElementRef<HTMLVideoElement>;
    ngAfterViewInit(){
  const v = this.phoneVid?.nativeElement;
  if (!v) return;
  v.muted = true;
  v.playsInline = true;
  v.play().catch(() => {});
}
}