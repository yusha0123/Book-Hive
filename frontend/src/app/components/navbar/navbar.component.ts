import { Component, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private cartService: CartService, private renderer: Renderer2) {}

  isOpen: boolean = false;

  get totalCartItems(): number {
    return this.cartService.getTotalItems();
  }

  toggleNav(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
