import { TestBed } from '@angular/core/testing';

import { FacebookService } from './facebook.service';

describe('FacebookService', () => {
  let service: FacebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
