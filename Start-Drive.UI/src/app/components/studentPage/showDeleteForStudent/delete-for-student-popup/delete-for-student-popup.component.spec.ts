import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForStudentPopupComponent } from './delete-for-student-popup.component';

describe('DeleteForStudentPopupComponent', () => {
  let component: DeleteForStudentPopupComponent;
  let fixture: ComponentFixture<DeleteForStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteForStudentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteForStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
