import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  submit() {
    this.resetUserPassword();
  }

  resetUserPassword() {
    const userEmail = this.passwordForm.controls['email'].value;
    this.apiService.resetUserPassword(userEmail).subscribe(
      (response) => {
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmailErrorMessage() {
    if (this.passwordForm.controls.email.hasError('required')) {
      return 'Please enter your email';
    }

    return this.passwordForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
