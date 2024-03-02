import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { resumeDataByUser } from 'src/app/types/job.type';

@Component({
  selector: 'app-submit-resume',
  templateUrl: './submit-resume.component.html',
  styleUrls: ['./submit-resume.component.scss'],
  providers: [MessageService, ConfirmationService],
})

export class SubmitResumeComponent implements OnInit {
  resumeType: string = 'user'; // Initialize the default resume type
  file!: File;
  fileNameUser: string = 'undefined';
  formResume!: FormGroup; // Create a FormGroup for the resume submission form
  resumeData!: resumeDataByUser;

  // Inject Router using constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    // Initialize the form controls with their default values and validators
    this.formResume = this.fb.group({
      applicantFullName: ['', [Validators.required]],
      applicantEmail: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      applicantRelevantSkills: ['', [Validators.required]],
      file: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getResumeData();
  }

  getResumeData() {
    this.apiService
      .getApi('/jobs/getResume')
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.resumeData = response.data;
            this.patchValueOfUser(this.resumeData);
          this.fileNameUser = this.resumeData?.applicantResumePath;
          if (!this.fileNameUser) this.fileNameUser = 'undefined';
        }
      });
  }

  //patch the value of user Resume
  patchValueOfUser(data: resumeDataByUser) {
    console.log('data',data);
    
    this.formResume.patchValue({
      applicantEmail: data.applicantEmail ? data.applicantEmail : '',
      applicantFullName: data.applicantFullName ? data.applicantFullName : '',
      mobileNumber: data.mobileNumber ? data.mobileNumber : '',
      applicantRelevantSkills: data.applicantRelevantSkills ? data.applicantRelevantSkills : '',
      designation: data.designation ? data.designation : '',  
    });
  } 

  // Handle file input change
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  // Function to submit the resume
  submitResume() {
    if (this.file || this.fileNameUser !== undefined) {  
      this.formResume.get('file')?.clearValidators();
      this.formResume.get('file')?.updateValueAndValidity();
    }
    if (this.formResume.valid) {
      // The form is valid, so you can proceed with submission
      const formValue = { ...this.formResume.value };
      delete formValue.file;

      const formData = new FormData();
      formData.append('dest', 'resume');
      formData.append('file', this.file);
      formData.append('data', JSON.stringify(formValue));

      this.apiService
        .postApi('/jobs/postResume', formData)
        .subscribe((response: any) => {
          // Handle the response
          if (response.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Resume saved Successfully!',
            });
            this.getResumeData();
          } else {
            this.messageService.add({
              severity: 'danger',
              summary: 'Danger',
              detail: 'Error occurred while saving resume try again later!',
            });
          }
        });
    } else {
      // The form is invalid
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill All the Details',
      });
    }
  }

  // Function to cancel the submission and navigate to another page
  cancelSubmission() {
    this.router.navigate(['pages', 'user', 'job-list']);
  }

  //delete the resume by reference type
  deleteResume() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Resume?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-cross',
      accept: () => {
        this.apiService
          .deleteApi(`/jobs/deleteResumeFile`)
          .subscribe((response: any) => {
            if (response.status == 200) {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Resume Deleted SuccessFully!',
              });
              this.ngOnInit();
            }
          });
      },
    });
  }
}
