import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalDataService {

  public monthNames:string[]=[];
}