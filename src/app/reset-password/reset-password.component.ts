import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hideFlag: boolean = true;

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  getPasswordErrorMessage() {
    if (this.resetPasswordForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    return this.resetPasswordForm.controls.password.hasError('minLength') ? '' : 'Password must have more than 6 characters';
  }

  getConfirmPasswordError() {
    if(this.resetPasswordForm.controls.confirmPassword.hasError('required')){
      return 'Please re-enter your password';
    }
    return this.resetPasswordForm.controls.password === this.resetPasswordForm.controls.confirmPassword ? 
            '' : 'The passwords do not match'
  }

  submit() {
    console.log('reset-password component', this.resetPasswordForm.value);
  }

}
