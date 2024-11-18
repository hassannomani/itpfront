import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { TransferService } from 'src/app/services/transfer-service/transfer.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
// import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import {  MatDialog,MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-previous-trp',
  templateUrl: './previous-trp.component.html',
  styleUrls: ['./previous-trp.component.css']
})
export class PreviousTrpComponent implements OnInit {

  buttonLabel: string = "Approve"
  buttonColor: string = "primary"
  buttonType: string = "button"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  displayedColumns : any =[]
  allAgents : any =[]
  data : any = []
  toBeApproved: any = {}
  toBeapprovedId: string = ""
  tobeAgentId: string = ""
  username: string = ""
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private transferServ: TransferService,
    private agentServ: AgentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.titleService.setTitle("Transfer Request Approval");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    this.getPreviousTRPs()

  }
  

  getPreviousTRPs(){
    this.transferServ.getAllPreviousTRPsOfAnAgent(this.username).subscribe({
      next: (data) => {
        this.data = data
        this.displayedColumns = ['serial','trp_name','trp_username','date_of_approval']
      },
      error: (e) => {
        this.message = "Error occurred! Please try again!"
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


}
