import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { TransferService } from 'src/app/services/transfer-service/transfer.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
// import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import {  MatDialog,MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent} from '@angular/material/dialog';
import { DetailsModalComponent, DetailsModalModel } from 'src/app/layouts/details-modal/details-modal.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminTransferPendingTRPComponent implements OnInit{

  buttonLabel: string = "Approve"
  buttonColor: string = "primary"
  buttonLabel2: string = "Reject"
  buttonColor2: string = "warn"
  buttonLabel3: string = "Details"
  buttonColor3: string = "primary"
  buttonType: string = "button"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  displayedColumns : any =[]
  reqs : any =[]
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
    this.loadRequests()
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  loadRequests(){
    this.transferServ.getAll().subscribe({
      next: (data) => {
        if(data.length){
          this.displayedColumns = [ 'serial','requestedBy','requestFor','previouslyAssigned','action']
          this.reqs = data
        }else{
          this.reqs = data
          this.message = "No request found"
          this.openSnackBar()

        }
        console.log(data)
      },
      error: (e) => {
        this.message = e
        this.openSnackBar()

      } 
    })
  }

  confirm(id: string){
    this.transferServ.approve(id).subscribe({
      next: (data) => {
        if(data==true||data=="true"){
          this.message = "Successfully Approved"
          this.openSnackBar()
          this.loadRequests()
        }else{
          this.message = "Request couldn't be rejected"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Error occurred! Please try later"
        this.openSnackBar()
      } 
    })
  }

  reject(id: string){
    
    this.transferServ.reject(id).subscribe({
      next: (data) => {
        if(data==true||data=="true"){
          this.message = "Successfully rejected"
          this.loadRequests()
          this.openSnackBar()
        }else{
          this.message = "Request couldn't be rejected"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Error occurred! Please try later"
        this.openSnackBar()
      } 
    })

  }

  details(id: string){
    for(let i=0;i<this.reqs.length;i++){
      if(this.reqs[i].transferid==id){
        this.confirmDialog(this.reqs[i])
        break
      }
    }
  }

  confirmDialog(data: any): void {
    data.title = "Details"

    const dialogData = new DetailsModalModel(data.title,data.first_name,data.last_name,data.ag_first_name,data.ag_last_name,data.prev_first_name,data.prev_last_name,data.reason,data.created_at);

    const dialogRef = this.dialog.open(DetailsModalComponent, {
      maxWidth: "600px",
      data: dialogData
    });

  }
//title: string, public first_name: string,public last_name: string,public ag_first_name: string,public ag_last_name: string,public prev_first_name: string,public prev_last_name: string,public reason: string, public created_at: string
}
