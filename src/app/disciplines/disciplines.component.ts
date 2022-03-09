import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplineDialogComponent } from '../add-discipline-dialog/add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';
import { Discipline } from '../models/discipline.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

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
  constructor(public dialog: MatDialog, 
              private router: Router, 
              private apiService: ApiService,
              private route: ActivatedRoute) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDisciplineDialogComponent, {
      width: '450px',
      data: { disciplines: this.dbDisciplines, selected: this.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      { 
        // this.disciplines.push(result);
        // this.disciplines = [...this.disciplines];
        // this.enrollUser()
        this.enrollUser(result._id);
        this.fetchDisciplines();
      }
      console.log('The dialog was closed', this.userDisciplines);
    });
  }

  ngOnInit(): void {
    
    this.apiService.getSpecificDisciplines().subscribe(response => {
      this.dbDisciplines = response as Discipline[];
      console.log(this.dbDisciplines)
    });
    this.fetchDisciplines();
  }

  enrollUser(disciplineId: string){
    this.apiService.enrollToDiscipline(disciplineId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  fetchDisciplines() {
    this.apiService.getUserDisciplines().subscribe(
      response => {
        let res = response as Discipline[];
        this.userDisciplines = [...res];
        this.makeTable();
      },
      error => {
        console.log(error)
      });
  }

  makeTable() {
    this.myDataSource = new MatTableDataSource<Discipline>(this.userDisciplines);
  }

  getSelectedRow(discipline: Discipline) {
    this.router.navigate(['/discipline', discipline._id]);
  }

}
