import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Preference } from '../models/preference.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-preferences',
  templateUrl: './discipline-preferences.component.html',
  styleUrls: ['./discipline-preferences.component.scss']
})
export class DisciplinePreferencesComponent implements OnInit, OnChanges {
  @Input() discipline;
  viableTimetables = [];

  hasSelectedPreferences = false;

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
          }
          this.initializeDisciplineOptions();
          
        },
        (error) => {
          console.log(error)
        }
      )
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
    console.log("editing preferences");
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

  submit() {
    // console.log('Added user preferences', this.preferencesForm.value);
    let userPreference: Preference;
    let userOptions: string[] = [];
    this.dynamicOptions.value.forEach(element => userOptions.push(element.option.option));
    if(!this.hasSelectedPreferences) {
      this.addUserPreference(this.discipline._id, userOptions);
    }
    this.editUserPreference(this.discipline._id, userOptions);
  }
}
