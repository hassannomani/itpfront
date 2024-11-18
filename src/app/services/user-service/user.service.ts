import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';

export interface Roles {
  name:String
  }
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url : string ='';
  // private url : string ='http://localhost:8080/api/users/roles';
  // private urladd : string ='http://localhost:8080/api/users/add';
  // private urlRegister : string ='http://localhost:8080/api/users/register';
  // private url_list : string ='http://localhost:8080/api/users/all';
  // private url_single : string ='http://localhost:8080/api/users/user/';
  // private url_pending_all : string ='http://localhost:8080/api/users/pending-all';
  // private url_approve_representative : string ='http://localhost:8080/api/users/approve/';
  // private url_reject_representative : string ='http://localhost:8080/api/users/reject/';
  // private url_reject_representative_tin : string ='http://localhost:8080/api/users/tinreject/';
  // private url_approve_representative_tin : string ='http://localhost:8080/api/users/tinapprove/';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) {
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url = temp+"api/v1/users/"
  }
  


  getRoles(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url+"roles",httpOptions)
    }else{
      return this.http.get<any[]>(this.url+"roles")
    }

  }

  addUsers(formData: any): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    const body=JSON.stringify(formData);
    console.log(body)
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.post(this.url+"add", body,httpOptions)
    }else{
      return this.http.post(this.url+"add", body)
    }
  }

  getAllUSers(): Observable<any>{
    const httpOptions:any = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"all",httpOptions)
  }

  getAllPendingUsers(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url+"pending-all",httpOptions)
  }

  getAUser(username: String): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any>(this.url+"user/"+username,httpOptions)
    }else{
      return this.http.get<any>(this.url+"user/"+username)
    }

  }

  approvePendingUser(uuid:string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url+"approve/"+uuid,httpOptions)
  }

  approvePendingUserByTin(username:string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
   
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any>(this.url+"tinapprove/"+username,httpOptions)
    }else{
      return this.http.get<any>(this.url+"tinapprove/"+username)
    }

  }

  rejectPendingUser(uuid:string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
        
    return this.http.get<any>(this.url+"reject/"+uuid,httpOptions)
  }

  rejectPendingUserByTin(tin:string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.url+"reject/"+tin,httpOptions)
  }

  registerUser(formData: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    const body=JSON.stringify(formData);
    return this.http.post(this.url+"register", body,httpOptions)
  }

  changePassword(formData: any): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    const body=JSON.stringify(formData);
    return this.http.post(this.url+"changePassword", body,httpOptions)
  }
}
