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
import { DetailsAgentModalModel, DetailsModalAgentComponent } from 'src/app/layouts/details-modal-agent/details-modal-agent.component';
import { AgentSelectionDialogModel, AgentSelectionModalComponent } from 'src/app/layouts/agent-selection-modal/agent-selection-modal.component';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css']
})
export class AdminTransferPendingAgentReqComponent implements OnInit{

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
  allAgents : any =[]
  reqs : any = []
  toBeApproved: any = {}
  toBeapprovedId: string = ""
  tobeAgentId: string = ""
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
    if(this.allAgents.length==0)
      this.getAllAgents()

    this.getAllAgentReq()
  }

  getAllAgents(){
    this.agentServ.getAll().subscribe({
      next: (data) => {
        if(data.length==0){
          this.message = "Agents information not found"
          this.openSnackBar()
        }
        else{
          this.allAgents = data
        }
      },
      error: (e) => {
        this.message = "Error occurred while retrieving agents list! Please try again!"
        this.openSnackBar()
      }
    })
  }

  getAllAgentReq(){
    this.transferServ.getAllAgentReq().subscribe({
      next: (data) => {
       
        if(data.length==0){
          this.message = "No new req found"
          this.openSnackBar()
          this.reqs = data
        }else{
          this.reqs = data
          this.displayedColumns = [ 'serial','previouslyAssigned','previouslyAssignedName','requestedBy','action']
        }
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

  confirm(id: string){
    for(let i=0;i<this.reqs.length;i++){
      if(this.reqs[i].transferid==id){
        this.toBeApproved = this.reqs[i]
        this.toBeapprovedId = id;
        this.selectAgentDialog(this.toBeApproved.requestedBy)
        break
      }
    }
  }

  approve(){
     this.transferServ.approveAgentRequest(this.toBeapprovedId,this.tobeAgentId).subscribe({
      next: (data) => {
        if(data==true||data=="true"){
          this.message = "Successfully Approved"
          this.openSnackBar()
          this.ngOnInit()
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
          this.getAllAgentReq()
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

    const dialogData = new DetailsAgentModalModel(data.title,data.previouslyAssignedName,data.previouslyAssigned,data.requestedBy,data.reason,data.createdAt);

    const dialogRef = this.dialog.open(DetailsModalAgentComponent, {
      maxWidth: "600px",
      data: dialogData
    });
  }


  selectAgentDialog(data: string): void {
    let title = "Select Agent"

    const dialogData = new AgentSelectionDialogModel(title,this.allAgents,data);

    const dialogRef = this.dialog.open(AgentSelectionModalComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if(result!=false&&result!="false"){
        this.tobeAgentId = result
        this.approve()
      }
    });

  }

  
}