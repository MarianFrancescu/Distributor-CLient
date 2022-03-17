import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdminAddDisciplineDialogComponent } from '../admin-add-discipline-dialog/admin-add-discipline-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  mockDisciplines = mockedDisciplines;
  disciplines: Discipline[];
  myDataSource: MatTableDataSource<Discipline>;
  update = new BehaviorSubject<boolean>(false);
  
  constructor(private dialog: MatDialog,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchDisciplines();
    this.update.subscribe((update) =>
      update === true ? this.fetchDisciplines() : ''
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddDisciplineDialogComponent, {
      width: '600px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let discipline: Discipline= {
          studyInstitution: result.studyInstitution,
          faculty: result.faculty,
          department: result.department,
          studyYear: result.studyYear,
          name: result.name,
          teacher: result.teacher,
          timetable:  result.timetable
        };
        this.addDiscipline(discipline);
      }
    });
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Delete discipline',
        question: 'Are you sure you want to delete this discipline?',
        message: 'This action will delete all details from that discipline'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.apiService.deleteAccount().subscribe(() => {
          this.snackBar.open('Discipline deleted', 'Close', {
            duration: 2000
          });
        });
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  
  makeTable() {
    this.myDataSource = new MatTableDataSource<Discipline>(
      this.disciplines
    );
  }

  addDiscipline(discipline: Discipline) {
    const subscription = this.apiService.addDiscipline(discipline);
    subscription.subscribe((response) => {
      this.update.next(true);
      this.snackBar.open(`${response}`, 'Close', {
        duration: 2000
      });
    });
  }

  fetchDisciplines() {
    this.apiService.getDisciplines().subscribe(
      (response) => {
        const res = response as Discipline[];
        this.disciplines = [...res];
        this.makeTable();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSelectedRow(discipline: Discipline) {
    this.router.navigate(['/discipline', discipline._id, 'edit']);
  }

  editDiscipline(disciplineId: string, e: Event) {
    this.router.navigate(['/discipline', disciplineId, 'edit']);
    e.stopPropagation();
  }

  deleteDiscipline(disciplineId: string, e: Event) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Delete discipline',
        question: 'Are you sure you want to delete this discipline?',
        message: 'This action will delete all details from that discipline'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteDiscipline(disciplineId).subscribe(
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
      console.log(`Dialog result: ${result}`);
    }); 
    e.stopPropagation();
  }

}
