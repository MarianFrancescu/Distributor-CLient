import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hideFlag: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('User registered');
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Please enter your email';
    }

    return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    return this.registerForm.controls.password.hasError('minLength') ? '' : 'Password must have more than 6 characters';
  }

  getConfirmPasswordError() {
    if(this.registerForm.controls.confirmPassword.hasError('required')){
      return 'Please re-enter your password';
    }
    return this.registerForm.controls.password === this.registerForm.controls.confirmPassword ? 
            '' : 'The passwords do not match'
  }

}
