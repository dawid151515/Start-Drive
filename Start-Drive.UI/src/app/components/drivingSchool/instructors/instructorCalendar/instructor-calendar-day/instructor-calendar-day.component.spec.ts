import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCalendarDayComponent } from './instructor-calendar-day.component';

describe('InstructorCalendarDayComponent', () => {
  let component: InstructorCalendarDayComponent;
  let fixture: ComponentFixture<InstructorCalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCalendarDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
