import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarDaysForInstructorComponent } from './main-calendar-days-for-instructor.component';

describe('MainCalendarDaysForInstructorComponent', () => {
  let component: MainCalendarDaysForInstructorComponent;
  let fixture: ComponentFixture<MainCalendarDaysForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalendarDaysForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarDaysForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
