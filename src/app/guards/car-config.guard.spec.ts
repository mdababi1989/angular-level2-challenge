import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carConfigGuard } from './car-config.guard';

describe('carConfigGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carConfigGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
