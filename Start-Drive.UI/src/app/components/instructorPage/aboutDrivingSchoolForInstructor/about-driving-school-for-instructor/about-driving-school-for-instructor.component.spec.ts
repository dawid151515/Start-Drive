import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDrivingSchoolForInstructorComponent } from './about-driving-school-for-instructor.component';

describe('AboutDrivingSchoolForInstructorComponent', () => {
  let component: AboutDrivingSchoolForInstructorComponent;
  let fixture: ComponentFixture<AboutDrivingSchoolForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDrivingSchoolForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDrivingSchoolForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
