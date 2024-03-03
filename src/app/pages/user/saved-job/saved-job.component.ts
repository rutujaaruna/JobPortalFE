import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { jobDescription, jobDetails, savedJobData } from 'src/app/types/job.type';
import { MessageService } from 'primeng/api';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-saved-job',
  templateUrl: './saved-job.component.html',
  styleUrls: ['./saved-job.component.scss'],
  providers: [MessageService]
})
export class SavedJobComponent {
  public sanitizedHtml!: SafeHtml;
 jobDescription!: jobDescription;
 jobDetails!: jobDetails[];
 jobView: boolean = true;
 descriptionView: boolean = false;
 filterText: string = '';
 jobData!: savedJobData;
 totalItems!: number;
 appliedUser: boolean = false;
 appliedFriend: boolean = false;
 status!: string;
 save:boolean = false;

  constructor(private apiService: ApiService,private sanitizer: DomSanitizer,private messageService: MessageService){}

  ngOnInit():void{
    this.getSavedJobDetails('', 1);
  }

  // getSavedJobData(){
  //   this.apiService.getApi('/jobs/getSavedJobData').subscribe((response:any) => {
  //     if(response.status === 200){
  //       this.jobDescription = response.data;
  //     }
  //     console.log("respionse",response.data);
  //   })
  // };

  // Function to filter job data based on the filter text
  filterData() {
    this.getSavedJobDetails(this.filterText, 1);
  }

  //function to get Job Details
  getSavedJobDetails(searchTerm: string, page: number) {
    this.apiService
      .getApi(`/jobs/getSavedJobData?globalSearch=${searchTerm}&page=${page}`)
      .subscribe((response:any) => {
        
        // Handle the response
        if (response) {
           this.jobData = response.data;
          this.jobDetails = this.jobData.jobSaveddData;
          this.totalItems = this.jobData.total;
        }
      });
  };

  // Function to display job description and retrieve applied data
  click(data: any) {
    this.jobDescription = data;
    const unsafeHtml = this.jobDescription.jobsDescription;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
    this.jobView = false;
    this.descriptionView = true;
  };

  // Function to go back to the job view from job description view
  backToJob() {
    this.jobView = true;
    this.descriptionView = false;
    this.appliedUser = false;
    this.appliedFriend = false;
  };

  
  // Function to apply for a job
  applyForJob(reference: string, job_id: number) {
    const data = {
      reference: reference,
      job_id: job_id,
    };
    this.apiService
      .postApi('/jobs/applyForJob', data)
      .subscribe((response: any) => {
        this.status = response.data;
        if (this.status == 'user') {
          if (response.status === 200) {
            this.appliedUser = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully You Applied for this job',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${response.error}`,
            });
          }
        } else {
          if (response.status === 200) {
            this.appliedFriend = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully Applied this job for Your Friend',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${response.error}`,
            });
          }
        }
      });
  };

  unSaveJobs(jobId:number){
     if(jobId){
      this.apiService.postApi('/jobs/unSaveJobs', {jobId}).subscribe((response:any)=>{
        if(response.status === 200){
          this.save = true;
          this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully Unsaved'
            });
            this.ngOnInit();
        }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${response.error}`,
            });
        }
      })
    }
  };

  saveJobs(jobId:number){
    if(jobId){
      this.apiService.postApi('/jobs/saveJobs', {jobId}).subscribe((response:any)=>{
        if(response.status === 200){
          this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully saved'
            });
            this.save=false;
        }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${response.error}`,
            });
        }
      })
    }
  }

  

}
