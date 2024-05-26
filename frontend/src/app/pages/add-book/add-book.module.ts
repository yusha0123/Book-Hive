import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AddBookComponent,
  },
];

@NgModule({
  declarations: [AddBookComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AddBookModule {}
