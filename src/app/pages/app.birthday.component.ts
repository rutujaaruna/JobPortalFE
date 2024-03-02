import { ElementRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';
// import { ApiService } from '../services/api.service';
import { profileData, ResponseType } from '../types/auth.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environment/environment';
import { UtilService } from '../utils/util.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-birthday',
  templateUrl: './app.birthday.component.html',
})
export class AppBirthdayComponent implements OnInit{
  profileData!: profileData;
  // profilePic:string | SafeResourceUrl;
  // photoURL: SafeResourceUrl;
  // upcomingBirthdays: any;
  // birthdayData:any;
  userId!: number;
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private utils: UtilService
  ) {}

  ngOnInit(): void {
    const token = this.utils.isLoggedIn();
    if (token) {
      const userData = JSON.stringify(this.utils.decodeJwtToken(token));
      this.userId = JSON.parse(userData).id;
    } else {
      alert('No Token Found');
    }

    this.getProfileData();
  }

  getProfileData() {
    this.apiService.getApi(`/user/getProfileData`).subscribe((res: any) => {
      if (res.status === 200) {
        this.profileData = res.data;
      }
    });
  }
}
