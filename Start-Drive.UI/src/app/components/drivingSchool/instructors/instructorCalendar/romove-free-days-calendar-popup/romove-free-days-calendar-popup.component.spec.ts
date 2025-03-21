import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomoveFreeDaysCalendarPopupComponent } from './romove-free-days-calendar-popup.component';

describe('RomoveFreeDaysCalendarPopupComponent', () => {
  let component: RomoveFreeDaysCalendarPopupComponent;
  let fixture: ComponentFixture<RomoveFreeDaysCalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomoveFreeDaysCalendarPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomoveFreeDaysCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
