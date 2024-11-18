import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {SafeResourceUrl, Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';
import { RegisterService } from 'src/app/services/register-service/register.service';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  display: any;
  public timerInterval: any;
  year: any = ""
  buttonLabel: string = "Verify"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string = "Validate"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agentId: string = ""
  otpShow: Boolean = false
  tinInfo: any ={}
  requestNew : boolean = false
  submitted : boolean = false
  registerForm = new FormGroup({
    'tinNo' : new FormControl('',[Validators.required]),
    'nid' : new FormControl('',[Validators.required]),
    'phoneNo' : new FormControl('',[Validators.required]),
    'otp' : new FormControl('',[Validators.required])
  })

 

  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private _snackBar: MatSnackBar,
    private userServ: UserService,
    private registerServ: RegisterService,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Register");
  }

  // getAssessmentYear

  ngOnInit(): void {
    this.registerServ.getAssessmentYear().subscribe({
      next: (data) => {
        if(data){
          this.year = data.year
          console.log(this.year)
        }
      }
      ,
      error: (e) => {
        this.message = "Error retrieving year"
        this.openSnackBar()
      }  
    })
  
  }


  taxpayerSubmit(){
    this.submitted = true
    this.message=""
    let tin = this.registerForm.value['tinNo']
    let tin12 = tin==null?false:tin.length==12?true:false
    let tinNum = this.isNumCheck(tin)
    let tinValid = tin12 && tinNum
    if(!tinValid)
      this.message = "TIN no is not valid. "

    let nid =  this.registerForm.value['nid']
    let nidLength = nid==null?false:nid.length==10||nid.length==13||nid.length==17?true:false
    let nidNum = this.isNumCheck(nid)
    let nidValid = nidLength && nidNum
    if(!nidValid)
      this.message = this.message + "NID is not valid. "

    let mobile = this.registerForm.value['phoneNo']
    let mobileStart = mobile?.startsWith("01")
    let mobileLength = mobile==null?false:mobile.length==11?true:false
    let mobileNum = this.isNumCheck(mobile)
    let mobileValid = mobileStart && mobileLength && mobileNum
    if(!mobileValid)
      this.message = this.message + "Mobile No is not valid. "
    if(!tinValid||!nidValid||!mobileValid){
      this.openSnackBar()
      this.submitted = false
    }
    else{
      this.threeStepsProcessing()
    }
  }
  isNumCheck(val: any){
    return /^\d+$/.test(val);
  }

  
  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
  otpSubmit(){
    this
    .registerServ
    .submitOTP(this.registerForm.value['phoneNo'], this.registerForm.value['otp']).subscribe({
      next: (data) => {
        if(data==true||data=="true"){ //second chaining
         // this.
         this.otpShow = false
         this.requestNew = false
         let obj = {
          un_tin: this.registerForm.value['tinNo'],
          un_nid: this.registerForm.value['nid'],
          un_mobile: this.registerForm.value['phoneNo'],
          un_tinData: this.tinInfo
         }
         this.localStore.saveUnregisteredUser(obj)
         
         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['register-fillup']);
        }); 
          
        }else{
          this.message = "OTP doesn't match"
          this.openSnackBar()
        }

      }
      ,
      error: (e) => {
        this.message = "Error occurred! Try again later1!"
        this.openSnackBar()
      }
    })
  //   this.otpShow = false
  //   this.requestNew = false
  //   let obj = {
  //    un_tin: this.registerForm.value['tinNo'],
  //    un_nid: this.registerForm.value['nid'],
  //    un_mobile: this.registerForm.value['phoneNo'],
  //    un_tinData: this.tinInfo
  //   }
  //   console.log(obj)
  //   this.localStore.saveUnregisteredUser(obj)
    
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //    this.router.navigate(['register-fillup']);
  //  }); 
  }

  threeStepsProcessing(){
    this
    .registerServ
    .checkCertificate(this.registerForm.value['tinNo'], this.registerForm.value['nid']).subscribe({
      next: (data) => {
        if(data==true||data=="true"){ //second chaining
          this.getTinValidation(this.registerForm.value['tinNo'])
        }else{
          this.message = "No certificate found with this NID and TIN"
          //this.getTinValidation(this.registerForm.value['tinNo'])

          this.submitted  =false
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

  getTinValidation(tin : any){
    this.commonServ.getTin(tin).subscribe({
      next: (data) => {
        if(data.isError==1){
          this.message = "TIN not found"

        }else{
          this.tinInfo = data
          //this.psrValidate(tin)
          this.getMobileValidated(this.registerForm.value['phoneNo'])
        }
      }
      ,
      error: (e) => {
        this.submitted = false
        this.message = "Error occurred! Try again later2!"
        this.openSnackBar()
      }      
    })
  }

  getMobileValidated(mobile: any){
    //send req to ntmc
    this.otpSend(this.registerForm.value['phoneNo'])
    this.otpShow = true
    this.submitted = false

  }

  resend(){
    this.otpSend(this.registerForm.value['phoneNo'])
  }

  otpSend(mobile: any){
    this.requestNew = false
    this.registerServ.sendOTP(mobile).subscribe({
      next: (data) => {
        if(data.is_success==1||data.is_success=="1"){
          this.otpShow = true
          this.timer(5)
        }else{
          this.message = "OTP couldn't be sent. Please try again later"
        }
      }
      ,
      error: (e) => {
        console.log(e)
        this.message = "Error occurred! Try again later3!"
        this.openSnackBar()
      }      
    })
    // this.requestNew = false
    // this.otpShow = true
    // this.timer(5)
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        this.requestNew = true
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  psrValidate(tin:any){
    this.commonServ.psrValidate(this.year,tin).subscribe({
      next: (data) => {
        if(data.success==true){
          
        }else{
          this.message = "PSR Couldn't be verified"
          this.openSnackBar()
        }
      }
      ,
      error: (e) => {
        this.message = "PSR Verification error"
        this.openSnackBar()
      }     
    })
    
  }
}
