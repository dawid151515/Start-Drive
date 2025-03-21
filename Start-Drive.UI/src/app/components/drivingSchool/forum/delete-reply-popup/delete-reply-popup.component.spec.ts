import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReplyPopupComponent } from './delete-reply-popup.component';

describe('DeleteReplyPopupComponent', () => {
  let component: DeleteReplyPopupComponent;
  let fixture: ComponentFixture<DeleteReplyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReplyPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReplyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
