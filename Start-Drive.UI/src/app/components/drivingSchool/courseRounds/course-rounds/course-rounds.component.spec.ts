import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRoundsComponent } from './course-rounds.component';

describe('CourseRoundsComponent', () => {
  let component: CourseRoundsComponent;
  let fixture: ComponentFixture<CourseRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
