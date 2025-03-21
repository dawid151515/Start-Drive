import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationForStudentsPopupComponent } from './show-information-for-students-popup.component';

describe('ShowInformationForStudentsPopupComponent', () => {
  let component: ShowInformationForStudentsPopupComponent;
  let fixture: ComponentFixture<ShowInformationForStudentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInformationForStudentsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInformationForStudentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
