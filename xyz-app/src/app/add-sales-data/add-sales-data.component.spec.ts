import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesDataComponent } from './add-sales-data.component';

describe('AddSalesDataComponent', () => {
  let component: AddSalesDataComponent;
  let fixture: ComponentFixture<AddSalesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
