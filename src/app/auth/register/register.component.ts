import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email, // Validates email format.
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), // Additional pattern validation.
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6), // Validates minimum length.
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6), // Validates minimum length.
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: AuthService
  ) {}

  ngOnInit() {}

  register() {
    console.log('this', this.registerForm.value);
    if (this.registerForm.valid) {
      const registerValues = this.registerForm.value;
      this.api.register(registerValues).subscribe((res: any) => {
        if (res.status === 200) {
          alert('Registeration successfully done');
          this.router.navigateByUrl('auth/login');
        } else {
          alert('Registration falied');
        }
      });
    } else {
      alert('Fill form properly');
    }
  }
}
