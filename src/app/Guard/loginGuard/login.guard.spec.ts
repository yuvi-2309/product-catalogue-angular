import { TestBed } from '@angular/core/testing';
import { CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: CanActivateFn;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = LoginGuard;
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if token is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('example_token');

    const result = guard(null, mockSnapshot);

    expect(result).toBe(false);
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should return true if token is not present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard(null, mockSnapshot);

    expect(result).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });
});
