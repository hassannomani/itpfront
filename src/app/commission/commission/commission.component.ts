import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  role: any = ""
  comList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "View"
  buttonColor: string = "primary"
  buttonType: string = "button"
  trp: boolean= false
  constructor(
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private commissionServ: CommissionService,
    private _snackBar: MatSnackBar,
    private ledgerServ: LedgerService,
  ){
    this.titleService.setTitle("Commission List");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    this.role = temp.role!=null?JSON.parse(temp.role):""
    if(this.role=="ROLE_REPRESENTATIVE"){
      this.ledgerServ.getRepresentativeLedger(this.username).subscribe({
        next: (data) => {
          if(data.length){
            this.comList = data
            this.trp = true
            //this.metricsList.sort((a,b) => a.slotNo.rendered - b.slotNo.rendered);
  
            this.displayedColumns = ['serial', 'taxpayerId','taxpayerName','paidAmount','agentCommission','representativeCommission','created_at','action']
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
    }else if(this.role=="ROLE_AGENT"){

      this.ledgerServ.getAgentCommissionView(this.username).subscribe({
        next: (data) => {
          if(data.length){
            let temp = data
            this.trp = false
            for(let i=0;i<temp.length;i++){
              let obj = {'amount': temp[i][0],'trpcom':temp[i][1],'agentcom':temp[i][2],'trptin':temp[i][3] }
              this.comList.push(obj)
            }
            //this.metricsList.sort((a,b) => a.slotNo.rendered - b.slotNo.rendered);
  
            this.displayedColumns = [ 'amount','agentcom','trpcom','trptin','action']
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
    
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  view(lid: string,amount: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['commission-single'],{ queryParams: {id: lid,earned:amount}});
    }); 
    console.log(lid)
  }

  viewtrp(tin: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['commission-trp'],{ queryParams: {trp: tin}});
    }); 
  }
}