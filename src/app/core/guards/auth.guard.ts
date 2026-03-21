import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Optionally check for roles if route requires admin
    if (route.data['role'] && route.data['role'] !== authService.getRole()) {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  router.navigate(['/']);
  return false;
};
