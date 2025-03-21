import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionPopupComponent } from './ask-question-popup.component';

describe('AskQuestionPopupComponent', () => {
  let component: AskQuestionPopupComponent;
  let fixture: ComponentFixture<AskQuestionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskQuestionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQuestionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
