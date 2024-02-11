import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password: string = '';
  hidePassword: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email, // Validates email format.
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') // Additional pattern validation.
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6) // Validates minimum length.
    ])
  });

  constructor(private route: ActivatedRoute, private router: Router, private api: AuthService) {}

  login() {
    if (this.loginForm.valid) {
      const loginCredentials = this.loginForm.value;
        this.api.login(loginCredentials).subscribe((data:any) => {
          if(data.status===200){
            const token=data.data;
            localStorage.setItem('token', token);
            // navigate to dashboard page based on user role
          }else if(data.status===422){
            alert(data.error);
          }else{
            alert('soothing went wrong');
          }
        });
    } else {
      alert('Please enter email & password');
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
