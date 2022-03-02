import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discipline-preferences',
  templateUrl: './discipline-preferences.component.html',
  styleUrls: ['./discipline-preferences.component.scss']
})
export class DisciplinePreferencesComponent implements OnInit {

  disciplinePreferences = [{index: '1', value: 'Mon 18-20'}, {index: '2', value: 'Mon 18-20'}];

  preferencesForm = new FormGroup({
    option1: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('User details updated', this.preferencesForm.value);
  }

}
