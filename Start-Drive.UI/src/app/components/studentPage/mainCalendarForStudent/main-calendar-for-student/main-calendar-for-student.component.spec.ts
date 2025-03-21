import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarForStudentComponent } from './main-calendar-for-student.component';

describe('MainCalendarForStudentComponent', () => {
  let component: MainCalendarForStudentComponent;
  let fixture: ComponentFixture<MainCalendarForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalendarForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
