import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Institution } from '../models/institution.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-add-discipline-dialog',
  templateUrl: './admin-add-discipline-dialog.component.html',
  styleUrls: ['./admin-add-discipline-dialog.component.scss']
})
export class AdminAddDisciplineDialogComponent implements OnInit {

  years = ['1', '2', '3', '4', '5', '6'];
  institutions: Institution[];

  disciplineDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    studyInstitution: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    studyYear:  new FormControl('', Validators.required),
    maxNoOfStudentsPerTimetable: new FormControl('', Validators.required),
    timetable: new FormArray([])
  });

  get dynamicTimetable() {
    return this.disciplineDetailsForm.controls['timetable'] as FormArray;
  }

  addTimetable() {
    const timetableForm = new FormGroup({
      option: new FormControl(''),
      //assistent teacher name could be another control
    })
    this.dynamicTimetable.push(timetableForm);
  }

  deleteTimetable(optionIndex: number) {
    this.dynamicTimetable.removeAt(optionIndex);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
              private dialogRef: MatDialogRef<AdminAddDisciplineDialogComponent>,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchInstitutions();
  }

  fetchInstitutions() {
    this.apiService.getIntitutions().subscribe(result => {
      const res = result as Institution[];
      this.institutions = [...res];
    })
  }

  getStudyInstitution(institutionName) { 
    const selected = this.institutions?.find(institution => institution.studyInstitution === institutionName);
    return selected;
  }

  getFaculty(institutionName, facultyName) {
    const selectedInstitution = this.institutions?.find(institution => institution.studyInstitution === institutionName);
    const selectedFaculty = selectedInstitution?.faculties.find(faculty => faculty.faculty === facultyName);
    return selectedFaculty;
  }

  sendData() {
    // setTimeout(() => {
    //     this.dialogRef.close(this.disciplineDetailsForm.value);
    //   }, 1000);
    this.dialogRef.close(this.disciplineDetailsForm.value);
  }

}
