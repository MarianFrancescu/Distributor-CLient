import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAddDisciplineDialogComponent } from '../admin-add-discipline-dialog/admin-add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selected: any;
  mockDisciplines = mockedDisciplines;
  disciplines = [];
  myDataSource: MatTableDataSource<Discipline>;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.myDataSource = new MatTableDataSource<Discipline>(
      mockedDisciplines
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddDisciplineDialogComponent, {
      width: '450px',
      data: { disciplines: this.mockDisciplines, selected: this.selected }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //add that discipline
      }
      console.log('The dialog was closed', this.mockDisciplines);
    });
  }

}
