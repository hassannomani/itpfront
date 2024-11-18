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
export class BillingService {
  private url_base_ledger: string = ''
  private url_base_commission: string = ''
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_base_commission = url+'api/commission/'
    this.url_base_ledger = url + 'api/bill/'
  }

  getAgentBillable(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'billable-agt/'+agentId,httpOptions)
  }

  getTRPBillable(trpId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'billable-trp/'+trpId,httpOptions)
  }

  submitBill(billids: any): Observable<any>{
    const body=JSON.stringify(billids);
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.post<any>(this.url_base_ledger+'billSubmit',body,httpOptions)
  }

  adminpendingBills(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_commission+'pending_bill',httpOptions)
  }

  validatePendingBills(billids: any): Observable<any[]>{
    const body=JSON.stringify(billids);
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.post<any[]>(this.url_base_commission+'validate',body,httpOptions)
  }

  approvePendingBills(billids: any): Observable<any>{
    const body=JSON.stringify(billids);
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.post<any>(this.url_base_commission+'approve',body,httpOptions)
  }

  rejectPendingBills(billids: any): Observable<any>{
    const body=JSON.stringify(billids);
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.post<any>(this.url_base_commission+'reject',body,httpOptions)
  }

  adminrejectedBills(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_commission+'rejected_bill',httpOptions)
  }

  approvedBills(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_commission+'approved_bill',httpOptions)
  }

  getApplicants(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_commission+'get_applicants',httpOptions)
  }

  getAgentApproved(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'approved-agt/'+agentId,httpOptions)
  }

  getTRPApproved(trpId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'approved-trp/'+trpId,httpOptions)
  }

}
