import { TestBed } from '@angular/core/testing';

import { FleetService } from './fleet.service';

describe('FleetServiceTs', () => {
  let service: FleetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
