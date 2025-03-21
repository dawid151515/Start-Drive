import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCourseRoundPopupComponent } from './remove-course-round-popup.component';

describe('RemoveCourseRoundPopupComponent', () => {
  let component: RemoveCourseRoundPopupComponent;
  let fixture: ComponentFixture<RemoveCourseRoundPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCourseRoundPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveCourseRoundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
