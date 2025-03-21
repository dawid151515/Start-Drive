import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStudentCalendarPopupComponent } from './remove-student-calendar-popup.component';

describe('RemoveStudentCalendarPopupComponent', () => {
  let component: RemoveStudentCalendarPopupComponent;
  let fixture: ComponentFixture<RemoveStudentCalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveStudentCalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveStudentCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
