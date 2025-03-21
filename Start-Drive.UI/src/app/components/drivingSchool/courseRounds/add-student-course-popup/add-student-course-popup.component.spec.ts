import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentCoursePopupComponent } from './add-student-course-popup.component';

describe('AddStudentCoursePopupComponent', () => {
  let component: AddStudentCoursePopupComponent;
  let fixture: ComponentFixture<AddStudentCoursePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentCoursePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
