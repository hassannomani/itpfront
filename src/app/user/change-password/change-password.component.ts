import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { UserService } from 'src/app/services/user-service/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  paswordSubmit = new FormGroup({
    'username' : new FormControl('',[Validators.required]),
    'password' : new FormControl('',[Validators.required]),
    'newpassword' : new FormControl('',[Validators.required]),
    'confirmpassword' : new FormControl('',[Validators.required]),
    'photo' :  new FormControl('',[Validators.required])
  })
  buttonLabel: string = "Change"
  buttonColor: string = "primary"
  buttonType: string = "button"
  username: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message: string = ""
  photo!: File;
  photoUploaded: boolean = false

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private LocalStorageServ: LocalStorageService,
    private _snackBar: MatSnackBar,
    private commonService: CommonService

  ){
    this.titleService.setTitle("Change Password");
  }

  ngOnInit(): void {
    let temp = this.LocalStorageServ.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    //this.paswordSubmit.value['username'] = this.username 
    this.paswordSubmit.get('username')?.setValue(this.username)
  }

  changePassword(){
    let p_old = this.paswordSubmit.value['password']
    let p_new = this.paswordSubmit.value['newpassword']
    let p_renew = this.paswordSubmit.value['confirmpassword']
    if(p_new==p_renew){

      this.paswordSubmit.value['password'] = this.paswordSubmit.value['newpassword']

      this.userService.changePassword(this.paswordSubmit.value).subscribe({
        next: (data) => {
          if(data==true||data=="true"){ 
            this.message = "Password Changed Succcesfully"
            this.paswordSubmit.reset()
            this.openSnackBar()
           }
        }
        ,
        error: (e) => {
          this.message = "Error occurred! Try again later1!"
          this.openSnackBar()
        }
      })

    }
   
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  selectPhoto(event: any){
    this.photo = event.target.files.item(0);
  }

  uploadPhoto() {
    this.commonService.uploadProfilePhoto(this.photo).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.paswordSubmit.get('photo')?.setValue(data.fileUri);
          this.photoUploaded = true
        }
  
      },
      error: (e) => {
        console.log(e);
      }
    });
  }


}
