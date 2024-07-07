import { TestBed } from '@angular/core/testing';

import { PropietarioService } from './propietario.service';

describe('PropietarioService', () => {
  let service: PropietarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropietarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
