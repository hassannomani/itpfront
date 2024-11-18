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
export class AgentService {

  private urladd : string ='http://localhost:8080/api/agent/add';
  private urlall : string ='http://localhost:8080/api/agent/all';
  private urlanagent : string ='http://localhost:8080/api/users/user/';
  private urlagent: string ='http://localhost:8080/api/agent/';
  private urlallfront : string ='http://localhost:8080/api/agent/allfront';
  
  private url_base_agent : string = ''
  private url_base_user : string = ''
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_base_agent = url + 'api/agent/'
    this.url_base_user = url + 'api/users/'
  }

  
  addAgent(formData: any): Observable<any>{
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
      
      return this.http.post(this.url_base_agent+'add', body,httpOptions)
    }else{
      return this.http.post(this.url_base_agent+'add', body)
    }
  }

  getAll(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any[]>(this.url_base_agent+'all',httpOptions)
    }else{
      return this.http.get<any[]>(this.url_base_agent+'all')
    }
  }

  getAnAgent(uname: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any[]>(this.url_base_user+'user/'+uname,httpOptions)
    }else{
      return this.http.get<any[]>(this.url_base_user+'user/'+uname)
    }
  }

  getAgentInfo(uname: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any>(this.url_base_agent+uname,httpOptions)
    }else{
      return this.http.get<any>(this.url_base_agent+uname)
    }
  }

  getAllAgentForFront(){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
      return this.http.get<any>(this.url_base_agent+'allfront',httpOptions)
  }



}
