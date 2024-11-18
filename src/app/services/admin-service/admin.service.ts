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
export class AdminService {

  private urladminledger: string ='';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.urladminledger = url + 'api/ledgers/admin'
  }
  
  getAdminLedger(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.urladminledger,httpOptions)

  }
}
