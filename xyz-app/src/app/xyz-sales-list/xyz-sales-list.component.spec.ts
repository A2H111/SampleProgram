import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XyzSalesListComponent } from './xyz-sales-list.component';

describe('XyzSalesListComponent', () => {
  let component: XyzSalesListComponent;
  let fixture: ComponentFixture<XyzSalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XyzSalesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XyzSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
