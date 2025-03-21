import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionForInstructorPopupComponent } from './answer-question-for-instructor-popup.component';

describe('AnswerQuestionForInstructorPopupComponent', () => {
  let component: AnswerQuestionForInstructorPopupComponent;
  let fixture: ComponentFixture<AnswerQuestionForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerQuestionForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerQuestionForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
