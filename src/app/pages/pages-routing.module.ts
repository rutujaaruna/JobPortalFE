import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddJobComponent } from './recruiter/add-job/add-job.component';
import { AuthenticationGuard } from '../services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'job-list',
        component: JobListComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'applied-job',
        component: AppliedJobComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'saved-job',
        component: SavedJobComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'recruiter/add-job',
        component: AddJobComponent,
        canActivate: [AuthenticationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
