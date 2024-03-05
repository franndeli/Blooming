import { TestBed } from '@angular/core/testing';

import { EnrutamientoService } from './enrutamiento.service';

describe('EnrutamientoService', () => {
  let service: EnrutamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrutamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
