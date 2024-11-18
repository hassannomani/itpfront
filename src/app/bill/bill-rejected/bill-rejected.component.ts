import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { BillingService } from 'src/app/services/billing-service/billing.service';

@Component({
  selector: 'app-bill-rejected',
  templateUrl: './bill-rejected.component.html',
  styleUrls: ['./bill-rejected.component.css']
})
export class BillRejectedComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "Check"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataReceived: boolean = false
  dataList: any = []
  tobeApproved: any = []
  validated: boolean = false
  checkedBills: any = []

  constructor(
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private _snackBar: MatSnackBar,
    private billingServ: BillingService
  ){
    this.titleService.setTitle("Pending Bills");
  }

  ngOnInit(): void {
    this.rejectedBills()
  }

  rejectedBills(){
    this.billingServ.adminrejectedBills().subscribe({
      next: (data) => {
        if(data.length){
          this.dataReceived = true
          this.displayedColumns = ['Serial', 'taxpayer_id','taxpayer_name','payee','name','payee_type','creation_date','amount']
          this.dataList = data
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
}
