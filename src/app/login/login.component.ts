import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private apiService: ApiService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email_id: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.apiService.loginAdmin(this.loginForm.value).subscribe(res => {
        this.openSnackBar('LogIn Success', 'green-snackbar');
        localStorage.setItem('token', res?.token);
        this.router.navigateByUrl('/users')
      }, err => {
        console.log(err)
        this.openSnackBar('LogIn Failed', 'red-snackbar');
      })
    }
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

}
