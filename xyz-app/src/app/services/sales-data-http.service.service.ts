import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { SalesRecord } from '../interfaces/salesRecord';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesDataHttpService {

  private apibaseurl = "http://localhost:58988/api/Sales";
   private salesRecordList:SalesRecord[]=[];
  constructor(private _httpClient:HttpClient) { }

  getSalesData(): Observable<SalesRecord[]>
  {
      return this._httpClient.get<any>(this.apibaseurl);
  }

  insertSalesData(saleValue: SalesRecord[]): void {
    const headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
     this._httpClient.post<any>(this.apibaseurl, saleValue).subscribe();
}
}
