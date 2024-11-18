import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { BillingService } from 'src/app/services/billing-service/billing.service';

@Component({
  selector: 'app-bill-submit',
  templateUrl: './bill-submit.component.html',
  styleUrls: ['./bill-submit.component.css']
})
export class BillSubmitComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  role: any = ""
  comList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  trp: boolean= false
  dataReceived: boolean = false
  idList : any = []
  constructor(
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private commissionServ: CommissionService,
    private _snackBar: MatSnackBar,
    private ledgerServ: LedgerService,
    private billingServ: BillingService
  ){
    this.titleService.setTitle("Submit Bill");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    this.role = temp.role!=null?JSON.parse(temp.role):""
    if(this.role=="ROLE_REPRESENTATIVE"){
      this.trpCommission()
    }else if(this.role=="ROLE_AGENT"){
      this.agentCommission()
    }
    
  }

  agentCommission(){
    this.billingServ.getAgentBillable(this.username).subscribe({
      next: (data) => {
        if(data.length){
          this.trp = false
          this.comList = data
          this.dataReceived = true
          this.displayedColumns = ['Serial', 'taxpayerId','taxpayerName','paidAmount','agentCommission','action']
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

  trpCommission(){
    this.billingServ.getTRPBillable(this.username).subscribe({
      next: (data) => {
        if(data.length){
          this.trp = true
          this.comList = data
          this.dataReceived = true
          this.displayedColumns = [ 'Serial','taxpayerId','taxpayerName','paidAmount','representativeCommission','action']
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

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  toggle(event: any){
    let id = event.source.value
    let index = this.idList.indexOf(id)
    if(index<0){
      this.idList.push(id)
    }
    else{
      this.idList.splice(index,1)
      console.log(this.idList)
    }
  }

  submit(){
    let obj ={
      "role": this.role,
      "id": this.idList
    }
    this.billingServ.submitBill(obj).subscribe({
      next: (data) => {
       if(data?.success=="true"){
        this.message = "Successfully submitted"
        this.openSnackBar()

        if(this.role=="ROLE_REPRESENTATIVE"){
          this.trpCommission()
        }else if(this.role=="ROLE_AGENT"){
          this.agentCommission()
        }
      }else{
        this.message = "Submission failed"
        this.openSnackBar()
      }
      },
      error: (e) => {
        console.log(e)
        this.message = "Error Submission. Please try again"
        this.openSnackBar()
      } 
    })
  }
}
