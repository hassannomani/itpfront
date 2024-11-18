import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
  ) { 
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_common = url + 'api/common/'
    this.url_bank = url + 'api/bank/'
    this.url_address = url + 'api/address/'
    this.url_etin = url + 'api/etin/'
  }

  private urldistrict : string ='http://localhost:8080/api/common/district';
  private urldiv : string ='http://localhost:8080/api/common/division';
  private urlthana : string ='http://localhost:8080/api/common/thana';
  private urlbank : string ='http://localhost:8080/api/common/bank';
  private urlbankdist : string ='http://localhost:8080/api/common/bankdist';
  private urlbankbranches : string ='http://localhost:8080/api/common/bankbranches';
  private urlcitycorp : string ='http://localhost:8080/api/common/citycorporation';
  private urlfile : string ='http://localhost:8080/api/common/file';
  private urlPhoto : string ='http://localhost:8080/api/common/photo';
  private urlfileget : string ='http://localhost:8080/api/common/file/';
  private urlPhotoget : string ='http://localhost:8080/api/common/photo/';
  private urladdaddress : string ='http://localhost:8080/api/address/add';
  private urladdbank : string ='http://localhost:8080/api/bank/add';
  private urletin : string ='http://localhost:8080/api/etin/tin/';
  private urlereturn : string ='http://localhost:8080/api/trpereturn';

  private url_common : any = ""
  private url_bank : any = ""
  private url_address : any = ""
  private url_etin : any = ""

  getDistrict(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url_common+'district',httpOptions)
    }else{
      return this.http.get<any[]>(this.url_common+'district')
    }

  }

  
  getDivision(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url_common+'division',httpOptions)
    }else{
      return this.http.get<any[]>(this.url_common+'division')
    }

  }

  getThana(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url_common+'thana',httpOptions)
    }else{
      return this.http.get<any[]>(this.url_common+'thana')
    }

  }

  addAddress(formData: any): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    };
    const body=JSON.stringify(formData);  
    return this.http.post<any>(this.url_address+'add',body,httpOptions)
   

  }

  addBank(formData: any): Observable<any>{
    const httpOptions = {
      headers: this.httpReturner()
    };
    const body=JSON.stringify(formData);
    return this.http.post<any>(this.url_bank+'add',body,httpOptions)
  }

  httpReturner(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null&&obj.token!="undefined"&&obj.token!=undefined){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerCustom(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerBlob(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token), 
        'Content-Type': 'application/pdf',
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }
  
  getBank(): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.url_common+"bank",httpOptions)
    
  }

  getBankDist(): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.url_common+"bankdist",httpOptions)
    
  }

  getBankBranches(name: string, district: string): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.url_common+"bankbranches/"+name+"/"+district,httpOptions)
    
  }

  getCityCorp(): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.url_common+"citycorporation",httpOptions)
    
  }

  getTin(tin: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any>(this.url_etin+"tin/"+tin,httpOptions)
    
  }

  uploadFile(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.url_common+"file",formData, httpOptions)
    
  }

  loadFile(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.url_common+"file/"+filename, {headers, responseType: 'blob'})

  }

  uploadPhoto(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.url_common+"photo",formData, httpOptions)
    
  }

  loadPhoto(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      //headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.url_common+"photo/"+filename, {headers, responseType: 'blob'})

  }

  uploadProfilePhoto(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.url_common+"profilephoto",formData, httpOptions)
    
  }

  loadProfilePhoto(): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      //headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
    let temp
    if(obj.username!=null)
      temp = JSON.parse(obj.username)
  
    return this.http.get(this.url_common+"get-profile-photo/"+temp, {headers, responseType: 'blob'})

  }

  psrValidate(year: String, tin: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any>(this.urlereturn +"/psr/"+year+"/"+tin,httpOptions)
  }


}
