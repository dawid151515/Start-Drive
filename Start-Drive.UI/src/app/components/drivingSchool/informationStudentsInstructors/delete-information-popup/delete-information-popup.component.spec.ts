import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInformationPopupComponent } from './delete-information-popup.component';

describe('DeleteInformationPopupComponent', () => {
  let component: DeleteInformationPopupComponent;
  let fixture: ComponentFixture<DeleteInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInformationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
