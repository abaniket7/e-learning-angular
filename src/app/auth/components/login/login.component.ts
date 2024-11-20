import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Validators for email
      password: [null, Validators.required], // Validators for password
    });
  }

  // Helper function to check if a form field is invalid and touched
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          this.message.success('Login successful', { nzDuration: 2000 });

          const user = {
            userId: res.userId, // Explicitly use `userId` here
            role: res.userRole,
          };
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);

          // Log the role to verify it matches the expected values
          console.log('Saved user role:', StorageService.getUser().role);

          // Attempt navigation based on role
          if (StorageService.isAdminLoggedIn()) {
            console.log('Navigating to /admin/dashboard');
            this.router.navigateByUrl('/admin/dashboard').then((navigated) => {
              console.log('Admin navigation success:', navigated);
            });
          } else if (StorageService.isUserLoggedIn()) {
            console.log('Navigating to /user/dashboard');
            this.router.navigateByUrl('/user/dashboard').then((navigated) => {
              console.log('User navigation success:', navigated);
            });
          } else {
            this.message.error('Bad Credentials.', { nzDuration: 2000 });
          }
        },
        error: (err) => {
          console.error('Login error', err);
          if (
            err.error &&
            err.error.message === 'Incorrect email or password.'
          ) {
            this.message.error(
              'Incorrect email or password. Please try again.',
              { nzDuration: 3000 }
            );
          } else if (err.error && err.error.message === 'User not found.') {
            this.message.error('User not found. Please check your email.', {
              nzDuration: 3000,
            });
          } else {
            this.message.error('Login failed. Please try again.', {
              nzDuration: 3000,
            });
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.message.error('Please fill out the form correctly.', {
        nzDuration: 3000,
      });
    }
  }
}
