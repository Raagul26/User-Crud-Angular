import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  hide = true;
  confirmPasswordHide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private apiService: ApiService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email_id: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)])
    })
  }

  signup(): void {
    console.log(this.signupForm.value)
    this.apiService.registerAdmin(this.signupForm.value).subscribe(res => { this.openSnackBar('Account Created Successfully', 'green-snackbar'); this.router.navigateByUrl('/login') }, err => console.log(err))
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }
}
