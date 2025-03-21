import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveInstructorPopupComponent } from './remove-instructor-popup.component';

describe('RemoveInstructorPopupComponent', () => {
  let component: RemoveInstructorPopupComponent;
  let fixture: ComponentFixture<RemoveInstructorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveInstructorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveInstructorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
