import { CanActivateFn } from '@angular/router';

// This TypeScript function checks if a user is authenticated by verifying the presence of a token in the local storage.
export const HomeGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};
