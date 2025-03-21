import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstuctorsCalendarDaysForStudentComponent } from './instuctors-calendar-days-for-student.component';

describe('InstuctorsCalendarDaysForStudentComponent', () => {
  let component: InstuctorsCalendarDaysForStudentComponent;
  let fixture: ComponentFixture<InstuctorsCalendarDaysForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstuctorsCalendarDaysForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstuctorsCalendarDaysForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
