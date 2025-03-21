import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionPopupComponent } from './delete-question-popup.component';

describe('DeleteQuestionPopupComponent', () => {
  let component: DeleteQuestionPopupComponent;
  let fixture: ComponentFixture<DeleteQuestionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
