import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';

export interface Certificate {
  examineeTin : string,
  examineeNid : string,
  examineeLicense : string,
  examineeMobile : string,
  examineeCertno : string,
  examineeCertserial : string
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { 
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_base = url + 'api/certificate'
  }

  private url_base : string ='';

  saveCertificates(Certs: Certificate[]): Observable<any>{
    const body=JSON.stringify(Certs);
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any[]>(this.url_base+"/bulk",body, httpOptions)
  }

  
  checkCertificates(ids: any[]): Observable<any>{
    const body=JSON.stringify(ids);
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any[]>(this.url_base+"/duplicacy",body, httpOptions)
  }

  allCertificates(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_base+"/all", httpOptions)
  }
 


}
