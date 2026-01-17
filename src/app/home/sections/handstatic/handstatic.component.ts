// handstatic.ts
import { Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-hand-static",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./handstatic.html",
  styleUrls: ["./handstatic.css"],
})
export class handstatic {
  @ViewChild("phoneVid") phoneVid!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const v = this.phoneVid?.nativeElement;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  }
}
