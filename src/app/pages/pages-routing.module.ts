import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: 'user', redirectTo: 'user/job-list', pathMatch: 'full' },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'recruiter',
        redirectTo: 'recruiter/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'recruiter',
        loadChildren: () =>
          import('./recruiter/recruiter.module').then((m) => m.RecruiterModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
