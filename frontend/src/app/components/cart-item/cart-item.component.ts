import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/interfaces';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Input() index!: number;
  @Input() disableEvents: boolean = false;
  @Input() totalItems!: number;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  incrementItem() {
    this.increment.emit();
  }

  decrementItem() {
    this.decrement.emit();
  }

  removeItem() {
    this.remove.emit();
  }

  isNotLastItem(): boolean {
    // Check if the current item is not the last item in the list
    return this.cartItem && this.index < this.totalItems - 1;
  }
}
