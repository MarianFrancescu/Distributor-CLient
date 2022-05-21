import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplineDialogComponent } from '../add-discipline-dialog/add-discipline-dialog.component';
import { Discipline } from '../models/discipline.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  selected: string;

  disciplines = [];
  dbDisciplines: Discipline[];
  userDisciplines: Discipline[];
  update = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
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

  getDisciplineInitials(disciplineName: string) {
    const copyString = disciplineName.replace(' a ' , ' ').replace(' cu ', ' ').replace(' si ', ' ');
    let match = copyString.match(/\b(\w)/g);
    return match.join('');
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToDiscipline(discipline: Discipline) {
    this.router.navigate(['/discipline', discipline._id]);
  }

  unenrollUser(disciplineId: string, e: Event) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Unenroll from discipline',
        question: 'Are you sure you want to unenroll from this discipline?',
        message: 'This action will delete your enrollment from that discipline'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.unenrollFromDiscipline(disciplineId).subscribe(
          (response) => {
            this.update.next(true);
            this.snackBar.open(`${response}`, 'Close', {
              duration: 2000
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    e.stopPropagation();
  }
}
