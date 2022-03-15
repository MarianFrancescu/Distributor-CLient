import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { mockedInstitutions } from '../mock-data/institutions.mock';
import { Discipline } from '../models/discipline.interface';
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
  institution: any;
  faculty: any;
  years = ['1', '2', '3', '4', '5', '6'];

  disciplineDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    studyInstitution: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    studyYear:  new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDiscipline();
    this.fetchDisciplineForm();
    console.log(this.disciplineDetailsForm.value)
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

  submit() {
    console.log(this.disciplineDetailsForm)
  }
}
