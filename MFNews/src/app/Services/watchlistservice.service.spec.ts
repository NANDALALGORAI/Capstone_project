import { TestBed } from '@angular/core/testing';

import { WatchlistserviceService } from './watchlistservice.service';

describe('WatchlistserviceService', () => {
  let service: WatchlistserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
