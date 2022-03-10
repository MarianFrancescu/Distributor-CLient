import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplineDialogComponent } from '../add-discipline-dialog/add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  selected: string;

  mockDisciplines = mockedDisciplines;
  disciplines = [];
  myDataSource: MatTableDataSource<Discipline>;
  dbDisciplines: Discipline[];
  userDisciplines: Discipline[];
  update = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDisciplineDialogComponent, {
      width: '450px',
      data: { disciplines: this.dbDisciplines, selected: this.selected }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.enrollUser(result._id);
      }
      console.log('The dialog was closed', this.userDisciplines);
    });
  }

  ngOnInit(): void {
    this.apiService.getSpecificDisciplines().subscribe((response) => {
      this.dbDisciplines = response as Discipline[];
    });

    this.fetchDisciplines();
    this.update.subscribe((update) =>
      update === true ? this.fetchDisciplines() : ''
    );
  }

  enrollUser(disciplineId: string) {
    const subscription = this.apiService.enrollToDiscipline(disciplineId);
    subscription.subscribe(() => {
      this.update.next(true);
    });
  }

  fetchDisciplines() {
    this.apiService.getUserDisciplines().subscribe(
      (response) => {
        const res = response as Discipline[];
        this.userDisciplines = [...res];
        this.makeTable();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  makeTable() {
    this.myDataSource = new MatTableDataSource<Discipline>(
      this.userDisciplines
    );
  }

  getSelectedRow(discipline: Discipline) {
    this.router.navigate(['/discipline', discipline._id]);
  }

  unenrollUser(disciplineId: string, e: Event) {
    const subscription = this.apiService.unenrollFromDiscipline(disciplineId);
    subscription.subscribe(() => {
      this.update.next(true);
    });
    e.stopPropagation();
  }
}
