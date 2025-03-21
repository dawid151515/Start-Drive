import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveStudentMainCalendarPopupComponent } from './save-student-main-calendar-popup.component';

describe('SaveStudentMainCalendarPopupComponent', () => {
  let component: SaveStudentMainCalendarPopupComponent;
  let fixture: ComponentFixture<SaveStudentMainCalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveStudentMainCalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveStudentMainCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
