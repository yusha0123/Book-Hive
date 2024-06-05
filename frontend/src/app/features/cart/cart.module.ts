import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { isAuthenticated } from 'src/app/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticated],
    component: CartComponent,
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CartModule {}
