import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { jobSeekerData, jobSeekerDetails } from 'src/app/types/job.type';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  filterTextSeeker: string = '';
  jobSeekerDetails!: jobSeekerData[];
  jobSeekerData!: jobSeekerDetails;
  totalJobSeekerCount: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getJobSeekerDetails('', 1);
  }


    // Function to get job seeker details
    getJobSeekerDetails(searchText: string, page: number) {
      this.apiService
        .getApi(`/jobs/getJobSeeker?searchText=${searchText}&page=${page}`)
        .subscribe((response: any) => {
          if (response) {
            console.log('Job Seeker', JSON.stringify(response));
            
            this.jobSeekerData = response.data;
            this.jobSeekerDetails = this.jobSeekerData.jobSeekerData;
            console.log('this.jobSeekerDetails',this.jobSeekerDetails);
            
            this.totalJobSeekerCount = this.jobSeekerData.total;
          }
        });
    }

    getSanitizedUrl(fileName:string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.url}/profile/${fileName}`);
    }

    viewProfile(){
      this.router.navigate(['/pages/user/profile']);
    }

      // Function to filter job seeker details
  filterDataSeeker() {
    this.getJobSeekerDetails(this.filterTextSeeker, 1);
  }
}
