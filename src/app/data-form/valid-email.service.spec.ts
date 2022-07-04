import { TestBed } from '@angular/core/testing';

import { ValidEmailService } from './valid-email.service';

describe('ValidEmailService', () => {
  let service: ValidEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
