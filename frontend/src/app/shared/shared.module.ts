import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CartItemComponent } from '../components/cart-item/cart-item.component';
import { IconComponent } from '../components/icon/icon.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { ngxUiLoaderConfig } from '../constants';
import { FirstWordPipe } from '../pipes/first-word.pipe';

@NgModule({
  declarations: [
    CartItemComponent,
    NavbarComponent,
    IconComponent,
    LoginComponent,
    RegisterComponent,
    FirstWordPipe,
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
    FirstWordPipe,
  ],
})
export class SharedModule {}
