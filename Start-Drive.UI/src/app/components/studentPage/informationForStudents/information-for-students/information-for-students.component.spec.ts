import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationForStudentsComponent } from './information-for-students.component';

describe('InformationForStudentsComponent', () => {
  let component: InformationForStudentsComponent;
  let fixture: ComponentFixture<InformationForStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationForStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
