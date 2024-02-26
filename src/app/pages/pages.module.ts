import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppRightBarComponent } from './app.rightbar.component';
import { AppBirthdayComponent } from './app.birthday.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppMenuComponent } from './app.menu.component';
import { CardModule } from 'primeng/card';
import { AboutUsComponent } from './about-us/about-us.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { RecruiterRoutingModule } from './recruiter/recruiter-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { UserModule } from './user/user.module';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PagesComponent,
    AppTopBarComponent,
    AppSidebarComponent,
    AppFooterComponent,
    AppRightBarComponent,
    AppBirthdayComponent,
    AppMenuitemComponent,
    AppMenuComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ChipsModule,
    ReactiveFormsModule,
    EditorModule,
    InputTextareaModule,
    ToastModule,
    RecruiterModule,
    UserModule,
    RecruiterRoutingModule,
    UserRoutingModule,
    DividerModule,
    ButtonModule
  ],

})
export class PagesModule {}
