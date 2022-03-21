import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preference } from '../models/preference.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-preferences',
  templateUrl: './discipline-preferences.component.html',
  styleUrls: ['./discipline-preferences.component.scss']
})
export class DisciplinePreferencesComponent implements OnInit, OnChanges {
  @Input() discipline;
  @Output() updateDetails = new EventEmitter<boolean>();
  viableTimetables = [];

  hasSelectedPreferences = false;
  wasPressed = false;
  
  preferencesForm = new FormGroup({
    options: new FormArray([])
  });

  get dynamicOptions() {
    return this.preferencesForm.controls['options'] as FormArray;
  }

  addOptionForm() {
    const optionForm = new FormGroup({
      option: new FormControl('', Validators.required),
    })
    this.dynamicOptions.push(optionForm);
  }

  updateOptionForm(value: string) {
    const optionForm = new FormGroup({
      option: new FormControl(value),
    })
    this.dynamicOptions.push(optionForm);
  }

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viableTimetables = [this.discipline.timetable];
    this.apiService.getUserPreferenceByDiscipline(this.discipline._id)
      .subscribe(
        (response) => {
          const res = response as Preference;
          if(!!res) {
            this.hasSelectedPreferences = true;
            this.dynamicOptions.clear();
            res.options.forEach(option => this.updateOptionForm(option));
            return;
          }
          this.initializeDisciplineOptions();
        },
        (error) => {
          console.log(error)
        }
      );
  }

  initializeDisciplineOptions() {
    this.dynamicOptions.clear();
    this.discipline.timetable.forEach(() => {
      this.addOptionForm();
    });
  }

  addUserPreference(disciplineID: string, userOptions: string[]) {
    this.apiService.addUserPreference(disciplineID, userOptions)
    .subscribe(
      (response) => {
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editUserPreference(disciplineID: string, options: string[]) {
    this.apiService.updateUserDisciplinePreference(disciplineID, options)
      .subscribe(
        (response) => {
          this.snackBar.open(`${response}`, 'Close', {
            duration: 2000
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(
      (timetable) => timetable.option === option
    ).students.length;
  }

  getStudentOption() {
    const userID = sessionStorage.getItem('userID');
    return this.discipline.timetable.find(
      (timetable) => timetable.students.find(student => student === userID)
    );
  }

  submit() {
    let userOptions: string[] = [];
    this.dynamicOptions.value.forEach(element => userOptions.push(element.option));
    this.wasPressed = true;
    if(!this.hasSelectedPreferences) {
      this.addUserPreference(this.discipline._id, userOptions);
      return;
    }
    this.editUserPreference(this.discipline._id, userOptions);
  }

  sendPreference() {
    this.apiService.insertUserOptionOnDiscipline(this.discipline._id).subscribe(
      (response) => {
        this.updateDetails.emit(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetPreferences() {
    this.apiService.resetDisciplinePreferences(this.discipline._id).subscribe(
      (response) => {
        this.updateDetails.emit(true);
        this.snackBar.open(`${response}`, 'Close', {
          duration: 2000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isSentOptionDisabled() {
    return this.wasPressed ? false : true;
  }

  isResetDisabled() {
    return this.getStudentOption() ? false : true;
  }
}
