import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checkoutGuard } from './guards/checkout-guard.guard';

const routes: Routes = [
  {
    path: '',
    title: 'BookHive',
    loadChildren: () =>
      import('./pages/root/root.module').then((m) => m.RootModule),
  },
  {
    path: 'add-book',
    title: 'BookHive - Add a Book',
    loadChildren: () =>
      import('./pages/add-book/add-book.module').then((m) => m.AddBookModule),
  },
  {
    path: 'book/:id',
    title: 'BookHive - Book Details',
    loadChildren: () =>
      import('./pages/book-details/book-details.module').then(
        (m) => m.BookDetailsModule
      ),
  },
  {
    path: 'cart',
    title: 'BookHive - Shopping Cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    title: 'BookHive - Checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
    canActivate: [checkoutGuard],
  },
  {
    path: '**',
    title: 'BookHive - Page not found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
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
