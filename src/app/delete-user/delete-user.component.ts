import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public deleteDialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.deleteDialog.open(AlertDialogComponent, {
      data: {
        title: 'Delete account',
        question: 'Are you sure you want to delete account?',
        message: 'This action is irrevocable'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.apiService.deleteAccount().subscribe(() => {
          sessionStorage.clear();
          this.router.navigate(['/login']);
          this.snackBar.open('Your account was deleted', 'Close', {
            duration: 2000
          });
        });
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
