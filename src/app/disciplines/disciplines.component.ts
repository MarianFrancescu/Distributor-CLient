import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplineDialogComponent } from '../add-discipline-dialog/add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  selected: string;

  mockDisciplines = mockedDisciplines;
  disciplines =[];
  myDataSource: MatTableDataSource<Discipline>;
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDisciplineDialogComponent, {
      width: '450px',
      data: { disciplines: this.mockDisciplines, selected: this.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      { 
        this.disciplines.push(result);
        this.disciplines = [...this.disciplines];
        this.makeTable();
      }
      console.log('The dialog was closed', this.disciplines);
    });
  }

  ngOnInit(): void {
    this.myDataSource = new MatTableDataSource<Discipline>(this.disciplines);
  }

  makeTable() {
    this.myDataSource = new MatTableDataSource<Discipline>(this.disciplines);
  }

  getSelectedRow(discipline: Discipline) {
    this.router.navigate(['/discipline', discipline.disciplineId]);
  }

}
