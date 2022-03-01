import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplineDialogComponent } from '../add-discipline-dialog/add-discipline-dialog.component';
import { mockedDisciplines } from '../mock-data/disciplines.mock';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  animal: string;
  selected: string;

  mockDisciplines = mockedDisciplines;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDisciplineDialogComponent, {
      width: '450px',
      data: {animal: this.animal, disciplines: this.mockDisciplines, selected: this.selected},
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.animal = result;
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit(): void {
  }

}
