import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionForStudentPopupComponent } from './ask-question-for-student-popup.component';

describe('AskQuestionForStudentPopupComponent', () => {
  let component: AskQuestionForStudentPopupComponent;
  let fixture: ComponentFixture<AskQuestionForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskQuestionForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQuestionForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
