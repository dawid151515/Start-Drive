import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLoginCodeInstructorsPopupComponent } from './generate-login-code-instructors-popup.component';

describe('GenerateLoginCodeInstructorsPopupComponent', () => {
  let component: GenerateLoginCodeInstructorsPopupComponent;
  let fixture: ComponentFixture<GenerateLoginCodeInstructorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLoginCodeInstructorsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLoginCodeInstructorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
