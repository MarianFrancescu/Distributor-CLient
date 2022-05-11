import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-discipline-dialog',
  templateUrl: './add-discipline-dialog.component.html',
  styleUrls: ['./add-discipline-dialog.component.scss']
})
export class AddDisciplineDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  isDisabled() {
    return this.data.selected ? false : true;
  }
}
