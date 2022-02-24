import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(public deleteDialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openDialog() {
    const dialogRef = this.deleteDialog.open(AlertDialogComponent, {
      data: {title: "Delete account", question: "Are you sure you want to delete account?", message: "Yesyeseyes"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
