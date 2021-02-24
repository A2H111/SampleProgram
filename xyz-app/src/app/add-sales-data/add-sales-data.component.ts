import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesRecord } from '../interfaces/salesRecord';
import { AppGlobalDataService } from '../services/app-global-data-service';
import { SalesDataHttpService } from '../services/sales-data-http.service.service';

@Component({
  selector: 'app-add-sales-data',
  templateUrl: './add-sales-data.component.html',
  styleUrls: ['./add-sales-data.component.css']
})
export class AddSalesDataComponent implements OnInit {

  salesDataFormGroup : FormGroup;
  public monthNamesArray :string[]=[];
  public salesDataControls:any = {};;
  constructor(private _appGlobalDataService:AppGlobalDataService,private _salesDataHttpService:SalesDataHttpService,private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.monthNamesArray = this._appGlobalDataService.monthNames;
      //Add Formcontrol for each items in Month Array. This will dynamically handle number of textbox based on months added
      this.monthNamesArray.forEach(item => {
          this.salesDataControls[item] = new FormControl('',Validators.required);
      });
      this.salesDataControls['txtStateName'] = new FormControl('',Validators.required);
      this.salesDataFormGroup = new FormGroup(this.salesDataControls);
  }

  onSubmit()
  {
    //Instantiate SalesRecord Array
    let salesDataArray: SalesRecord[] = [];
    //Get the value submitted from Reactive Form and convert it SalesRecord array
    Object.keys(this.salesDataFormGroup.getRawValue()).forEach((prop) => { 
      let salesRecord = <SalesRecord>{};
      if(prop != 'txtStateName')
      {
        salesRecord.Month = prop,
        salesRecord.stateName = this.salesDataFormGroup.getRawValue()['txtStateName'],
        salesRecord.Value = Number(this.salesDataFormGroup.getRawValue()[prop]),
        salesRecord.Id = Number(this.salesDataFormGroup.getRawValue()[prop])
        salesDataArray.push(salesRecord);
      }
    });
    //Call to save the data
    this._salesDataHttpService.insertSalesData(salesDataArray);
    //close the modal popup after saving data
    this.activeModal.close(true);
  }
}
