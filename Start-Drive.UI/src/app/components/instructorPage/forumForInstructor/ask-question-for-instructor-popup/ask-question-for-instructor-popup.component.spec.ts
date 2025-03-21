import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionForInstructorPopupComponent } from './ask-question-for-instructor-popup.component';

describe('AskQuestionForInstructorPopupComponent', () => {
  let component: AskQuestionForInstructorPopupComponent;
  let fixture: ComponentFixture<AskQuestionForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskQuestionForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQuestionForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
