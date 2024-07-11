import { TestBed } from '@angular/core/testing';

import { NovedadesService } from './novedades.service';

describe('NovedadesService', () => {
  let service: NovedadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
