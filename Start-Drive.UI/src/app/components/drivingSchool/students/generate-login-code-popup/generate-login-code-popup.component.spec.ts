import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLoginCodePopupComponent } from './generate-login-code-popup.component';

describe('GenerateLoginCodePopupComponent', () => {
  let component: GenerateLoginCodePopupComponent;
  let fixture: ComponentFixture<GenerateLoginCodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLoginCodePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLoginCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
