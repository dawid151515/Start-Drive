import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationForInstructorsComponent } from './information-for-instructors.component';

describe('InformationForInstructorsComponent', () => {
  let component: InformationForInstructorsComponent;
  let fixture: ComponentFixture<InformationForInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationForInstructorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationForInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
