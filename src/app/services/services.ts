import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class ServicesComponent {
  services = [
    {
      title: 'Search Engine Optimization (SEO)',
      description: ' Search Engine Optimization (SEO) is the art and science of enhancing your online presence to rank higher on search engines like Google. It ensures your brand appears at the right time, to the right audience, driving quality organic traffic. A well-structured SEO strategy builds credibility, boosts visibility, and positions your business as a trusted leader in your domain. In the digital world, visibility is value — and SEO makes you seen.',
      icon: 'assets/SEO.png'
    },
    {
      title: 'Social Media Marketing',
      description: 'Social Media Marketing is the powerful bridge between brands and their audiences, transforming engagement into influence. By crafting compelling content and fostering authentic interactions across platforms like Instagram, LinkedIn, and Facebook, it turns followers into loyal customers. It’s not just about presence — it’s about creating a voice that resonates, builds trust, and drives real business growth in the social-first era.',
      icon: 'assets/socialmedia.png'
    },
    {
      title: 'Photography and Videography',
      description: ' Capture moments that speak louder than words. Our photography and videography services bring stories to life with striking visuals and cinematic finesse. Whether it’s for branding, events, or social campaigns, we frame every detail with creativity and purpose. Let your vision unfold through our lens — professionally, passionately, and powerfully.',
      icon: 'assets/photovideo.jpeg'
    },
    
    {
      title: 'Performance Marketing',
      description: 'Drive results that matter. Our performance marketing strategies are data-driven, ROI-focused, and tailored to scale your business. From precision targeting to real-time optimization, we ensure every click and conversion counts. Let your brand grow with campaigns that are not just seen — but deliver measurable success.',
      icon: 'assets/performance.png'
    },
    {
      title: 'Website and App Development',
      description: 'We design and develop sleek, responsive websites and powerful mobile apps that elevate user experiences and drive engagement. Blending creativity with technology, we build digital platforms tailored to your brand’s goals. From concept to launch, every line of code is crafted with precision. Let your digital presence speak innovation and impact.',
      icon: 'assets/webapp.png'
    },
    {
      title: 'Branding',
      description: 'Branding is more than just a logo—its the soul of your business. We craft distinctive brand identities that reflect your vision, connect emotionally with your audience, and leave a lasting impression. From colors and typography to messaging and voice, every element is strategically designed. Let us help you build a brand that speaks with clarity, confidence, and consistency.',
      icon: 'assets/Branding.png'
    }
  ];
}