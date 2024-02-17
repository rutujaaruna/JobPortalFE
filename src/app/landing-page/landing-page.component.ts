import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  postJob() {
    this.router.navigateByUrl('auth/login');
  }

  register() {
    this.router.navigateByUrl('auth/register');
  }
}
