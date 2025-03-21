import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseRoundPopupComponent } from './add-course-round-popup.component';

describe('AddCourseRoundPopupComponent', () => {
  let component: AddCourseRoundPopupComponent;
  let fixture: ComponentFixture<AddCourseRoundPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseRoundPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseRoundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
