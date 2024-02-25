import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  registerForm: FormGroup;
  role!:string;

  submitted: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: AuthService,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit() {
    this.role= String(this.route.snapshot.queryParamMap.get('type'))
  }

  register() {
    if (this.registerForm.valid) {
      const registerValues = this.registerForm.value;
      registerValues.role=this.role;
      console.log("regsss",registerValues)
      this.api.register(registerValues).subscribe((res: any) => {
        if (res.status === 200) {
          alert(res.message);
          this.router.navigateByUrl('auth/login');
        } else {
          alert(res.message);
        }
      });
    } else {
      alert('Fill form properly');
    }
  }

  // Custom validation function to ensure password matching
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl?.errors && !matchingControl?.errors['mustMatch']) {
        return;
      }

      if (!control?.value || control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  get f() {
    return this.registerForm.controls;
  }
}
