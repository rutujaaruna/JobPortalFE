import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { ResponseType } from 'src/app/types/auth.type';

@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.scss'],
  providers: [MessageService],

})
export class AppliedJobComponent implements OnInit{

  public sanitizedHtml!: SafeHtml;

  currentPage = 1;
  totalJobCount!: number;
  totalJobSeekerCount!: number;
  limit = 8;
  filterText!: string;
  filterTextSeeker!: string;
  filterTextAppliedJob!: string;
  job_id!: number;
  totalAppliedJobCount!: number;
  jobDescription!: any;
  alumniJob!: any;
  alumniAppliedJobView: boolean = true;
  alumniAppliedDescription: boolean = false;
  appliedJobDescription!: any;
  totalAlumniJobApplied!: number;
  alumniJobData!: any[];
  filterTextAlumniApplied!: string;
  totalAlumniAppliedJobCount!: number;
  applicantApplyData!: any;



  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAlumniAppliedJob('', 1);
  }
  // Calculate the total number of pages for job details pagination
  get totalPages(): number {
    return Math.ceil(this.totalJobCount / this.limit);
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
    if (this.filterText === undefined) {
      this.filterText = '';
    }
    // this.getPostJobDetails(this.filterText, this.currentPage);
  }

  // Calculate the total number of pages for job seeker details pagination
  get totalJobSeeker(): number {
    return Math.ceil(this.totalJobSeekerCount / this.limit);
  }

  // Calculate the total number of pages for applied job details pagination
  get totalAppliedJob(): number {
    return Math.ceil(this.totalAppliedJobCount / this.limit);
  }

  onPageChangedAppliedCandidates(newPage: number) {
    this.currentPage = newPage;
    if (this.filterText === undefined) {
      this.filterText = '';
    }
  }

  // Calculate the total number of pages for applied alumni job pagination
  get totalAlumniAppliedJob(): number {
    return Math.ceil(this.totalAlumniAppliedJobCount / this.limit);
  }

  onPageChangedAlumniApplied(newPage: number) {
    this.currentPage = newPage;
    if (this.filterText === undefined) {
      this.filterText = '';
    }
    this.getAlumniAppliedJob(this.filterText, this.currentPage);
  }


  //getting alumni applied job data
  getAlumniAppliedJob(searchText: string, page: number) {
    this.apiService
      .getApi(`/jobs/getAlumniAppliedJob?searchText=${searchText}&page=${page}`)
      .subscribe((response: any) => {

        if (response) {
          this.alumniJob = response.data;
          this.alumniJobData = this.alumniJob.JobApplicant;
          this.totalAlumniAppliedJobCount = this.alumniJob.total; 
        }
      });
  }



  // Function to view applicants for a job
  viewApplicant(data: any) {
    this.job_id = data.jobId;
    this.jobDescription = data;
    const unsafeHtml = this.jobDescription.jobsDescription;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
  }

  // Function to go back to the job view from applicant view
  backToApplicant() {
    this.alumniAppliedJobView = true;
    this.alumniAppliedDescription = false;
    // this.getPostJobDetails('', 1);
  }


    // Function to filter alumni applied job details
  filterDataAlumniApplied() {
    this.getAlumniAppliedJob(this.filterTextAlumniApplied, 1);
  }

  //view applied job status
  viewAlumniJobStatus(data: any) { 
    this.appliedJobDescription = data;
    this.alumniAppliedJobView = false;
    this.alumniAppliedDescription = true;
    const unsafeHtml = this.appliedJobDescription?.job?.jobsDescription;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
  }

  //navigate to job applicants
  backToAppliedApplicant() {
    this.alumniAppliedJobView = true;
    this.alumniAppliedDescription = false;
    this.getAlumniAppliedJob('', 1);
  }

}
