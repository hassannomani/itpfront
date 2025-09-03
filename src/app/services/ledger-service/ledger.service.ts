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

  private url_ledgers_common : any = ""
  private url_ledgers_trp : any = ""
  private url_ledgers_agent : any = ""
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_ledgers_common = url+ "api/v1/ledgers/"
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

  getITPRangeLedger(start: string,  end: string, repId: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }

    return this.http.get(this.url_ledgers_common+"range-itp/"+repId+"/"+start+"/"+end, httpOptions)
      // .http.get<any>(this.url_ledgers_trp+repId, httpOptions)
      // .pipe(
      //   switchMap(representative=>this.http.get(this.url_ledgers_common+"range-itp/"+representative.userid+"/"+start+"/"+end, httpOptions))
      // )
    
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
    return this.http.get<any>(this.url_ledgers_common+"graph/monthwise", httpOptions)
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



  /////////////////////////////////////////////////////////////////
  
  getITPLedger(representativeId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_ledgers_common+"itp/"+representativeId,httpOptions)

  }

  getTotalDataDashboard(){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"dashboard/total", httpOptions)
  }

  getTotalDataDashboardCurrent(){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"dashboard/current", httpOptions)
  }

  getITPStat(username: any){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.url_ledgers_common+"dashboard/itpdata/"+username, httpOptions)
  }
}
