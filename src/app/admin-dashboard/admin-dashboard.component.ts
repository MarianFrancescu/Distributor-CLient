import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { AdminAddDisciplineDialogComponent } from '../admin-add-discipline-dialog/admin-add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selected: Discipline;
  mockDisciplines = mockedDisciplines;
  disciplines: Discipline[];
  myDataSource: MatTableDataSource<Discipline>;
  update = new BehaviorSubject<boolean>(false);
  
  constructor(private dialog: MatDialog,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchDisciplines();
    this.update.subscribe((update) =>
      update === true ? this.fetchDisciplines() : ''
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddDisciplineDialogComponent, {
      width: '450px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let discipline: Discipline= {
          studyInstitution: result.institution.institution,
          faculty: result.faculty.faculty,
          department: result.department,
          studyYear: result.year,
          name: result.name,
          teacher: result.teacher,
          _id: '',
          created: '',
          timetable: []
        };
        console.log(discipline)

        this.addDiscipline(result.name, result.teacher, result.institution.institution, result.faculty.faculty, result.department, result.year);
      }
      console.log('The dialog was closed', result);
    });
  }
  
  makeTable() {
    this.myDataSource = new MatTableDataSource<Discipline>(
      this.disciplines
    );
  }

  addDiscipline(
    name: string,
    teacher: string,
    studyInstitution: string,
    faculty: string,
    department: string,
    studyYear: string
  ) {
    const subscription = this.apiService.addDiscipline(name, teacher, studyInstitution, faculty, department, studyYear);
    subscription.subscribe(() => {
      this.update.next(true);
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

}
