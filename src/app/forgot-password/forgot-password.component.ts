import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('User registered');
  }

  getEmailErrorMessage() {
    if (this.passwordForm.controls.email.hasError('required')) {
      return 'Please enter your email';
    }

    return this.passwordForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  
}
