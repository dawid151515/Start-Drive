import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformationPopupComponent } from './add-information-popup.component';

describe('AddInformationPopupComponent', () => {
  let component: AddInformationPopupComponent;
  let fixture: ComponentFixture<AddInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInformationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
