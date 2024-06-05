import { Component, OnInit } from '@angular/core';
import { CartItem, UserCart } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cart!: UserCart;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadCartItems();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.calculateTotalPrice();
      },
    });
  }

  incrementItem(itemId: string): void {
    // this.cartService.incrementCartItem(itemId);
    this.loadCartItems();
  }

  decrementItem(itemId: string): void {
    // this.cartService.decrementCartItem(itemId);
    this.loadCartItems();
  }

  removeItem(itemId: string): void {
    // this.cartService.removeFromCart(itemId);
    this.loadCartItems();
  }
}
