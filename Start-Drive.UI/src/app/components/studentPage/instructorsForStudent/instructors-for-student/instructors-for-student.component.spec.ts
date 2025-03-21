import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsForStudentComponent } from './instructors-for-student.component';

describe('InstructorsForStudentComponent', () => {
  let component: InstructorsForStudentComponent;
  let fixture: ComponentFixture<InstructorsForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorsForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
