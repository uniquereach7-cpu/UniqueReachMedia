// creative-process.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-creative-process",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./creative-process.component.html",
  styleUrls: ["./creative-process.component.css"],
})
export class CreativeProcessComponent {
}
