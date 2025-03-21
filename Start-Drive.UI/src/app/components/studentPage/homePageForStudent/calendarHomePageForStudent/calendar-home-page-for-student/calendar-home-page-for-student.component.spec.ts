import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHomePageForStudentComponent } from './calendar-home-page-for-student.component';

describe('CalendarHomePageForStudentComponent', () => {
  let component: CalendarHomePageForStudentComponent;
  let fixture: ComponentFixture<CalendarHomePageForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHomePageForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHomePageForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
