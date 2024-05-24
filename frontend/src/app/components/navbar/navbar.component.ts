import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private cartService: CartService) {}

  get totalCartItems(): number {
    return this.cartService.getTotalItems();
  }
}
