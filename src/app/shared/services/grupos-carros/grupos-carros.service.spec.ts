import { TestBed } from '@angular/core/testing';

import { GruposCarrosService } from './grupos-carros.service';

describe('GruposCarrosService', () => {
  let service: GruposCarrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposCarrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
