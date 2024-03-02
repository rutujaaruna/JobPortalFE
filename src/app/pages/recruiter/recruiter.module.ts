import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobComponent } from './add-job/add-job.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { JobApplicantComponent } from './job-applicant/job-applicant.component';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';


@NgModule({
  declarations: [AddJobComponent, DashboardComponent, JobApplicantComponent, JobSeekerComponent],
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
    TagModule,
    DividerModule,
    TooltipModule,
    FormsModule
  ],
})
export class RecruiterModule {}
