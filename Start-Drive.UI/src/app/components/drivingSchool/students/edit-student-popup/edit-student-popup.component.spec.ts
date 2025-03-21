import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentPopupComponent } from './edit-student-popup.component';

describe('EditStudentPopupComponent', () => {
  let component: EditStudentPopupComponent;
  let fixture: ComponentFixture<EditStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
