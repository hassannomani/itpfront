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
  selector: 'app-action-list-blocked',
  templateUrl: './action-list-blocked.component.html',
  styleUrls: ['./action-list-blocked.component.css']
})
export class ActionListBlockedComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  messageList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "Unblock"
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
    this.titleService.setTitle("Blocked Users List");
  }

  ngOnInit(): void {
    this.getBlockedUsers()
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  getBlockedUsers(){
    this.actionServc.getBlockedUser().subscribe({
      next: (data) => {
        if(data.length){
          this.messageList = data
          this.displayedColumns = [ 'name','username']
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

  unblock(tin :string, index: number){
    this.actionServc.unBlockUser(tin).subscribe({
      next: (data) => {
        if(data.uuid!=undefined){
          this.message = "User Successfully unblocked"
          this.openSnackBar()
          this.getBlockedUsers()
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
    const message = `Are you sure you want to unblock?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if(result==true)
        this.unblock(tin,index)
    });
  }
}
