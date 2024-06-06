import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { postalCodeValidator } from 'src/app/helpers';
import { Order, OrderItem, UserCart } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addressForm: FormGroup;
  cart: UserCart | null = null;
  isEmpty: boolean = false;
  totalPrice: number | undefined = undefined;
  orderDetails: Order | null = null;
  currentStep: 'address' | 'summary' | 'success' = 'address';
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
      postalCode: [null, [Validators.required, postalCodeValidator()]],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart?.items?.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  }
  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (cart) => {
        if (!cart || cart.items.length === 0) {
          this.isEmpty = true;
        } else {
          this.cart = cart;
          this.calculateTotalPrice();
        }
      },
    });
  }

  transformCartItemsToOrderItems(cart: UserCart): OrderItem[] {
    return cart.items
      .filter((item) => item.book?._id) // Filter out items with undefined or falsy book._id
      .map((item) => ({
        book: item.book?._id || '', // Using empty string as fallback if book._id is undefined
        qty: item.quantity,
      }));
  }

  onAddressFormSubmit(): void {
    if (this.addressForm.invalid) {
      return;
    }

    const transformedOrderItems = this.transformCartItemsToOrderItems(
      this.cart!
    );

    this.orderDetails = {
      shippingAddress: {
        ...this.addressForm.value,
      },
      orderItems: transformedOrderItems,
      totalPrice: this.totalPrice!,
    };

    this.currentStep = 'summary';
  }

  onOrderPlace(): void {
    this.orderService.createOrder(this.orderDetails!).subscribe({
      next: (response) => {
        this.currentStep = 'success';
        this.response = response;
      },
      error: () => {
        this.toastr.error('Failed to create order!');
      },
    });
  }
}
