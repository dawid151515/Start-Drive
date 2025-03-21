import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionForStudentPopupComponent } from './delete-question-for-student-popup.component';

describe('DeleteQuestionForStudentPopupComponent', () => {
  let component: DeleteQuestionForStudentPopupComponent;
  let fixture: ComponentFixture<DeleteQuestionForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
