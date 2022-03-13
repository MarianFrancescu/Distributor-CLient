import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  hideFlag = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit() {
    this.apiService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .subscribe(
        (response) => {
          const res = response as any;
          sessionStorage.clear();
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('userID', res.userID);
          sessionStorage.setItem('role', res.role);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.loginForm.reset();
          this.snackBar.open(
            `Oops! Something went wrong! ${error.error}`,
            'Close'
          );
        }
      );
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
