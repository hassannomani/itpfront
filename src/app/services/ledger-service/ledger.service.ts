import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private urlagentledger: string ='http://localhost:8080/api/ledgers/agent/';
  private urlrepledger: string ='http://localhost:8080/api/ledgers/representative/';
  private urladmledger: string ='http://localhost:8080/api/ledgers/admin';
  private urlallrangeledger: string ='http://localhost:8080/api/ledgers/range';
  private urlallreprangeledger: string ='http://localhost:8080/api/ledgers/range-representative/';
  private urlallagrangeledger: string ='http://localhost:8080/api/ledgers/range-agent/';
  private urlsingleledger: string ='http://localhost:8080/api/ledgers/';
  private urldashboardgraph: string ='http://localhost:8080/api/ledgers/graph/trp';
  private urlagdashboardgraph: string ='http://localhost:8080/api/ledgers/graph/agent/';
  private urlagentcommisionview: string ='http://localhost:8080/api/ledgers/agent/commission/';
  private representativeGet: string = 'http://localhost:8080/api/respresentative/'
  private urlagentGet: string ='http://localhost:8080/api/agent/';

  private url_ledgers_common : any = ""
  private url_ledgers_trp : any = ""
  private url_ledgers_agent : any = ""
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_ledgers_common = url+ "api/ledgers/"
    this.url_ledgers_trp = url+ "api/respresentative/"
    this.url_ledgers_agent = url+ "api/agent/"
  }

  getAgentLedger(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_ledgers_common+"agent/"+agentId,httpOptions)

  }

  getAgentCommissionView(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_ledgers_common+"agent/commission/"+agentId,httpOptions)

  }

  getRepresentativeLedger(representativeId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_ledgers_common+"representative/"+representativeId,httpOptions)

  }

  getAdminLedger(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_ledgers_common+"admin",httpOptions)

  }

  getAllRangeLedger(start: string,  end: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
  
    return this.http.get<any[]>(this.url_ledgers_common+"range/"+start+"/"+end, httpOptions)
  }

  getRepresentativeRangeLedger(start: string,  end: string, repId: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }

    return this
      .http.get<any>(this.url_ledgers_trp+repId, httpOptions)
      .pipe(
        switchMap(representative=>this.http.get(this.url_ledgers_common+"range-representative/"+representative.userid+"/"+start+"/"+end, httpOptions))
      )
    
  }

  getAgentRangeLedger(start: string,  end: string, agId: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    console.log(start+" "+end)
    return this
      .http.get<any>(this.url_ledgers_agent+agId, httpOptions)
      .pipe(
        switchMap(agent=>this.http.get(this.url_ledgers_common+"range-agent/"+agent.id+"/"+start+"/"+end, httpOptions))
      )
    
  }

  getLedgerById(id: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+id, httpOptions)
  }

  getGraphDashboard(){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"graph/trp", httpOptions)
  }

  getGraphDashboardAgent(tin : string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"graph/agent/"+tin, httpOptions)
  }

  getGraphDashboardTrp(tin : string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"graph/trp/"+tin, httpOptions)
  }
}
