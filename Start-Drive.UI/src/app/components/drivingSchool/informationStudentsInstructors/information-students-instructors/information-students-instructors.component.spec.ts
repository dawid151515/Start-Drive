import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationStudentsInstructorsComponent } from './information-students-instructors.component';

describe('InformationStudentsInstructorsComponent', () => {
  let component: InformationStudentsInstructorsComponent;
  let fixture: ComponentFixture<InformationStudentsInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationStudentsInstructorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationStudentsInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
