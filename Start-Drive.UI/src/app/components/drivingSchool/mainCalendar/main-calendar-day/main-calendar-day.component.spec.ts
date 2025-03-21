import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarDayComponent } from './main-calendar-day.component';

describe('MainCalendarDayComponent', () => {
  let component: MainCalendarDayComponent;
  let fixture: ComponentFixture<MainCalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalendarDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
