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
export class TransferService {

  private url : string ='';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { 
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url = temp+"api/v1/changerequest/"
  }

  save(formData: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    const body=JSON.stringify(formData);
    return this.http.post(this.url+"save", body,httpOptions)
  }

  getAll(): Observable<any[]>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url+"all-trp",httpOptions)
  }

  approve(id: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"approve/"+id,httpOptions)
  }

  reject(id: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"reject/"+id,httpOptions)
  }

  getAllAgentReq(): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"all-agent",httpOptions)
  }

  approveAgentRequest(id: any,ag: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"approve-agent-req/"+id+"/"+ag,httpOptions)
  }

  getAllPreviousTRPsOfAnAgent(id: any): Observable<any[]>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url+"previous-trp-of-agent/"+id,httpOptions)
  }

  getAllPreviousRCsOfATRP(id: any): Observable<any[]>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url+"previous-agents-of-trp/"+id,httpOptions)
  }

}
