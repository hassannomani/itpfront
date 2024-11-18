import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ActionService } from 'src/app/services/action-service/action.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  ledger: any = {}
  displayedColumns: any = []
  message : string = ""
  found: boolean = false
  earned: number = 0
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
    private ledgerServ: LedgerService
  ){
    this.titleService.setTitle("Message List");
  }

  ngOnInit(): void {

    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      this.earned = paramsg['earned']
      if(id!=null){
        this.ledgerServ.getLedgerById(id).subscribe({
          next: (data) => {
            if(data.lid!=undefined){
              this.ledger = data
              this.found = true
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
}
