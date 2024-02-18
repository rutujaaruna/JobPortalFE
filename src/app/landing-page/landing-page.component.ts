import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isDropdownOpen: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    this.router.navigateByUrl('auth/login');
  }

  register(type:string) {
     this.router.navigate(['/auth/register'], { queryParams: { type } });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



}
