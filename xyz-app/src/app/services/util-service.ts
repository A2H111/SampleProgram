import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor() { }
    groupByFuntion(array:any, key:any) {
            return array.reduce((result:any, currentValue:any) => {
              let v = key instanceof Function ? key(currentValue) : currentValue[key]; 
               let el = result.find((r:any) => r && r.key === v);
                if (el) { 
                  el.values.push(currentValue); 
                } 
                else {
                     result.push({ key: v, values: [currentValue] });
                }
                return result;
              }, []); 
    }
}