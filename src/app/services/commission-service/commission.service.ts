import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_base = url + 'api/ledgers'
   }

  // private url_get_all : string ='http://localhost:8080/api/ledgers';
  // private url_agent : string ='http://localhost:8080/api/ledgers/agent/';
  // private url_representative : string ='http://localhost:8080/api/ledgers/representative/';
  // private url_agent_trp : string ='http://localhost:8080/api/ledgers/agenttrp/';
  // private urlallrangecommission: string ='http://localhost:8080/api/ledgers/range';
  // private urltrprangecommission: string ='http://localhost:8080/api/ledgers/rangetrp';
  // private url_taxpayer_trp : string ='http://localhost:8080/api/ledgers/taxpayertrp/';

  private url_base : string = ''

  
  getCommissionAgent(username: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_base+'/agent/'+username,httpOptions)
  }

   
  getCommissionRepresentative(username: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_base+'/representative/'+username,httpOptions)
  }

  getCommissionAll(): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_base,httpOptions)
  }

  getAllRangeCommission(start: string,  end: string){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
  
    return this.http.get<any[]>(this.url_base+"/range/"+start+"/"+end, httpOptions)
  }

  getCommissionOfTRPofAgent(agent: string, trp: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_base+'/agenttrp/'+ agent+"/"+trp,httpOptions)
  }

  getRepresentativeRangeCommission(agent: string, trp: string, start: string, end: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_base+"/rangetrp/"+agent+"/"+trp+"/"+start+"/"+end, httpOptions)
  }

  getInformationOfTaxpayerOfTrp(trp: string, tin: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_base+'/taxpayertrp/'+trp+"/"+tin,httpOptions)
  }
}
