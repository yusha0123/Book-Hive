import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './routes/root/root.component';
import { AddBookComponent } from './routes/add-book/add-book.component';
import { BookDetailsComponent } from './routes/book-details/book-details.component';

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
