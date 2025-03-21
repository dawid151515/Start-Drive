import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHomePageForInstructorComponent } from './calendar-home-page-for-instructor.component';

describe('CalendarHomePageForInstructorComponent', () => {
  let component: CalendarHomePageForInstructorComponent;
  let fixture: ComponentFixture<CalendarHomePageForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHomePageForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHomePageForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
