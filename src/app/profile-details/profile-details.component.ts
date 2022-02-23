import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  detailsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    studyInstitution: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    studyYear: new FormControl('', [Validators.required])
  });

  hideFlag: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('User details updated');
  }

  getEmailErrorMessage() {
    if (this.detailsForm.controls.email.hasError('required')) {
      return 'Please enter your email';
    }

    return this.detailsForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.detailsForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    return this.detailsForm.controls.password.hasError('minLength') ? '' : 'Password must have more than 6 characters';
  }

}
