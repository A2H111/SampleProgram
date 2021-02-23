import { TestBed } from '@angular/core/testing';

import { SalesDataHttp.ServiceService } from './sales-data-http.service.service';

describe('SalesDataHttp.ServiceService', () => {
  let service: SalesDataHttp.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesDataHttp.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
