import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';

@Component({
  selector: 'app-discipline-details',
  templateUrl: './discipline-details.component.html',
  styleUrls: ['./discipline-details.component.scss']
})
export class DisciplineDetailsComponent implements OnInit {

  mockDisciplines = mockedDisciplines;
  discipline: Discipline;
  selectedOption = '14-16';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.discipline = this.getDiscipline();
  }

  getDiscipline(){
    let disciplineId = this.route.snapshot.paramMap.get('id');
    return this.mockDisciplines.find(discipline => discipline._id === disciplineId)
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(timetable => timetable.option === option).students.length;
  }

}
