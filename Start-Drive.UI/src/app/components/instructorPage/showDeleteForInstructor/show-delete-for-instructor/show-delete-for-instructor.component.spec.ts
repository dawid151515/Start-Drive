import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeleteForInstructorComponent } from './show-delete-for-instructor.component';

describe('ShowDeleteForInstructorComponent', () => {
  let component: ShowDeleteForInstructorComponent;
  let fixture: ComponentFixture<ShowDeleteForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDeleteForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDeleteForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
