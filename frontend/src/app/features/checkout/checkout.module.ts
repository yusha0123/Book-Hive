import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { isAuthenticated } from 'src/app/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticated],
    component: CheckoutComponent,
  },
];

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CheckoutModule {}
