import { Component, OnInit } from '@angular/core';
import { mockedDisciplines } from '../mock-data/disciplines.mock';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {

  mockDisciplines = mockedDisciplines;
  constructor() { }

  ngOnInit(): void {
  }

}
