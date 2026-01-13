import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUsComponent implements OnInit {

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const paragraphs = document.querySelectorAll('.story-paragraph');
      paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          p.classList.add('visible');
        }
      });
    });
  }
}
