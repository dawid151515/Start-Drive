import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionPopupComponent } from './answer-question-popup.component';

describe('AnswerQuestionPopupComponent', () => {
  let component: AnswerQuestionPopupComponent;
  let fixture: ComponentFixture<AnswerQuestionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerQuestionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerQuestionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
