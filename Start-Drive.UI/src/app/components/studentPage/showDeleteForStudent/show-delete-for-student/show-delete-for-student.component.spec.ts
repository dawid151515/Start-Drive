import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeleteForStudentComponent } from './show-delete-for-student.component';

describe('ShowDeleteForStudentComponent', () => {
  let component: ShowDeleteForStudentComponent;
  let fixture: ComponentFixture<ShowDeleteForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDeleteForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDeleteForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
