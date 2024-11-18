import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-representative-ledger',
  templateUrl: './representative-ledger.component.html',
  styleUrls: ['./representative-ledger.component.css']
})
export class RepresentativeLedgerComponent implements OnInit{
  loaded: Boolean = true
  representativeLedger: any =[]
  displayedColumn : any = []
  localStore: any ={}
  representativeId: string =""
  constructor(
    private localStorage: LocalStorageService,
    private ledgerService: LedgerService,
    private representativeServ: RepresentativeService,
    private titleService:Title
  ){
    this.titleService.setTitle("Ledger");

  }

  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems()    
    this.ledgerService.getRepresentativeLedger(JSON.parse(this.localStore.username)).subscribe({
      next: (data) => {
        if(data.length)
          this.representativeLedger = data
          this.loaded = true
          this.displayedColumn = ['serial','taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeTin']

      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }
}
