import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-card-dialog',
  templateUrl: './student-card-dialog.component.html',
  styleUrls: ['./student-card-dialog.component.scss']
})
export class StudentCardDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {}
}
