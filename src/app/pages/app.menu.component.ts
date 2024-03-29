import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';
import { UtilService } from '../utils/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  userType!:string;

  constructor(public layoutService: LayoutService,private utils: UtilService) {}

  ngOnInit() {
    const token = this.utils.isLoggedIn();
    if (token) {
      const userData = JSON.stringify(this.utils.decodeJwtToken(token));
      this.userType = JSON.parse(userData).role;
    } else {
      alert('No Token Found');
    }

    this.giveAccessTbas();
  }

  giveAccessTbas(){
    if(this.userType === "recruiter"){
       this.model = [
        {
          label: '',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/pages/recruiter/dashboard'],
            },
            {
              label: 'Post a Job',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/pages/recruiter/add-job'],
            },
            {
              label: 'Job Applicants',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/pages/recruiter/job-applicant'],
            },
            {
              label: 'Job Seeker',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/pages/recruiter/job-seeker'],
            },
          ],
        },
      ];
    }else if(this.userType === "user"){
      this.model = [
        {
          label: '',
          items: [
            {
              label: 'Job-List',
              icon: 'pi pi-fw pi-briefcase',
              routerLink: ['/pages/user/job-list'],
            },
            {
              label: 'Applied Job',
              icon: 'pi pi-fw pi-user',
              routerLink: ['/pages/user/applied-job'],
            },
            {
              label: 'Saved Job',
              icon: 'pi pi-fw pi-users',
              routerLink: ['/pages/user/saved-job'],
            },
            {
              label: 'Profile',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/pages/user/profile'],
            },
            {
              label: 'Chatbot',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/pages/user/chatbot'],
            },
  
            {
              label: 'Submit Resume',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/pages/user/submit-resume'],
            },
          ],
        },
      ];
    }
  }
}
