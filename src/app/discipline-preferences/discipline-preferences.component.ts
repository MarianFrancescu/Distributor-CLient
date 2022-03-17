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
    option1: new FormControl('', Validators.required)
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.viableTimetables = [this.discipline.timetable]
    console.log(this.viableTimetables);
    // this.preferencesForm = new FormGroup({
      
    // })
  }

  submit() {
    console.log('Added user preferences', this.preferencesForm.value);
  }
}
