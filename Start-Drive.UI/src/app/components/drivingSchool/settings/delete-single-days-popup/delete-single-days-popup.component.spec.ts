import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSingleDaysPopupComponent } from './delete-single-days-popup.component';

describe('DeleteSingleDaysPopupComponent', () => {
  let component: DeleteSingleDaysPopupComponent;
  let fixture: ComponentFixture<DeleteSingleDaysPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSingleDaysPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSingleDaysPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
