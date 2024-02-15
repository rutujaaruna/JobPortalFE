import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/utils/util.service';

export type EventViewOption ={
  value: string,
  label: string,
};

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
  providers: [MessageService],

})
export class AddJobComponent {
  
  // Inject your services using constructor instead of direct assignment
  constructor(
    private utilService: UtilService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  // Other class properties
  getExperienceYear = this.utilService.getExperience();
  postType:boolean=true;

  // Create the form group for adding jobs
  addJob: FormGroup = new FormGroup({
    jobType: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    companyWebsite: new FormControl('', [Validators.required]),
    experienceFrom: new FormControl('', [Validators.required]),
    experienceTo: new FormControl('', [Validators.required]),
    jobLocation: new FormControl('', [Validators.required]),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    skills: new FormControl('', [Validators.required]),
    salaryPackage: new FormControl('', [Validators.required]),
    salaryStipend: new FormControl('', [Validators.required]),
    applicationDeadline: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    industryType: new FormControl('', [Validators.required]),
    employmentType: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    jobsDescription: new FormControl('', [Validators.required]),
  });

  eventViewedOptions: EventViewOption[] = [
    { value: 'Job', label: 'Add Job' },
    { value: 'Internship', label: 'Add Internship' }
    ];


  resetForm(){
    this.addJob.reset();
  }

  // A separate function to update form validators based on postType
  private updateFormValidators(type:string) {
    if (type === 'job') {
      this.addJob.get('salaryPackage')?.setValidators([Validators.required]);
      this.addJob.get('salaryStipend')?.clearValidators();
    } else {
      this.addJob.get('salaryStipend')?.setValidators([Validators.required]);
      this.addJob.get('salaryPackage')?.clearValidators();
    }
    // Update the form controls' validity
    this.addJob.get('salaryPackage')?.updateValueAndValidity();
    this.addJob.get('salaryStipend')?.updateValueAndValidity();
  }

  // Post job and internship function
  postJobIntern() {    
    if (this.addJob.valid) {
      const formValue = { ...this.addJob.value };
      formValue.jobType= this.addJob.get('jobType')?.value.value

      // Use ApiService to post the job/internship
      this.apiService
        .postApi('/jobs/postJob', formValue)
        .subscribe((response: any) => {
          // Handle the response
          if (response.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Job Posted SuccessFully!',
            });
            this.addJob.reset();
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill Require Fields',
      });
    }
  }

  selectViewedOption(event: EventViewOption) {
    if (event.value === 'Job') {
      this.postType = true;
      this.updateFormValidators('job');
    } else  {
      this.postType = false;
      this.updateFormValidators('internship');
    }
  }
}
