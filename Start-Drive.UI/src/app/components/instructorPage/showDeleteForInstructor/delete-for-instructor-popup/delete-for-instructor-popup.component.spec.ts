import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForInstructorPopupComponent } from './delete-for-instructor-popup.component';

describe('DeleteForInstructorPopupComponent', () => {
  let component: DeleteForInstructorPopupComponent;
  let fixture: ComponentFixture<DeleteForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
