import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorPopupComponent } from './add-instructor-popup.component';

describe('AddInstructorPopupComponent', () => {
  let component: AddInstructorPopupComponent;
  let fixture: ComponentFixture<AddInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
