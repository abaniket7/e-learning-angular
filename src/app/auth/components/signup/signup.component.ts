import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private message: NzMessageService) {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=. *[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/)
      ]],
      checkPassword: [null, [Validators.required, this.confirmationValidate.bind(this)]]
    });
  }

  ngOnInit(): void {}

  confirmationValidate(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  register() {
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.id != null) {
            this.router.navigate(['/login']);
            this.message.success("Signup Successful", { nzDuration: 2000 });
          } else {
            this.message.error("Something went wrong. Please try again.", { nzDuration: 2000 });
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          if (err.status === 409 && err.error && err.error.message) {
            this.message.error(err.error.message, { nzDuration: 3000 });
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
