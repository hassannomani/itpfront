import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-agent-ledger',
  templateUrl: './agent-ledger.component.html',
  styleUrls: ['./agent-ledger.component.css']
})
export class AgentLedgerComponent implements OnInit{

  agentId: string = ""
  localStore: any ={}
  loaded: Boolean = true
  agentLedger: any =[]
  displayedColumn : any = []
  constructor(
    private localStorage: LocalStorageService,
    private agentService: AgentService ,
    private ledgerService: LedgerService ,
    private titleService:Title

  ){
    this.titleService.setTitle("Ledger");

  }

  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems()
    this.ledgerService.getAgentLedger(JSON.parse(this.localStore.username)).subscribe({
      next: (data) => {
        if(data.length)
          this.agentLedger = data
          this.loaded = true
          this.displayedColumn = ['serial','taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeTin']

      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }
}
