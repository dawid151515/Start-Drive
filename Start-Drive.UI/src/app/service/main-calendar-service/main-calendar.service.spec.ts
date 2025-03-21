import { TestBed } from '@angular/core/testing';

import { MainCalendarService } from './main-calendar.service';

describe('MainCalendarService', () => {
  let service: MainCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
