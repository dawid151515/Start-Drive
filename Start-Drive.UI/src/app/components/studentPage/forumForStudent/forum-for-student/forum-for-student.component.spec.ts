import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForStudentComponent } from './forum-for-student.component';

describe('ForumForStudentComponent', () => {
  let component: ForumForStudentComponent;
  let fixture: ComponentFixture<ForumForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
