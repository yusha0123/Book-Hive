import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CartItemComponent } from '../components/cart-item/cart-item.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from '../constants';

@NgModule({
  declarations: [
    CartItemComponent,
    NavbarComponent,
    IconComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ToastrModule,
    CartItemComponent,
    NavbarComponent,
    IconComponent,
    MatTabsModule,
    LoginComponent,
    RegisterComponent,
    NgxUiLoaderModule,
  ],
})
export class SharedModule {}
