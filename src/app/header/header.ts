import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnDestroy {
  showHeader = true;
  menuOpen = false;
  private routerSub?: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/owners-approved');
        this.menuOpen = false; // close menu on route change
      }
    });
  }

  toggleMenu(event: Event): void {
    event.stopPropagation(); // 🔑 prevents immediate close
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onFragmentClick(fragment: string): void {
    this.closeMenu();

    const target = document.getElementById(fragment);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Close menu when clicking outside header
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (this.menuOpen && !target.closest('app-header')) {
      this.closeMenu();
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
