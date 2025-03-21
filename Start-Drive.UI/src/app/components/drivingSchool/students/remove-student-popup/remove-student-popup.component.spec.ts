import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStudentPopupComponent } from './remove-student-popup.component';

describe('RemoveStudentPopupComponent', () => {
  let component: RemoveStudentPopupComponent;
  let fixture: ComponentFixture<RemoveStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
