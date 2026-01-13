import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ServicesComponent } from './services/services';
import { OurWorkComponent } from './our-work/our-work';
import { ContactUsComponent } from './contact-us/contact-us';
import { AboutUsComponent } from './about-us/about-us';
import { BlogGridComponent } from './blogpage/blogpage';
import { AiToolsComponent } from './blogpage/aitools/aitools';
import { DigitalmarketingComponent } from './blogpage/digitalmarketing/digitalmarketing';
import { OwnersApprovedComponent } from './owners-approved/owners-approved';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'our-work', component: OurWorkComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'blogs', component: BlogGridComponent },
  { path: 'blogs/ai-tools', component: AiToolsComponent },
  { path:'blogs/digitalmarketing',component:DigitalmarketingComponent},
  {path:'owners-approved',component:OwnersApprovedComponent}
];
