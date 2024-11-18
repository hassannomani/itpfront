import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {SafeResourceUrl, Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';

@Component({
  selector: 'app-file-tax',
  templateUrl: './file-tax.component.html',
  styleUrls: ['./file-tax.component.css']
})
export class FileTaxComponent {

  buttonLabel: string = "Check"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string = "Validate"
  buttonLabel2: string = "Reset"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agentId: string = ""
  otpShow: Boolean = false
  resetShow: Boolean = false
  showErr: Boolean = false
  checkTaxPayer = new FormGroup({
    'tinNo' : new FormControl('',[Validators.required]),
    'phoneNo' : new FormControl('',[Validators.required]),
    'otp' : new FormControl('',[Validators.required]),
    'orgId' : new FormControl('',[Validators.required]),  //agent
    'agentId' : new FormControl('',[Validators.required]) //trp
  })

  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("File Taxes");
  }
  ngOnInit(): void{
    this.localStoreObj = this.localStore.getStorageItems();
    this.username = JSON.parse(this.localStoreObj.username)
    console.log(this.username)
    this.representativeServ.getARepresentative(this.username).subscribe({
      next: (data) => {
        if(data.agentId){
          this.agentId = data.agentId
        }
        console.log(data)
      },
      error: (e) => {
       
          this.message = "Error occurred! Please try again!"
          this.openSnackBar()
      }
    })
  }

  taxpayerSubmit(){
    this.checkTaxPayer.get('orgId')?.setValue(this.agentId);
    this.checkTaxPayer.get('agentId')?.setValue(this.username);
    this.representativeServ.fileTaxOfATaxPayer(this.checkTaxPayer.value).subscribe({
      next: (data) => {
        if(data?.success==true||data?.message||data?.replyMessage){
          this.message = "OTP has been shared with the requested phone number!"
          this.otpShow = true
          this.resetShow = true
          this.showErr = false
          this.openSnackBar()
        }else{
          let errMessage = data.errorMessage
          let json = JSON.parse(errMessage)
          console.log(json)
          if(json?.errorCode=="48921"){
            this.message = "OTP already sent to the mobile"
            this.otpShow = true
            this.showErr = false
            this.openSnackBar()
          }else if(/*json.errorCode==undefined&&*/json.errorMessage){
            this.message = json.errorMessage
            this.openSnackBar()
            this.showErr = true
          }
        }
        
      }
      ,
      error: (e) => {
          console.log(e)
          this.message = "Error occurred! Please try again!"
          this.openSnackBar()
      }
    })

  }

  otpSubmit(){

    this.representativeServ.verifyOtpOfATaxPayer(this.checkTaxPayer.value).subscribe({
      next: (data) => {
        if(data?.success!=undefined&&data?.success==true){
          this.message = "OTP verified!"
          this.openSnackBar()
          window.location.href = data?.replyMessage?.redirectURL+"/"+data?.replyMessage?.id_token
        }
      }
      ,
      error: (e) => {
      
          this.message = "Wrong OTP!"
          this.openSnackBar()
      }
    })

  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  reset(){
    this.checkTaxPayer.reset()
    this.otpShow = false
    this.showErr = false
  }
}
