import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cartService: CartService) {}

  get totalCartItems(): number {
    return this.cartService.getTotalItems();
  }
}
