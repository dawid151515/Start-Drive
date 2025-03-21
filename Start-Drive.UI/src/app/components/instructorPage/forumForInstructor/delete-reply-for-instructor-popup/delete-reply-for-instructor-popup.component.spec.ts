import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReplyForInstructorPopupComponent } from './delete-reply-for-instructor-popup.component';

describe('DeleteReplyForInstructorPopupComponent', () => {
  let component: DeleteReplyForInstructorPopupComponent;
  let fixture: ComponentFixture<DeleteReplyForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReplyForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReplyForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
