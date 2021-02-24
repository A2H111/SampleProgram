import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor() { }
    groupByFuntion(array:any, key:any) {
        //const groupBy = (array:any, key:any) => {
            // Return the end result
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
              }, []); // empty object is the initial value for result object
          //};
    }

//   myGlobalAddFunction(a){
//     return a++;
//   }
//   mySecondFunc(){
//     // add more... and so on
//   }
}