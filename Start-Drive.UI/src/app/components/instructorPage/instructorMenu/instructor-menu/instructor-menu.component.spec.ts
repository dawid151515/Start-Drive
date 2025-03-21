import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMenuComponent } from './instructor-menu.component';

describe('InstructorMenuComponent', () => {
  let component: InstructorMenuComponent;
  let fixture: ComponentFixture<InstructorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
