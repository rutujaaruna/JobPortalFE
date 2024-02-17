import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';
import { AuthenticationService } from '../services/authentication.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  userRole!: string;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/pages/dashboard'],
          },
          {
            label: 'Job-List',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/pages/job-list'],
          },
          {
            label: 'Applied Job',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/pages/applied-job'],
          },
          {
            label: 'Saved Job',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/pages/saved-job'],
          },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/pages/profile'],
          },
          {
            label: 'About-Us',
            icon: 'pi pi-fw pi-calendar-plus',
            routerLink: ['/pages/about-us'],
          },
          {
            label: 'Post Job',
            icon: 'pi pi-fw pi-calendar-plus',
            routerLink: ['/pages/recruiter/add-job'],
          },
        ],
      },
    ];
  }

  checkLoginStatus() {
    const user = this.authService.isLoggedIn();
    if (user && user.id && user.id.role) {
      this.userRole = user.id.role;
      console.log(this.userRole); // Do something with the user data
    } else {
      // Handle scenario when user or user id or user role is not available
    }
  }
}
