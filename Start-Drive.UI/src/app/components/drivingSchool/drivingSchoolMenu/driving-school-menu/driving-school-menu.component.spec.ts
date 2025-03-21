import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingSchoolMenuComponent } from './driving-school-menu.component';

describe('DrivingSchoolMenuComponent', () => {
  let component: DrivingSchoolMenuComponent;
  let fixture: ComponentFixture<DrivingSchoolMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingSchoolMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingSchoolMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
