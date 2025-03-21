import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRoundsForInstructorComponent } from './course-rounds-for-instructor.component';

describe('CourseRoundsForInstructorComponent', () => {
  let component: CourseRoundsForInstructorComponent;
  let fixture: ComponentFixture<CourseRoundsForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRoundsForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseRoundsForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
