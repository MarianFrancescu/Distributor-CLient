import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  addOption() {
    const optionForm = new FormGroup({
      option: new FormControl('', Validators.required),
    })
    this.dynamicOptions.push(optionForm);
  }

  constructor() {}

  ngOnInit(): void {
    this.discipline.timetable.forEach(element => {
      this.addOption()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viableTimetables = [this.discipline.timetable]
  }

  submit() {
    // console.log('Added user preferences', this.preferencesForm.value);
    console.log("User preferences ", this.dynamicOptions)
  }
}
