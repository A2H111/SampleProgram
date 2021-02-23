import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SalesRecord } from '../interfaces/salesRecord';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesDataHttpService {

  private apibaseurl = "https://localhost:44378/api/sales";
   private salesRecordList:SalesRecord[]=[];
  constructor(private _httpClient:HttpClient) { }

  getSalesData(): Observable<SalesRecord[]>
  {
      return this._httpClient.get<any>(this.apibaseurl);
  }
}
