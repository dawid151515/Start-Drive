import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarForInstructorComponent } from './main-calendar-for-instructor.component';

describe('MainCalendarForInstructorComponent', () => {
  let component: MainCalendarForInstructorComponent;
  let fixture: ComponentFixture<MainCalendarForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalendarForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
