import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsForInstructorComponent } from './students-for-instructor.component';

describe('StudentsForInstructorComponent', () => {
  let component: StudentsForInstructorComponent;
  let fixture: ComponentFixture<StudentsForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
