import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddJobComponent } from './add-job/add-job.component';
import { recruiterRouteGuard } from 'src/app/auth/auth.guard';
import { JobApplicantComponent } from './job-applicant/job-applicant.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';

const routes: Routes = [
  {
    path: 'recruiter',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [recruiterRouteGuard],
      },
      {
        path: 'add-job',
        component: AddJobComponent,
        canActivate: [recruiterRouteGuard],
      },
      {
        path: 'job-applicant',
        component: JobApplicantComponent,
        canActivate: [recruiterRouteGuard],
      },
      {
        path: 'job-seeker',
        component: JobSeekerComponent,
        canActivate: [recruiterRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
