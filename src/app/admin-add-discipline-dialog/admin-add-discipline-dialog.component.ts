import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockedInstitutions } from '../mock-data/institutions.mock';

@Component({
  selector: 'app-admin-add-discipline-dialog',
  templateUrl: './admin-add-discipline-dialog.component.html',
  styleUrls: ['./admin-add-discipline-dialog.component.scss']
})
export class AdminAddDisciplineDialogComponent implements OnInit {

  years = ['1', '2', '3', '4', '5', '6'];
  institutions = mockedInstitutions;
  detailsFormGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.detailsFormGroup = this._formBuilder.group({
      disciplineDetails: ['', Validators.required],
    });
  }

  sendData() {
    this.data.selected.teacher = this.detailsFormGroup.controls.disciplineDetails.value;
    return this.data.selected;
    // console.log('firstForm: ', this.basicFormGroup.controls.disciplineBasic.value);
    // console.log('secondForm: ', this.detailsFormGroup.controls.disciplineDetails.value);
  }

}
