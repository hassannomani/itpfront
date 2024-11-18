import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ActionService } from 'src/app/services/action-service/action.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-action-history',
  templateUrl: './action-history.component.html',
  styleUrls: ['./action-history.component.css']
})
export class ActionHistoryComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  messageReceived: any = []
  displayedColumns: any = []
  message : string = ""

  constructor(
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
      let username = paramsg['username']
      if(username!=null){
        this.getMessages(username)
      }
    })
  }

  getMessages(username: string){
    if(username!=null){
      this.actionServc.getStatus(username).subscribe({
        next: (data) => {
          if(data.length){
            this.messageReceived = data
            this.displayedColumns = [ 'receiver','actionType','actionSent']
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
      this.message = "Wrong Url. Please make the URL is correct"
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
}
