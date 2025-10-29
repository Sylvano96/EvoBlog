import { TestBed } from '@angular/core/testing';

import { GoToAnotherPageService } from './go-to-another-page.service';

describe('GoToAnotherPageService', () => {
  let service: GoToAnotherPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoToAnotherPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
