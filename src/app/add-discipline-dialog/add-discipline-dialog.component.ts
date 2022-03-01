import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-discipline-dialog',
  templateUrl: './add-discipline-dialog.component.html',
  styleUrls: ['./add-discipline-dialog.component.scss']
})
export class AddDisciplineDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void { }

}
