import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  hideFlag = true;

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  submit() {
    console.log('User registered');
    this.apiService
      .register(
        this.registerForm.get('email').value,
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('password').value
      )
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.snackBar.open(`${response}`, 'Close', {
            duration: 2000
          });
        },
        (error) => {
          this.registerForm.reset();
        }
      );
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Please enter your email';
    }

    return this.registerForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    return this.registerForm.controls.password.hasError('minLength')
      ? ''
      : 'Password must have more than 6 characters';
  }

  getConfirmPasswordError() {
    if (this.registerForm.controls.confirmPassword.hasError('required')) {
      return 'Please re-enter your password';
    }
    return this.registerForm.controls.password ===
      this.registerForm.controls.confirmPassword
      ? ''
      : 'The passwords do not match';
  }
}
