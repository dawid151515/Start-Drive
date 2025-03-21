import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationPopupComponent } from './show-information-popup.component';

describe('ShowInformationPopupComponent', () => {
  let component: ShowInformationPopupComponent;
  let fixture: ComponentFixture<ShowInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInformationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
