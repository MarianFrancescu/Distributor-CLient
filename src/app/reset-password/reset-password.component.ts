import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hideFlag1 = true;
  hideFlag2 = true;

  resetPasswordForm: FormGroup;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.resetPasswordForm= new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('')
    }, {validators: this.checkPasswords});
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  getPasswordErrorMessage() {
    if (this.resetPasswordForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    return this.resetPasswordForm.controls.password.hasError('minLength')
      ? ''
      : 'Password must have more than 6 characters';
  }

  // TODO: Fix error with matching password here and also in register component
  getConfirmPasswordError() {
    if (this.resetPasswordForm.controls.confirmPassword.hasError('required')) {
      return 'Please re-enter your password';
    }
    if(this.resetPasswordForm.hasError('notSame'))
      return 'The passwords do not match';
  }

  submit() {
    this.apiService
      .updateUserPassword(
        this.resetPasswordForm.controls.password.value as string
      )
      .subscribe(
        (response) => {
          this.resetPasswordForm.reset();
          this.snackBar.open(`${response}`, 'Close', {
            duration: 2000
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
