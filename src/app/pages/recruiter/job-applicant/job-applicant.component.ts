import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { appliedDataByUser, jobApplicantData, jobAppliedApplicant, jobDescription, jobDetails } from 'src/app/types/job.type';

@Component({
  selector: 'app-job-applicant',
  templateUrl: './job-applicant.component.html',
  styleUrls: ['./job-applicant.component.scss'],
  providers: [MessageService]
})
export class JobApplicantComponent implements OnInit{

  public sanitizedHtml!: SafeHtml;
  jobDetails!: jobDetails[];
  jobDesc!: jobApplicantData;
  totalJobCount: number = 0;
  jobView: boolean = true;
  applicantView: boolean = false;
  applicantDetails!: jobAppliedApplicant;
  applicantData!: appliedDataByUser[];
  totalAppliedJobCount: number = 0;
  job_id!: number;
  jobDescription!: jobDescription;
  alumniAppliedJobView: boolean = true;
  alumniAppliedDescription: boolean = false;
  filterText: string = '';
  filterTextAppliedJob: string = '';

  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPostJobDetails('', 1);
  }

  
  // Function to get job details
  getPostJobDetails(searchText: string, page: number) {
    this.apiService
      .getApi(`/jobs/getUserJob?searchText=${searchText}&page=${page}`)
      .subscribe((response: any) => {
        if (response) {
          this.jobDesc = response.data;
          this.jobDetails = this.jobDesc.postedJobDetails;
          this.totalJobCount = this.jobDesc.totalCount;     
        }
      });
  }

    // Function to view applicants for a job
    viewApplicant(data: any) {
      this.job_id = data.jobId;
      this.getAppliedJobDetails('', 1, this.job_id);
  
      this.jobView = false;
      this.applicantView = true;
      this.jobDescription = data;
      const unsafeHtml = this.jobDescription.jobsDescription;
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
    }

      //Updating the application status to shortlist or reject
  applicationStatus(status: string, jobApplicantId: number) { 
    this.updateApplicationStatus(status as string, jobApplicantId as number);
  }

    // Function to view a resume
    viewResume (status: string, jobApplicantId: number,userId:number) { 
      if (status === 'applicationSubmitted') {
        this.updateApplicationStatus('applicationViewed' as string, jobApplicantId as number);
      }

      this.router.navigate(['pages/user/profile']);

    }

     //updating the application status
  updateApplicationStatus(status: string, jobApplicantId: number) { 
    const data = {
      status: status,
      jobApplicantId: jobApplicantId,
    };
    this.apiService.postApi('/jobs/updateStatus', data).subscribe((response: any) => {
        if (response) {
          this.getAppliedJobDetails('', 1, this.job_id);   
        }
      });
  }

    // Function to get applied job details
    getAppliedJobDetails(searchText: string, page: number, job_id: number) {
      this.apiService
        .getApi(
          `/jobs/getAppliedJobData?searchText=${searchText}&page=${page}&job_id=${job_id}`
        )
        .subscribe((response: any) => {
          if (response) {
            this.applicantDetails = response.data;
            this.applicantData = this.applicantDetails.jobAppliedData;
            this.totalAppliedJobCount = this.applicantDetails.total;
          }
        });
    }

      // Function to go back to the job view from applicant view
  backToApplicant() {
    this.jobView = true;
    this.applicantView = false;
    this.alumniAppliedJobView = true;
    this.alumniAppliedDescription = false;
    this.getPostJobDetails('',1);
  }

   // Function to filter job details
   filterData() {
    this.getPostJobDetails(this.filterText, 1);
  }

   // Function to filter applied job details
   filterDataAppliedJob() {
    this.getAppliedJobDetails(this.filterTextAppliedJob, 1, this.job_id);
  }
}
