import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationForInstructorsPopupComponent } from './show-information-for-instructors-popup.component';

describe('ShowInformationForInstructorsPopupComponent', () => {
  let component: ShowInformationForInstructorsPopupComponent;
  let fixture: ComponentFixture<ShowInformationForInstructorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInformationForInstructorsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInformationForInstructorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
