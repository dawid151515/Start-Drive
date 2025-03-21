import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstuctorsCalendarForStudentComponent } from './instuctors-calendar-for-student.component';

describe('InstuctorsCalendarForStudentComponent', () => {
  let component: InstuctorsCalendarForStudentComponent;
  let fixture: ComponentFixture<InstuctorsCalendarForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstuctorsCalendarForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstuctorsCalendarForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
