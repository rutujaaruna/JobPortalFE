import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { SubmitResumeComponent } from './submit-resume/submit-resume.component';

@NgModule({
  declarations: [
    JobListComponent,
    AppliedJobComponent,
    SavedJobComponent,
    ProfileComponent,
    ChatbotComponent,
    SubmitResumeComponent,
  ],
  imports: [
    CommonModule,
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
    DividerModule,
    FormsModule
  ],
})
export class UserModule {}
