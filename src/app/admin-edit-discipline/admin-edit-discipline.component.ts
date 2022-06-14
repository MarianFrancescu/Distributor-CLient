import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Discipline } from '../models/discipline.interface';
import { Faculty, Institution } from '../models/institution.interface';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { StudentCardDialogComponent } from '../student-card-dialog/student-card-dialog.component';
import { StudentsCardComponent } from '../students-card/students-card.component';

@Component({
  selector: 'app-admin-edit-discipline',
  templateUrl: './admin-edit-discipline.component.html',
  styleUrls: ['./admin-edit-discipline.component.scss']
})
export class AdminEditDisciplineComponent implements OnInit {
  discipline: Discipline;
  users: User[];
  selectedOption = '14-16';
  institutions: Institution[];
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
    studyYear: new FormControl('', Validators.required),
    maxNoOfStudentsPerTimetable: new FormControl('', Validators.required),
    timetable: new FormArray([])
  });

  get dynamicTimetable() {
    return this.disciplineDetailsForm.controls['timetable'] as FormArray;
  }

  addTimetable() {
    const timetableForm = new FormGroup({
      option: new FormControl('')
    });
    this.dynamicTimetable.push(timetableForm);
  }

  updateTimetableForm(value: string) {
    const timetableForm = new FormGroup({
      option: new FormControl(value)
    });
    this.dynamicTimetable.push(timetableForm);
  }

  deleteTimetable(optionIndex: number) {
    this.dynamicTimetable.removeAt(optionIndex);
    this.dynamicTimetable.markAsTouched();
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDiscipline();
    this.fetchInstitutions();
    this.getStudents();
    this.update.subscribe((update) =>
      update === true ? this.getDiscipline() : ''
    );
  }

  fetchInstitutions() {
    this.apiService.getIntitutions().subscribe((result) => {
      const res = result as Institution[];
      this.institutions = [...res];
    });
  }

  fetchDisciplineForm() {
    if (this.discipline) {
      this.disciplineDetailsForm.patchValue({
        name: this.discipline.name,
        teacher: this.discipline.teacher,
        studyInstitution: this.discipline.studyInstitution,
        faculty: this.discipline.faculty,
        department: this.discipline.department,
        studyYear: this.discipline.studyYear,
        maxNoOfStudentsPerTimetable: this.discipline.maxNoOfStudentsPerTimetable
      });

      this.update.subscribe((update) =>
        update === false ? this.updateTimetable() : ''
      );
    }
  }

  updateTimetable() {
    this.discipline.timetable.forEach((timetable) => {
      this.updateTimetableForm(timetable.option);
    });
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
    const selected = this.institutions?.find(
      (institution) => institution.studyInstitution === institutionName
    );
    return selected;
  }

  getFaculty(institutionName, facultyName) {
    const selectedInstitution = this.institutions?.find(
      (institution) => institution.studyInstitution === institutionName
    );
    const selectedFaculty = selectedInstitution?.faculties.find(
      (faculty) => faculty.faculty === facultyName
    );
    return selectedFaculty;
  }

  getStudents() {
    this.apiService.getUsers().subscribe((response) => {
      const res = response as User[];
      this.users = [...res];
    });
  }

  openDialog(optionIndex: string): void {
    const timetable = this.discipline.timetable.find(
      (element) => element.option === optionIndex
    );
    const dialogRef = this.dialog.open(StudentCardDialogComponent, {
      width: '350px',
      data: {
        timetable: timetable,
        discipline: this.discipline,
        users: this.users
      }
    });
  }

  getDisciplineInitials(disciplineName: string) {
    const copyString = disciplineName.replace(' a ' , ' ').replace(' cu ', ' ').replace(' si ', ' ');
    let match = copyString.match(/\b(\w)/g);
    return match.join('');
  }

  submit() {
    const updatedDisciplineDetails = {} as Discipline;
    const disciplineId = this.route.snapshot.paramMap.get('id');

    if (this.disciplineDetailsForm.controls.name.touched) {
      updatedDisciplineDetails.name =
        this.disciplineDetailsForm.controls.name.value;
    }
    if (this.disciplineDetailsForm.controls.teacher.touched) {
      updatedDisciplineDetails.teacher =
        this.disciplineDetailsForm.controls.teacher.value;
    }
    if (this.disciplineDetailsForm.controls.studyInstitution.touched) {
      updatedDisciplineDetails.studyInstitution =
        this.disciplineDetailsForm.controls.studyInstitution.value;
    }
    if (this.disciplineDetailsForm.controls.faculty.touched) {
      updatedDisciplineDetails.faculty =
        this.disciplineDetailsForm.controls.faculty.value;
    }
    if (this.disciplineDetailsForm.controls.department.touched) {
      updatedDisciplineDetails.department =
        this.disciplineDetailsForm.controls.department.value;
    }
    if (this.disciplineDetailsForm.controls.studyYear.touched) {
      updatedDisciplineDetails.studyYear =
        this.disciplineDetailsForm.controls.studyYear.value;
    }
    if (
      this.disciplineDetailsForm.controls.maxNoOfStudentsPerTimetable.touched
    ) {
      updatedDisciplineDetails.maxNoOfStudentsPerTimetable =
        this.disciplineDetailsForm.controls.maxNoOfStudentsPerTimetable.value;
    }
    if (this.dynamicTimetable.touched) {
      updatedDisciplineDetails.timetable = this.dynamicTimetable.value;
    }

    this.apiService
      .updateDiscipline(disciplineId, updatedDisciplineDetails)
      .subscribe(
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
    this.apiService
      .deletePreferencesByDiscipline(disciplineId)
      .subscribe((response) => console.log(response));
  }
}
