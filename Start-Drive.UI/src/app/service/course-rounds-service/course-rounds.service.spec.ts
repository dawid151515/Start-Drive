import { TestBed } from '@angular/core/testing';

import { CourseRoundsService } from './course-rounds.service';

describe('CourseRoundsService', () => {
  let service: CourseRoundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRoundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
