import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EducationalDetail, UserDetails, UserDetailsData, WorkingDetailsData } from 'src/app/types/profile.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { resumeDataByUser } from 'src/app/types/job.type';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userData!:UserDetails; 
  userBasicData!:UserDetailsData[];
  eduData!:EducationalDetail[];
  workExpData!:WorkingDetailsData[];
  photoURL!:SafeResourceUrl;
  resumeData!: resumeDataByUser;
  skills!:string[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getResumeData();
  }

  getUserData(){
    this.apiService.getApi(`/user/getProfileDetails`)
    .subscribe((response: any) => {
      // Handle the response        
      if (response.status === 200) {
        this.userData = response.data;
        this.workExpData = this.userData.workingDetails;
        this.eduData = this.userData.educationalDetails;
        this.userBasicData = this.userData.userDetails;  
        
        this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${environment.url}/uploads/profile/${this.userData.profilePic}`
         );
      }
    });
  }
  getResumeData() {
    this.apiService
      .getApi('/jobs/getResume')
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.resumeData = response.data;
           this.skills = this.resumeData.applicantRelevantSkills.split(" ");
        }
      });
  }

  updateProfile(){
    this.router.navigate(['/profile-complete'])
  }
}
