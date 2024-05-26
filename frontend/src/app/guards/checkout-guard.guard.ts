import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

export const checkoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const cartService = inject(CartService);
  const router: Router = inject(Router);

  const totalItems = cartService.getTotalItems();

  if (totalItems > 0) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
