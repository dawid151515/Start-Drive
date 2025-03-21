import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveStudentCalendarPopupComponent } from './save-student-calendar-popup.component';

describe('SaveStudentCalendarPopupComponent', () => {
  let component: SaveStudentCalendarPopupComponent;
  let fixture: ComponentFixture<SaveStudentCalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveStudentCalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveStudentCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
