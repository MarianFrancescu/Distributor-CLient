import { Component, OnInit } from '@angular/core';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  tabOption: Discipline;
  userDisciplines: Discipline[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchDisciplines();
  }

  selectDiscipline(discipline: Discipline) {
    this.tabOption = discipline;
  }

  fetchDisciplines() {
    this.apiService.getUserDisciplines().subscribe(
      (response) => {
        const res = response as Discipline[];
        this.userDisciplines = [...res];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
