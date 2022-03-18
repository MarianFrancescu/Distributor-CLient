import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-preferences',
  templateUrl: './discipline-preferences.component.html',
  styleUrls: ['./discipline-preferences.component.scss']
})
export class DisciplinePreferencesComponent implements OnInit, OnChanges {
  @Input() discipline;
  viableTimetables = [];

  disciplinePreferences = [
    { index: '1', value: 'Mon 18-20' },
    { index: '2', value: 'Mon 18-20' }
  ];

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viableTimetables = [this.discipline.timetable];
    this.initializeDisciplineOptions();
  }

  initializeDisciplineOptions() {
    this.dynamicOptions.clear();
    this.discipline.timetable.forEach(() => {
      this.addOptionForm();
    });
  }

  submit() {
    // console.log('Added user preferences', this.preferencesForm.value);
    let userOptions: string[] = [];
    this.dynamicOptions.value.forEach(element => userOptions.push(element.option.option));
    this.apiService.addUserPreference(this.discipline._id, userOptions)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
