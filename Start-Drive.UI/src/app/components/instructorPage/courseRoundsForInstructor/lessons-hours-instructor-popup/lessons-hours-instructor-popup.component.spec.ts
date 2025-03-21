import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsHoursInstructorPopupComponent } from './lessons-hours-instructor-popup.component';

describe('LessonsHoursInstructorPopupComponent', () => {
  let component: LessonsHoursInstructorPopupComponent;
  let fixture: ComponentFixture<LessonsHoursInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsHoursInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsHoursInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
