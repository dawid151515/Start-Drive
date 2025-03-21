import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsHomePageComponent } from './instructors-home-page.component';

describe('InstructorsHomePageComponent', () => {
  let component: InstructorsHomePageComponent;
  let fixture: ComponentFixture<InstructorsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
