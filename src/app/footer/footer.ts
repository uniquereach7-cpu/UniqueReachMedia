import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Required
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !event.url.includes('/owners-approved');
      }
    });
  }
}
