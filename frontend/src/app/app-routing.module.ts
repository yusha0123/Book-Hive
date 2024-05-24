import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    title: 'BookHive',
    component: RootComponent,
  },
  {
    path: 'add-book',
    title: 'BookHive - Add a Book',
    component: AddBookComponent,
  },
  {
    path: 'book/:id',
    title: 'BookHive - Book Details',
    component: BookDetailsComponent,
  },
  {
    path: 'cart',
    title: 'BookHive - Shopping Cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    title: 'BookHive - Checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    title: 'BookHive - Page not found',
    component: NotFoundComponent,
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
