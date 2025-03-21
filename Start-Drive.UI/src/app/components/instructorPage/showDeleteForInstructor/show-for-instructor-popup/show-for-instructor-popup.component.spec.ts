import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowForInstructorPopupComponent } from './show-for-instructor-popup.component';

describe('ShowForInstructorPopupComponent', () => {
  let component: ShowForInstructorPopupComponent;
  let fixture: ComponentFixture<ShowForInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowForInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowForInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
