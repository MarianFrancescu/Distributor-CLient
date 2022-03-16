import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { mockedInstitutions } from '../mock-data/institutions.mock';
import { Discipline } from '../models/discipline.interface';
import { Faculty, Institution } from '../models/institution.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-edit-discipline',
  templateUrl: './admin-edit-discipline.component.html',
  styleUrls: ['./admin-edit-discipline.component.scss']
})
export class AdminEditDisciplineComponent implements OnInit {
  mockDisciplines = mockedDisciplines;
  discipline: Discipline;
  selectedOption = '14-16';
  institutions = mockedInstitutions;
  selectedInstitution: Institution;
  selectedFaculty: Faculty;
  faculty: any;
  years = ['1', '2', '3', '4', '5', '6'];
  update = new BehaviorSubject<boolean>(false);

  disciplineDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    studyInstitution: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    studyYear:  new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getDiscipline();
    // this.fetchDisciplineForm();
    this.update.subscribe((update) =>
      update === true ? this.getDiscipline() : ''
    );
  }

  fetchDisciplineForm() {
    if (this.discipline) {
      this.disciplineDetailsForm.patchValue({
        name: this.discipline.name,
        teacher: this.discipline.teacher,
        studyInstitution: this.discipline.studyInstitution,
        faculty: this.discipline.faculty,
        department: this.discipline.department,
        studyYear: this.discipline.studyYear
      });
    }
  }

  getDiscipline() {
    const disciplineId = this.route.snapshot.paramMap.get('id');
    this.apiService.getDiscipline(disciplineId).subscribe(
      (response) => {
        this.discipline = response as Discipline;
        this.fetchDisciplineForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(
      (timetable) => timetable.option === option
    ).students.length;
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

  submit() {
    const updatedDisciplineDetails = {} as Discipline;
    const disciplineId = this.route.snapshot.paramMap.get('id');

    if (this.disciplineDetailsForm.controls.name.touched) {
      updatedDisciplineDetails.name = this.disciplineDetailsForm.controls.name.value;
    }
    if (this.disciplineDetailsForm.controls.teacher.touched) {
      updatedDisciplineDetails.teacher = this.disciplineDetailsForm.controls.teacher.value;
    }
    if (this.disciplineDetailsForm.controls.studyInstitution.touched) {
      updatedDisciplineDetails.studyInstitution =
        this.disciplineDetailsForm.controls.studyInstitution.value;
    }
    if (this.disciplineDetailsForm.controls.faculty.touched) {
      updatedDisciplineDetails.faculty = this.disciplineDetailsForm.controls.faculty.value;
    }
    if (this.disciplineDetailsForm.controls.department.touched) {
      updatedDisciplineDetails.department = this.disciplineDetailsForm.controls.department.value;
    }
    if (this.disciplineDetailsForm.controls.studyYear.touched) {
      updatedDisciplineDetails.studyYear = this.disciplineDetailsForm.controls.studyYear.value;
    }
    this.apiService.updateDiscipline(disciplineId, updatedDisciplineDetails).subscribe(
      (response) => {
        this.update.next(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
        
      },
      (error) => {
        this.disciplineDetailsForm.reset();
      }
    );
  }
}
