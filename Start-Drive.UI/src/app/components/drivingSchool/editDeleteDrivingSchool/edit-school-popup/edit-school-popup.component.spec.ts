import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolPopupComponent } from './edit-school-popup.component';

describe('EditSchoolPopupComponent', () => {
  let component: EditSchoolPopupComponent;
  let fixture: ComponentFixture<EditSchoolPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchoolPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchoolPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
