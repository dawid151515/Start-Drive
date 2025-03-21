import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationPopupComponent } from './edit-information-popup.component';

describe('EditInformationPopupComponent', () => {
  let component: EditInformationPopupComponent;
  let fixture: ComponentFixture<EditInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInformationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
