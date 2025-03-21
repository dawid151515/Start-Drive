import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForInstructorComponent } from './forum-for-instructor.component';

describe('ForumForInstructorComponent', () => {
  let component: ForumForInstructorComponent;
  let fixture: ComponentFixture<ForumForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
