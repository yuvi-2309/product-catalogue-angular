import { CanActivateFn } from '@angular/router';

// The LoginGuard function checks if there is a token in the localStorage and returns false if there is one, otherwise it returns true.
export const LoginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return false;
  }
  return true;
};
