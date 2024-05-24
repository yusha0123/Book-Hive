import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem, Order } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addressForm: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  orderDetails: Order | null = null;
  currentStep: 'address' | 'summary' | 'success' = 'address';

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [0, Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.cartItems;
    this.calculateTotalPrice();
  }

  onAddressFormSubmit(): void {
    this.orderDetails = {
      shippingAddress: {
        ...this.addressForm.value,
      },
      orderItems: this.cartItems,
      totalPrice: this.totalPrice,
    };

    console.log(this.orderDetails);
    this.currentStep = 'summary';
  }
}
