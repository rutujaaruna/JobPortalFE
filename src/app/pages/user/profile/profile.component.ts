import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EducationalDetail, UserDetails, UserDetailsData, WorkingDetailsData } from 'src/app/types/profile.type';

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

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
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
      }
    });
  }

  updateProfile(){
    this.router.navigate(['/profile-complete'])
  }
}
