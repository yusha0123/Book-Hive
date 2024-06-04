import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BookDetailsComponent,
  },
];

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class BookDetailsModule {}
