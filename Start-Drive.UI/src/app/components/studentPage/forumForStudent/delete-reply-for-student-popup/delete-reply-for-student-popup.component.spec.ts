import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReplyForStudentPopupComponent } from './delete-reply-for-student-popup.component';

describe('DeleteReplyForStudentPopupComponent', () => {
  let component: DeleteReplyForStudentPopupComponent;
  let fixture: ComponentFixture<DeleteReplyForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReplyForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReplyForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
