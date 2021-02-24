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
import { AddSalesDataComponent } from '../add-sales-data/add-sales-data.component';

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
    this.onLoadSalesData();
  }

onLoadSalesData()
{
  //Get Sales data from database. Used takeUntil to resolve the memory leak issue with subscribe
  this._salesDataHttpService.getSalesData()
  .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe(data => {
    this.salesDataList = data["result"];
    //Groupby the data by State. This is to find the column header required for the grid
    this.salesGroupedByState = this._utilService.groupByFuntion(this.salesDataList, 'stateName');   
    //Group by the data by Month. This is to find the row header required for the grid
    this.salesGroupedByMonth = this._utilService.groupByFuntion(this.salesDataList, 'month');  
    //Get the Month array extracted from data and assign it to global data service
    this.onGetMonthArray();
    
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
    //set the rowdata to refresh grid
    this.gridApi.setRowData(this.rowData);
  });

}

onGetMonthArray()
{
  //Loop through the grouped my month data and get the key out which will give the month names with out duplicates
  this.salesGroupedByMonth.forEach(i => {
    this.monthArray.push(i.key);
  });
  //Assign it to global data service
  this._appGlobalDataService.monthNames = this.monthArray;

}

  //Code to open the Modal Popup window. we used Ngbootstap modal popup window
  onAddNewRow(){   
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef =this._modalPopup.open(AddSalesDataComponent, this.modalOption);   
    modalRef.result.then((result) => {
      debugger;
          if (result) {
                 this.onLoadSalesData();
          }
      });
    var columnIndex = this.gridApi.getDisplayedRowCount();
    this.gridApi.setRowData(this.rowData);
  }

  //Ag Grid specific methods
  onAddNewColumn() {
    var columnDefs = this.gridApi.getColumnDefs();
    this.colDefsAthleteExcluded.forEach(function(colDef) {
      columnDefs.push(colDef);
    });     
    this.columnDefs = columnDefs;
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
