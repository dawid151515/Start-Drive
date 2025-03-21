import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSchoolPopupComponent } from './delete-school-popup.component';

describe('DeleteSchoolPopupComponent', () => {
  let component: DeleteSchoolPopupComponent;
  let fixture: ComponentFixture<DeleteSchoolPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSchoolPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSchoolPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
