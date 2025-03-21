import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteSchoolComponent } from './edit-delete-school.component';

describe('EditDeleteSchoolComponent', () => {
  let component: EditDeleteSchoolComponent;
  let fixture: ComponentFixture<EditDeleteSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
