import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartItem, Order, OrderItem } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

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
  loading: boolean = false;
  response!: Order;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [0, Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.loadCartItems();
  }

  // calculateTotalPrice(): void {
  //   this.totalPrice = this.cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // }

  // loadCartItems(): void {
  //   this.cartItems = this.cartService.cartItems;
  //   this.calculateTotalPrice();
  // }

  // transformCartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
  //   return cartItems.map((item) => ({
  //     book: item._id as string,
  //     qty: item.quantity,
  //   }));
  // }

  onAddressFormSubmit(): void {
    if (this.addressForm.invalid) {
      return;
    }

    // const transformedOrderItems = this.transformCartItemsToOrderItems(
    //   this.cartItems
    // );

    // this.orderDetails = {
    //   shippingAddress: {
    //     ...this.addressForm.value,
    //   },
    //   orderItems: transformedOrderItems,
    //   totalPrice: this.totalPrice,
    // };

    this.currentStep = 'summary';
  }

  onOrderPlace(): void {
    this.loading = true;
    this.orderService.createOrder(this.orderDetails!).subscribe({
      next: (response) => {
        this.currentStep = 'success';
        this.loading = false;
        this.response = response;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Failed to create order!');
      },
    });
  }
}
