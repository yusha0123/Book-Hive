import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book, CartItem } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastr: ToastrService) {}

  cartItems: CartItem[] = [];

  // Helper method to find an item in the cart
  private findCartItem(itemId: string): CartItem | undefined {
    return this.cartItems.find((item) => item._id === itemId);
  }

  addToCart(item: Book): void {
    const existingItem = this.findCartItem(item._id!);

    if (existingItem) {
      this.cartItems = this.cartItems.map((cartItem) =>
        cartItem._id === existingItem._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
      };
      this.cartItems.push(newItem);
      this.toastr.success('Item added to cart!');
    }
  }

  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
  }

  incrementCartItem(itemId: string): void {
    const existingItem = this.findCartItem(itemId);

    if (existingItem) {
      this.cartItems = this.cartItems.map((cartItem) =>
        cartItem._id === existingItem._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  }

  decrementCartItem(itemId: string): void {
    const existingItem = this.findCartItem(itemId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        this.cartItems = this.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        this.removeFromCart(itemId);
      }
    }
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }
}
