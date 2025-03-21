import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageForStudentComponent } from './home-page-for-student.component';

describe('HomePageForStudentComponent', () => {
  let component: HomePageForStudentComponent;
  let fixture: ComponentFixture<HomePageForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
