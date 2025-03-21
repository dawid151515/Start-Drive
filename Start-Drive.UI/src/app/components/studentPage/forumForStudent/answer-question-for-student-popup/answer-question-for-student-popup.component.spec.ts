import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionForStudentPopupComponent } from './answer-question-for-student-popup.component';

describe('AnswerQuestionForStudentPopupComponent', () => {
  let component: AnswerQuestionForStudentPopupComponent;
  let fixture: ComponentFixture<AnswerQuestionForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerQuestionForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerQuestionForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
