import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { SalesRecord } from '../interfaces/salesRecord';
import { SalesDataHttpService } from '../services/sales-data-http.service.service';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobalDataService } from '../services/app-global-data-service';
import { UtilService } from '../services/util-service';

@Component({
  selector: 'app-xyz-sales-list',
  templateUrl: './xyz-sales-list.component.html',
  styleUrls: ['./xyz-sales-list.component.css']
})
export class XyzSalesListComponent implements OnInit,OnDestroy {

  private gridApi:any;
  private gridColumnApi:any;
  public salesDataList : SalesRecord[]=[];
  public salesDataList1 : SalesRecord[]=[];
  public salesGroupedByState :any;
  public salesGroupedByMonth :any;
  public rowData: any;
  public columnDefs: any;
  public stateArray: []=[];
  public monthArray: string[]=[];
  private ngUnsubscribe: Subject<any> = new Subject();
  modalOption: NgbModalOptions = {};
  constructor(private _salesDataHttpService:SalesDataHttpService,private _modalPopup:NgbModal,
    private _appGlobalDataService:AppGlobalDataService,private _utilService:UtilService) { 
  }

  ngOnInit(): void {
    this._salesDataHttpService.getSalesData()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      this.salesDataList = data["result"];
      this.salesGroupedByState = this._utilService.groupByFuntion(this.salesDataList, 'stateName');   
      this.salesGroupedByMonth = this._utilService.groupByFuntion(this.salesDataList, 'month');  
      
      this.salesGroupedByMonth.forEach(i => {
        this.monthArray.push(i.key);
      });
      this._appGlobalDataService.monthNames = this.monthArray;

      this.columnDefs = [
        { headerName: '', field: 'month' },
      ];
      this.salesGroupedByState.forEach(s => {
        this.columnDefs.push({ headerName: s.key , field: s.key});      
      });
      this.rowData=[];
      this.salesGroupedByMonth.forEach(s => {
        var jsonObj = {};
        jsonObj["month"] = s.key;
        s.values.forEach(v=> { jsonObj[v.stateName] = (v.value > 0 ? v.value : 0);});
        this.rowData.push(jsonObj);
      });
    });
  }

  onAddNewColumn() {
    var columnDefs = this.gridApi.getColumnDefs();
    this.colDefsAthleteExcluded.forEach(function(colDef) {
      columnDefs.push(colDef);
    });     
    this.columnDefs = columnDefs;
  }

  onAddNewRow(){   
    var columnIndex = this.gridApi.getDisplayedRowCount();
    this.rowData[columnIndex] = { month: 'April', value: 500 };
    this.gridApi.setRowData(this.rowData);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }

  colDefsAthleteExcluded = [
    { headerName: 'Arizona', field: 'Arizona' }
  ]

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
