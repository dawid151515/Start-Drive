import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDaysInstructorPopupComponent } from './free-days-instructor-popup.component';

describe('FreeDaysInstructorPopupComponent', () => {
  let component: FreeDaysInstructorPopupComponent;
  let fixture: ComponentFixture<FreeDaysInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeDaysInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeDaysInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
