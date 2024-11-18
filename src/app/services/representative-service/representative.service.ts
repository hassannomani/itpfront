import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  private urladd : string ='http://localhost:8080/api/representative/add';
  private urlgetrep : string ='http://localhost:8080/api/representative/';
  private urlgetrepsbyagentid : string ='http://localhost:8080/api/representative/agent/';
  private urlgetAllRep : string ='http://localhost:8080/api/representative/all';
  private urltrpfile : string ='http://localhost:8080/api/trpereturn';

  private url_trp : string = ""
  private url_ereturn: string = ""

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService,
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_trp = url + "api/v1/representative/"
    this.url_ereturn = url + "api/trpereturn"
  }


  addRepresentative(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post(this.url_trp+"add", body,httpOptions)
  }

  getARepresentative(username: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get(this.url_trp+username,httpOptions)

    }else{
      
      return this.http.get(this.url_trp+username)
    }
  }

  getRepresentativeUnderAnAgent(tin: string): Observable<any[]>{
    
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get<any[]>(this.url_trp+"agent/"+tin,httpOptions);

  }

  getAllRepresentatives(): Observable<any[]>{
    
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get<any[]>(this.url_trp+"all",httpOptions);

  }

  fileTaxOfATaxPayer(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post<any>(this.url_ereturn,body,httpOptions);

  }

  
  verifyOtpOfATaxPayer(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.post<any>(this.url_ereturn+"/otp",body,httpOptions);

  }

  assignAgent(tin: any, agent: any): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_trp+'assign/'+tin+"/"+agent,httpOptions)
  }

  getTheAgentDetails(tin: any): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_trp+'agentinfo/'+tin,httpOptions)
  }

  getSingleTRPOfAgent(ag: any,trp: any): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_trp+'single/'+ag+'/'+trp,httpOptions)
  }

}
