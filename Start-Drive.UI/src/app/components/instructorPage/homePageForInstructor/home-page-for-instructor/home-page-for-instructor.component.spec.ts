import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageForInstructorComponent } from './home-page-for-instructor.component';

describe('HomePageForInstructorComponent', () => {
  let component: HomePageForInstructorComponent;
  let fixture: ComponentFixture<HomePageForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageForInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
