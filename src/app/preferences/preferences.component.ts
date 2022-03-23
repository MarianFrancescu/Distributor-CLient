import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
  mode: string;
  openSidenav: boolean;
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  @ViewChild('sidenav') sidenav: MatSidenav;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getScreenWidth().subscribe(width => {
      if(width > 960) {
          this.mode = 'side';
          this.openSidenav = true;
        }
      if (width <= 960) {
        this.mode = 'over';
        this.openSidenav = false;
      }
    });
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
