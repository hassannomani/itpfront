import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ActionService } from 'src/app/services/action-service/action.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { isNgTemplate } from '@angular/compiler';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-action-list-denied',
  templateUrl: './action-list-denied.component.html',
  styleUrls: ['./action-list-denied.component.css']
})
export class ActionListDeniedComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  messageList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "Approve"
  buttonColor: string = "primary"
  buttonType: string = "button"

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private actionServc: ActionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.titleService.setTitle("Denied Users List");
  }

ngOnInit(): void {
  this.getDeniedList()
}

getDeniedList(){

  this.actionServc.getDeniedUser().subscribe({
    next: (data) => {
      if(data.length){
        this.messageList = data
        this.displayedColumns = [ 'name','username','addedBy','action']
        console.log(this.messageList)
      } 
      else{
        this.messageList = []
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

}

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  undeny(username: string, index: number){
    this.actionServc.unDenyUser(username).subscribe({
      next: (data) => {
        if(data.uuid!=undefined){
          this.message = "User Successfully unblocked"
          this.openSnackBar()
          this.getDeniedList()
        }else{
          this.message = "User unblocking failed"
          this.openSnackBar()
        }
        
      },
      error: (e) => {
        this.message = "User unblocking failed"
        this.openSnackBar()
      } 
    })
  
  }

  confirmDialog(tin :string, index: number): void {
    const message = `Are you sure you want to approve?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if(result==true)
        this.undeny(tin,index)
    });
  }

}

