import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
@Component({
  selector: 'app-commission-trp',
  templateUrl: './commission-trp.component.html',
  styleUrls: ['./commission-trp.component.css']
})
export class CommissionTrpComponent implements OnInit{
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
  commissionList: any = []
  trpDetails : any = {}
  trp: boolean= false
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private _snackBar: MatSnackBar,
    private ledgerServ: LedgerService,
  ){
    this.titleService.setTitle("TRP Details");
  }

  ngOnInit(): void{
    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let trp = paramsg['trp']
      if(trp!=null){
        forkJoin([
          this.ledgerServ.getRepresentativeLedger(trp),
          this.representativeServ.getARepresentative(trp),
        ])
        .subscribe({
          next: (data) => {
            //console.log(data)
            if(data[0].length){
              this.commissionList = data[0]
              this.displayedColumns = [ 'taxpayerId','taxpayerName','paidAmount','agentCommission','representativeCommission','created_at','action']
            }
            else{
              this.message = "No Works found for TRP"
              this.openSnackBar()
            }
            if(data[1].userid!=undefined)
              this.trpDetails = data[1]
            else{
              this.message = "TRP Data not found"
              this.openSnackBar()
            }
        
          },
          error: (e) => {
           
              this.message = "Error occurred! Please try again!"
              this.openSnackBar()
          }
        });
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

  view(lid: string,amount: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['commission-single'],{ queryParams: {id: lid,earned:amount}});
    }); 
    console.log(lid)
  }

}
