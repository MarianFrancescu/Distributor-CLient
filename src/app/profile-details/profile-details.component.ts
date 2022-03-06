import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnChanges {

  @Input() userDetails: User;
  selectedValue: string;

  institutions = ['Universitatea Politehnica Timisoara', 'Universitatea de Vest Timisoara'];
  faculties = ['Automatica si Calculatoare', 'Telecomunicatii'];
  departments = ['Calculatoare si tehnologia informatiei', 'Ingineria Sistemelor'];
  years = ['1', '2', '3', '4', '5', '6'];

  detailsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    studyInstitution: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    studyYear: new FormControl('', [Validators.required])
  });

  hideFlag: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.userDetails) {
      this.detailsForm.patchValue({
        email: this.userDetails.email,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        registrationNumber: this.userDetails.registrationNumber,
        studyInstitution: this.userDetails.studyInstitution,
        faculty: this.userDetails.faculty,
        department: this.userDetails.department,
        studyYear: this.userDetails.studyYear
      });
    }
  }

  submit(){
    console.log(this.detailsForm.controls)
    this.apiService.updateUser(this.userDetails._id, this.detailsForm.value)
          .subscribe(response => {
            console.log(response);
          },
          error => {
            console.log(error)
            // this.detailsForm.reset();
          });
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
