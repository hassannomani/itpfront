import { Component, OnInit } from '@angular/core';
import { Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { TransferService } from 'src/app/services/transfer-service/transfer.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
// import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import {  MatDialog,MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent} from '@angular/material/dialog';
@Component({
  selector: 'app-previous-agent',
  templateUrl: './previous-agent.component.html',
  styleUrls: ['./previous-agent.component.css']
})
export class PreviousAgentComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  displayedColumns : any =[]
  allAgents : any =[]
  data : any = []
  username: string = ""
  constructor(
    private titleService:Title,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private transferServ: TransferService,
    private agentServ: AgentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.titleService.setTitle("Previous Resource Center");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    this.getPreviousRCs()
  }
  

  getPreviousRCs(){
    this.transferServ.getAllPreviousRCsOfATRP(this.username).subscribe({
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
