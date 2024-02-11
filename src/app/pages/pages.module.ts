import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppRightBarComponent } from './app.rightbar.component';
import { AppBirthdayComponent } from './app.birthday.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppMenuComponent } from './app.menu.component';
import { CardModule } from 'primeng/card';
import { JobListComponent } from './job-list/job-list.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AppTopBarComponent,
    AppSidebarComponent,
    AppFooterComponent,
    AppRightBarComponent,
    AppBirthdayComponent,
    AppMenuitemComponent,
    AppMenuComponent,
    JobListComponent,
    AppliedJobComponent,
    SavedJobComponent,
    ProfileComponent,
    AboutUsComponent
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ConfirmDialogModule
  ]
})
export class PagesModule { }
