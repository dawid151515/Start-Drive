import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStudentMainCalendarPopupComponent } from './remove-student-main-calendar-popup.component';

describe('RemoveStudentMainCalendarPopupComponent', () => {
  let component: RemoveStudentMainCalendarPopupComponent;
  let fixture: ComponentFixture<RemoveStudentMainCalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveStudentMainCalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveStudentMainCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
