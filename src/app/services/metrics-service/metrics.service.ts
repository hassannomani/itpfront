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
export class MetricsService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { 
    let url = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.url_metrics = url+ "api/metrics/"
  }

  private url_metrics : string ='http://localhost:8080/api/metrics/save';


  saveMetrics(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any>(this.url_metrics+"save",body,httpOptions)
  }

  getAllMetrics(): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_metrics+"all",httpOptions)
  }
}
