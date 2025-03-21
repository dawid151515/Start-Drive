import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDrivingSchoolComponent } from './about-driving-school.component';

describe('AboutDrivingSchoolComponent', () => {
  let component: AboutDrivingSchoolComponent;
  let fixture: ComponentFixture<AboutDrivingSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDrivingSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDrivingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
