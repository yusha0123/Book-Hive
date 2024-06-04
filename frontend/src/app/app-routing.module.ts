import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checkoutGuard } from './guards/checkout-guard.guard';

const routes: Routes = [
  {
    path: '',
    title: 'BookHive',
    loadChildren: () =>
      import('./features/root/root.module').then((m) => m.RootModule),
  },
  {
    path: 'book/:id',
    title: 'BookHive - Book Details',
    loadChildren: () =>
      import('./features/book-details/book-details.module').then(
        (m) => m.BookDetailsModule
      ),
  },
  {
    path: 'sign-in',
    title: 'Bookhive Sign In',
    loadChildren: () =>
      import('./features/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'cart',
    title: 'BookHive - Shopping Cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    title: 'BookHive - Checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
    canActivate: [checkoutGuard],
  },
  {
    path: '**',
    title: 'BookHive - Page not found',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
