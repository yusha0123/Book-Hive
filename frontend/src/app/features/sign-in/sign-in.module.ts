import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { unAuthenticated } from 'src/app/guards/un-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [unAuthenticated],
    component: SignInComponent,
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class SignInModule {}
