import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../models/discipline.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  tabOption: string;
  userDisciplines: Discipline[];
  mySubscription: any;
  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchDisciplines();
  }

  selectDiscipline(discipline: Discipline) {
    this.router.navigate(['view/discipline', discipline._id])
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

  updateDiscipline() {
    this.fetchDisciplines();
  }
}
