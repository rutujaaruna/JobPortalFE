import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/utils/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isDropdownOpen: boolean = false;
  public hidePassword: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email, // Validates email format.
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), // Additional pattern validation.
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6), // Validates minimum length.
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: AuthService,
    private utils: UtilService
  ) {}

  login() {
    if (this.loginForm.valid) {
      const loginCredentials = this.loginForm.value;
      this.api.login(loginCredentials).subscribe((data: any) => {
        if (data.status === 200) {
          const token = data.data;
          localStorage.setItem('token', token);
          const userData = this.utils.decodeJwtToken(token);
          if (userData && userData.role === 'recruiter') {
            this.router.navigateByUrl('pages/recruiter/dashboard');
          } else {
            if( userData.profileVisit === false){
              this.router.navigateByUrl('profile-complete');
            }else{
              this.router.navigateByUrl('pages/user/job-list');
            }
          }
        } else if (data.status === 422) {
          alert(data.error);
        } else {
          alert('somthimg went wrong');
        }
      });
    } else {
      alert('Please enter email & password');
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  register(type:string) {
     this.router.navigate(['/auth/register'], { queryParams: { type } });
  }
}
