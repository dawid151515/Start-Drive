import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructorPopupComponent } from './edit-instructor-popup.component';

describe('EditInstructorPopupComponent', () => {
  let component: EditInstructorPopupComponent;
  let fixture: ComponentFixture<EditInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
