import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDrivingSchoolForStudentComponent } from './about-driving-school-for-student.component';

describe('AboutDrivingSchoolForStudentComponent', () => {
  let component: AboutDrivingSchoolForStudentComponent;
  let fixture: ComponentFixture<AboutDrivingSchoolForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDrivingSchoolForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDrivingSchoolForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
