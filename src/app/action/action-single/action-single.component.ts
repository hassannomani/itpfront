import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ActionService } from 'src/app/services/action-service/action.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common-service/common.service';
@Component({
  selector: 'app-action-single',
  templateUrl: './action-single.component.html',
  styleUrls: ['./action-single.component.css']
})
export class ActionSingleComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  messageReceived: any = {}
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "View Letter"
  buttonColor: string = "primary"
  buttonType: string = "button"
  @Output() public decrease: EventEmitter<void> = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService:Title,
    private localStore: LocalStorageService,
    private actionServc: ActionService,
    private _snackBar: MatSnackBar,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Message List");
  }

  ngOnInit(): void {

    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      if(id!=null){
        this.getMessage(id)
      }
    })
  }

  getMessage(id :string ){
    if(id!=null){
      this.actionServc.getMessage(id).subscribe({
        next: (data) => {
          if(data.actionId!=undefined){
            this.messageReceived = data
            //this.decreaseCount()
          } 
          else{
            this.message = "No Data found"
            this.openSnackBar()
          }
        },
        error: (e) => {
          console.log(e)
          this.message = "Error Retrieving Data. Please try again"
          this.openSnackBar()
        } 
      })

    } else {
      this.message = "Your session is expired. Please Log In again"
      this.openSnackBar()
    }
  
  }
  
  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  decreaseCount() {
    console.log("emitting")
      this.decrease.emit();
  }
  openPdf(){
    let temp = this.messageReceived.attachment.split("\\")
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonServ.loadFile(temp[temp.length-1]).subscribe({
        next: (data) => {
         // console.log(data)
          const fileURL = URL.createObjectURL(data);
          window.open(fileURL, '_blank');
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    }else alert("file not found")
  }

  
    
}
