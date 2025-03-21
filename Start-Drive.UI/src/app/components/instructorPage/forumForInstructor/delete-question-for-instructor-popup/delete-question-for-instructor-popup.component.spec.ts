import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionForInstructorPopupComponent } from './delete-question-for-instructor-popup.component';

describe('DeleteQuestionForInstructorPopupComponent', () => {
  let component: DeleteQuestionForInstructorPopupComponent;
  let fixture: ComponentFixture<DeleteQuestionForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
