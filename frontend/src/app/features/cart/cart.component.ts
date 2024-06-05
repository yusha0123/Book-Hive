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
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.cartService.updateCart('increment', itemId).subscribe({
      next: () => {
        this.updateCart('increment', itemId);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  decrementItem(itemId: string): void {
    this.cartService.updateCart('decrement', itemId).subscribe({
      next: () => {
        this.updateCart('decrement', itemId);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  removeItem(itemId: string): void {
    this.cartService.updateCart('remove', itemId).subscribe({
      next: () => {
        this.updateCart('remove', itemId);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  updateCart(
    action: 'increment' | 'decrement' | 'remove',
    itemId: string
  ): void {
    const itemIndex = this.cart.items.findIndex(
      (item) => item.book._id === itemId
    );
    if (itemIndex !== -1) {
      switch (action) {
        case 'increment':
          this.cart.items[itemIndex].quantity++;
          break;
        case 'decrement':
          if (this.cart.items[itemIndex].quantity > 1) {
            this.cart.items[itemIndex].quantity--;
          }
          break;
        case 'remove':
          this.cart.items.splice(itemIndex, 1);
          break;
      }
      this.calculateTotalPrice();
    }
  }
}
