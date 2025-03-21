import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsPopupComponent } from './add-students-popup.component';

describe('AddStudentsPopupComponent', () => {
  let component: AddStudentsPopupComponent;
  let fixture: ComponentFixture<AddStudentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
