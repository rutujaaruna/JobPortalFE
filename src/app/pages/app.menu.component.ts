import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    localStorage.getItem('token');
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
}
