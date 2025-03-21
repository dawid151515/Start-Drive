import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsHoursPopupComponent } from './lessons-hours-popup.component';

describe('LessonsHoursPopupComponent', () => {
  let component: LessonsHoursPopupComponent;
  let fixture: ComponentFixture<LessonsHoursPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsHoursPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsHoursPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
