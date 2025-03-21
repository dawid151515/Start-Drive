import { TestBed } from '@angular/core/testing';

import { AboutDrivingSchoolService } from './about-driving-school.service';

describe('AboutDrivingSchoolService', () => {
  let service: AboutDrivingSchoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutDrivingSchoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
