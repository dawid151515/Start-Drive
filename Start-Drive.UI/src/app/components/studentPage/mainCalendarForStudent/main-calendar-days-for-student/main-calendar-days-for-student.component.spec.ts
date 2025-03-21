import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarDaysForStudentComponent } from './main-calendar-days-for-student.component';

describe('MainCalendarDaysForStudentComponent', () => {
  let component: MainCalendarDaysForStudentComponent;
  let fixture: ComponentFixture<MainCalendarDaysForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalendarDaysForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarDaysForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
