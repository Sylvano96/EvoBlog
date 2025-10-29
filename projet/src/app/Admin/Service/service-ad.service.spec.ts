import { TestBed } from '@angular/core/testing';

import { ServiceAdService } from './service-ad.service';

describe('ServiceAdService', () => {
  let service: ServiceAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
