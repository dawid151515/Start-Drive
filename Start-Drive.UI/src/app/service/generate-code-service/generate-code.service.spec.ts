import { TestBed } from '@angular/core/testing';

import { GenerateCodeService } from './generate-code.service';

describe('GenerateCodeService', () => {
  let service: GenerateCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
