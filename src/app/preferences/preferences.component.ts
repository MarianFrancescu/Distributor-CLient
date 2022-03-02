import { Component, OnInit } from '@angular/core';
import { mockedDisciplines } from '../mock-data/disciplines.mock';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  disciplines = mockedDisciplines;

  constructor() { }

  ngOnInit(): void {
  }

}
