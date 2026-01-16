// creative-process.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-grid-hand",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./gridhand.html",
  styleUrls: ["./gridhand.css"],
})
export class gridhand {
}
