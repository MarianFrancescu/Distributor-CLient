import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-details',
  templateUrl: './discipline-details.component.html',
  styleUrls: ['./discipline-details.component.scss']
})
export class DisciplineDetailsComponent implements OnInit {

  mockDisciplines = mockedDisciplines;
  discipline: Discipline;
  selectedOption = '14-16';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
     this.getDiscipline();
  }

  getDiscipline(){
    let disciplineId = this.route.snapshot.paramMap.get('id');
    this.apiService.getDiscipline(disciplineId).subscribe(
      response => {
        this.discipline = response as Discipline;
      },
      error => {
        console.log(error);
      }
    )
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(timetable => timetable.option === option).students.length;
  }

}
