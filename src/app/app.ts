import { Component, HostListener } from '@angular/core';
import { RouterOutlet, ROUTES } from '@angular/router';
// import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header/header';
// import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer';
import {CursorDotComponent} from "./cursordot/cursor-dot.component"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,RouterModule,FooterComponent,CursorDotComponent],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'urm';

  showScrollTop = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentY = window.scrollY || document.documentElement.scrollTop || 0;
    this.showScrollTop = currentY > 20;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

