import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowForStudentPopupComponent } from './show-for-student-popup.component';

describe('ShowForStudentPopupComponent', () => {
  let component: ShowForStudentPopupComponent;
  let fixture: ComponentFixture<ShowForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
