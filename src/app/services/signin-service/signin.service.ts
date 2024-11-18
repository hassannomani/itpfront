import { Injectable, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';
import { CommonService } from '../common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  private url : string ='api/auth/signin';
  private url1 : string ='api/auth/logout';
  private baseUrl: string = ""
  
  constructor(
    private http: HttpClient,
    private localstorageserv: LocalStorageService,
    private commonServ: CommonService
  ) {
    if(environment.production)
      this.baseUrl = environmentProd.apiUrl
    else
      this.baseUrl = environment.apiUrl
  }
    

  postVerifyUsers(formData:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(formData);
    console.log(body)
    return this.http.post(this.baseUrl+this.url, body,{'headers':headers}).pipe(
      tap(() => this.loggedIn.next(true)));
  }

  loginStatusChange(): Observable<boolean> {
    let object = this.localstorageserv.getStorageItems()
    if(object.token!=""&&object.token!=null){
       this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable()
  }
  
  logout(): Observable<any> {
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    this.localstorageserv.deletetorageItems()
    return this.http.post(this.baseUrl+this.url1, {},httpOptions).pipe(
      tap(() => this.loggedIn.next(false)));
  }
}
