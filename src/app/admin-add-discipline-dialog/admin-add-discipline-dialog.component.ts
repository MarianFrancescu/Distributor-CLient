import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockedInstitutions } from '../mock-data/institutions.mock';

@Component({
  selector: 'app-admin-add-discipline-dialog',
  templateUrl: './admin-add-discipline-dialog.component.html',
  styleUrls: ['./admin-add-discipline-dialog.component.scss']
})
export class AdminAddDisciplineDialogComponent implements OnInit {

  years = ['1', '2', '3', '4', '5', '6'];
  institutions = mockedInstitutions;
  
  disciplineDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    studyInstitution: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    studyYear:  new FormControl('', Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
              private dialogRef: MatDialogRef<AdminAddDisciplineDialogComponent>) { }

  ngOnInit(): void {
  }

  getStudyInstitution(institutionName) { 
    const selected = this.institutions.find(institution => institution.institution === institutionName);
    return selected;
  }

  getFaculty(institutionName, facultyName) {
    const selectedInstitution = this.institutions.find(institution => institution.institution === institutionName);
    const selectedFaculty = selectedInstitution?.faculties.find(faculty => faculty.faculty === facultyName);
    return selectedFaculty;
  }

  sendData() {
    this.dialogRef.close(this.disciplineDetailsForm.value);
  }

}
