import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ActionService } from 'src/app/services/action-service/action.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  messageList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "View"
  buttonColor: string = "primary"
  buttonType: string = "button"
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private actionServc: ActionService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("Message List");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    let username = temp.username!=null?JSON.parse(temp.username):""
    if(username!=null){
      this.actionServc.getStatus(username).subscribe({
        next: (data) => {
          if(data.length){
            this.messageList = data
            this.displayedColumns = [ 'sender','message','actionType','actionSent','action']
  
            console.log(this.messageList)
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
  
  view(id: string){
    console.log(id)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['message'],{ queryParams: {id: id}});
    });
  }
}
