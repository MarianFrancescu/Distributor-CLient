import { Component, OnInit } from '@angular/core';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  tabOption: Discipline;
  disciplines = mockedDisciplines;

  constructor() {}

  ngOnInit(): void {}

  selectDiscipline(discipline: Discipline) {
    this.tabOption = discipline;
  }
}
