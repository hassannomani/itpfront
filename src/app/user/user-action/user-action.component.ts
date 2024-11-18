import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ActionService } from 'src/app/services/action-service/action.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit{
  
  sender: any = ""
  receiver: any = ""
  sent: boolean = false
  buttonLabelBack: string = "Go Back"
  buttonColorBack: string = "primary"
  buttonTypeBack: string = "button"
  buttonLabel: string = "Send"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel2: string = "Upload"
  buttonColor2: string = "basic"
  buttonType2: string = "button"
  type_of_message: any = []
  uploaded: boolean = false
  uploadFailed: boolean = false
  failed: boolean = false
  file !: File
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  selected: string =""
  subject: string = "Subject"
  reason : string = "Reason"
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public disableMinute = false;
  public hideTime = false;
  flag: boolean = true
  addAction = new FormGroup({
    'sender' : new FormControl('',[Validators.required]),
    'receiver' : new FormControl({value:"", disabled: true},[Validators.required]),
    'message' : new FormControl('',[Validators.required]),
    'messageTitle' : new FormControl('',[Validators.required]),
    'actionType' : new FormControl('',[Validators.required]),
    'actionFrom' : new FormControl('',[Validators.required]),
    'actionTo' : new FormControl('',[Validators.required]),
    'attachment': new FormControl('',[Validators.required]),
    
  })
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private localStore: LocalStorageService,
    private actionService: ActionService,
    private _snackBar: MatSnackBar,
    private location: Location
  ){
    this.titleService.setTitle("User List");
  }
  ngOnInit(): void{
    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let uname = paramsg['username']
      let deny = paramsg['deny']
      this.receiver = uname
      console.log(deny)
      if(uname!=null){
        let items = this.localStore.getStorageItems()
        this.sender = items.username?JSON.parse(items.username):""
        this.addAction.get("receiver")?.setValue(uname)
        if(deny=="1"){
          this.type_of_message = ['WARNING','DENY','SUSPEND','CANCEL']
          this.subject = "Subject of Deny"
          this.reason = "Reason of Deny"
          this.addAction.get("actionType")?.setValue("DENY")
          this.flag = false
        }
        else
        {
          this.type_of_message = ['WARNING','SUSPEND','CANCEL']
        }
        
        console.log(uname)
      }
      if(deny!=null){
        this.selected = 'DENY'
      }
    })
  }

  selectFile(event: any){
    this.file = event.target.files.item(0);
  }

  uploadFile() {
    this.commonService.uploadFile(this.file).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addAction.get('attachment')?.setValue(data.fileUri);
          this.uploaded = true
        }
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        //if(e.status==413||e.status==500){
          console.log(e)
        //this.message="File too large"
        //this.openSnackBar()
        //}
        console.log(e.status)
        this.uploadFailed= true
      }
    });
  }

  actionSubmit(){
    //this.openSnackBar()
    this.addAction.get("sender")?.setValue(this.sender)
    this.addAction.value["receiver"]=this.receiver
    console.log(this.addAction.value)
    this.actionService.saveAction(this.addAction.value).subscribe({
      next: (data) => {
        if(data.actionId!=undefined){
          this.message = "Action Added Successfully"
          this.addAction.reset();
          this.openSnackBar()
        } 
        else{
          this.message = "Action Added Failed"
          this.openSnackBar()

        }
      },
      error: (e) => {
        this.message = e
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

  selectOption(value: any){
    if(value=="DENY"){
      this.subject = "Subject of Deny"
      this.reason = "Reason of Deny"
      this.flag = false

    }else if(value=="CANCEL"){
      this.subject = "Subject of cancel"
      this.reason = "Reason of cancel"
      this.flag = false

    }else if(value=="SUSPEND"){
      this.subject = "Subject of Suspend"
      this.reason = "Reason of Suspend"
      this.flag = true

    }else{
      this.subject = "Subject of Warning"
      this.reason = "Reason of Warning"
      this.flag = false

    }
  }

  back(){
    this.location.back()
  }
}
