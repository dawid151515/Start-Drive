import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseRoundPopupComponent } from './edit-course-round-popup.component';

describe('EditCourseRoundPopupComponent', () => {
  let component: EditCourseRoundPopupComponent;
  let fixture: ComponentFixture<EditCourseRoundPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseRoundPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseRoundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
