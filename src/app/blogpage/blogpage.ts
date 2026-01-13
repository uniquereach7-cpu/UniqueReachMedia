import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogpage.html',
  styleUrls: ['./blogpage.css']
})
export class BlogGridComponent {
  blogs = [
    {
      title: 'The Best Free AI Marketing Tools Every Brand Should Know About',
      imageUrl: 'assets/aitools.jpg',
      excerpt: 'Discover top free AI tools that are transforming content, SEO, social media, video, and email marketing.',
      link: '/blogs/ai-tools'
    },
    {
      title: 'Digital Marketing Platforms: How to Choose the Best One',
      imageUrl: 'assets/digitalmarketingphoto.jpg',
      excerpt: 'Master your social media strategy using AI-based tools for content scheduling, design, and analytics.',
      link: '/blogs/digitalmarketing'
    },
    // {
    //   title: 'AI Video Creation: Tools You Can Use for Free Today',
    //   imageUrl: 'assets/images/video-tools.jpg',
    //   excerpt: 'Create stunning AI-generated videos with tools like Synthesia and Crayo for free.',
    //   link: '/blogs/video-tools'
    // }
  ];
}
