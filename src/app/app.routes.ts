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

import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './task-management/dashboard/dashboard';
import { TaskLayoutComponent } from './task-management/layout/task-layout';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';
import { ClientListComponent } from './task-management/clients/client-list/client-list';
import { ClientFormComponent } from './task-management/clients/client-form/client-form';
import { CampaignListComponent } from './task-management/campaigns/campaign-list/campaign-list';
import { CampaignFormComponent } from './task-management/campaigns/campaign-form/campaign-form';
import { AccessDeniedComponent } from './auth/access-denied/access-denied';
import {TaskListComponent} from './task-management/tasks/task-list/task-list';
import {TaskCreateComponent} from './task-management/tasks/task-create/task-create';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  {
    path: 'task-management',
    component: TaskLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'users',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN']
        }
      },

      {
        path: 'clients',
        component: ClientListComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },
      {
        path: 'clients/create',
        component: ClientFormComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },
      {
        path: 'clients/:id/edit',
        component: ClientFormComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },

      {
        path: 'campaigns',
        component: CampaignListComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },
      {
        path: 'campaigns/create',
        component: CampaignFormComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },
      {
        path: 'campaigns/:id/edit',
        component: CampaignFormComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },

      {
        path: 'audit-logs',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN']
        }
      },
      {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      },
      {
        path: 'tasks/create',
        component: TaskCreateComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['SUPER_ADMIN', 'ADMIN']
        }
      }
    ]
  },


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
