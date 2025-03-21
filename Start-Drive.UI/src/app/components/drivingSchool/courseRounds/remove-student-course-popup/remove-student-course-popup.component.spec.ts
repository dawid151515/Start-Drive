import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStudentCoursePopupComponent } from './remove-student-course-popup.component';

describe('RemoveStudentCoursePopupComponent', () => {
  let component: RemoveStudentCoursePopupComponent;
  let fixture: ComponentFixture<RemoveStudentCoursePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveStudentCoursePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveStudentCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
