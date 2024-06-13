import { TestBed } from '@angular/core/testing';

import { TaseronService } from './taseron.service';

describe('TaseronService', () => {
  let service: TaseronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaseronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
