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
export class RegisterService {
  private base_url : string ='' 
  private cert_base_url : string =""
  private otp_base_url : string =""
  private assmnt_base_url : string =""
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.base_url = url+"api/"
    this.cert_base_url = this.base_url+"certificate"
    this.otp_base_url = this.base_url+"otp"
    this.assmnt_base_url = this.base_url+"v1/year"
  }

  checkCertificate(tin: any, nid: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.cert_base_url+"/check/"+tin+"/"+nid,httpOptions)
  }

  sendOTP(mobile: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.otp_base_url+"/"+mobile,httpOptions)
    
  }

  submitOTP(mobile: any, otp: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.otp_base_url+"/validate/"+mobile+"/"+otp,httpOptions)
  }

  getCertificate(tin: any, nid: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.cert_base_url+"/get/"+tin+"/"+nid,httpOptions)
  }

  getAssessmentYear(){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.assmnt_base_url+"/find-latest",httpOptions)
  }
}
