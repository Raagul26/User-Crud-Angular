import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users!: any[]
  usersList: any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private apiService: ApiService, private dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.users = res;
      this.usersList = this.users
    }, (err) => {
      console.log(err)
    })
  }

  createUser() {
    this.router.navigateByUrl('/create');
  }

  editUser(userId: string) {
    this.router.navigateByUrl(`update/${userId}`);
  }

  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.apiService.deleteUser(userId).subscribe(_ => {
          this.openSnackBar('User Deleted Successfully', 'green-snackbar')
        })
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  filterTable(searchValue: string): void {
    searchValue = searchValue.toLowerCase()
    this.usersList = this.users.filter((val: any) => {
      return val.id.toString().includes(searchValue) || 
      val.first_name.toLowerCase().includes(searchValue) || 
      val.last_name.toLowerCase().includes(searchValue) ||
      `${val.first_name} ${val.last_name}`.toLowerCase().includes(searchValue) ||
      `${val.first_name}${val.last_name}`.toLowerCase().includes(searchValue) ||
      val.email_id.toLowerCase().includes(searchValue);
    })
  }

}
