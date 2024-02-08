import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: string = '';
  hidePassword: boolean = true;

  constructor() {}

  ngOnInit() {}

  login() {
    console.log('loginnnn');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
