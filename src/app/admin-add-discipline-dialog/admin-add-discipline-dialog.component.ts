import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-discipline-dialog',
  templateUrl: './admin-add-discipline-dialog.component.html',
  styleUrls: ['./admin-add-discipline-dialog.component.scss']
})
export class AdminAddDisciplineDialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

}
