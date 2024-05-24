import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './routes/root/root.component';
import { AddBookComponent } from './routes/add-book/add-book.component';
import { BookDetailsComponent } from './routes/book-details/book-details.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { CartComponent } from './routes/cart/cart.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';

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
