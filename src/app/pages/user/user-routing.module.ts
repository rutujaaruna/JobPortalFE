import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { JobListComponent } from './job-list/job-list.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ProfileComponent } from './profile/profile.component';
import { userRouteGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: PagesComponent,
    children: [
      {
        path: 'job-list',
        component: JobListComponent,
        canActivate: [userRouteGuard],
      },
      {
        path: 'applied-job',
        component: AppliedJobComponent,
        canActivate: [userRouteGuard],
      },
      {
        path: 'saved-job',
        component: SavedJobComponent,
        canActivate: [userRouteGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [userRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
