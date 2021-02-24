import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzSalesListComponent } from './xyz-sales-list/xyz-sales-list.component';
import { SalesDataHttpService } from './services/sales-data-http.service.service';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobalDataService } from './services/app-global-data-service';
import { AddSalesDataComponent } from './add-sales-data/add-sales-data.component';

@NgModule({
  declarations: [
    AppComponent,
    XyzSalesListComponent,
    AddSalesDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppGlobalDataService,SalesDataHttpService,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
