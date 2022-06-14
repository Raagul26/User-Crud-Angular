import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.sass']
})
export class CreateEditComponent implements OnInit {

  createEditForm!: FormGroup
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userId!: string;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.createEditForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
      email_id: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]),
      // job: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

    if (this.router.url.split('/')[1] === 'update') {

      this.apiService.getUser(this.userId).subscribe((res:any) => {

        this.createEditForm = new FormGroup({
          first_name: new FormControl(res.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
          last_name: new FormControl(res.last_name, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
          email_id: new FormControl(res.email_id, [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)]),
          // job: new FormControl('', [Validators.required, Validators.minLength(5)])
        })

      });
    
    }
  }

  createEdit() {
    console.log(this.userId)
    if (this.userId && this.createEditForm.valid) {
      this.apiService.updateUser(this.userId, this.createEditForm.value).subscribe(_ => {
        this.openSnackBar('User Updated Successfully', 'green-snackbar');
        this.router.navigateByUrl('/users');
      }, err => {
        console.log(err)
      })
    } else if (this.router.url === '/create' && this.createEditForm.valid) {
      this.apiService.createUser(this.createEditForm.value).subscribe(_ => {
        this.openSnackBar('User Created Successfully', 'green-snackbar');
        this.router.navigateByUrl('/users');
      }, err => {
        console.log(err)
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
