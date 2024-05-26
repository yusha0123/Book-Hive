import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  isOpen: boolean = false;

  navLinks: { route: string; label: string; icon: string }[] = [
    { route: '/', label: 'Home', icon: 'pi pi-home' },
    { route: '/add-book', label: 'Add Book', icon: 'pi pi-plus' },
    { route: '/cart', label: 'Cart', icon: 'pi pi-shopping-cart' },
    { route: '/orders', label: 'Orders', icon: 'pi pi-box' },
  ];

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

  handleNavClick(route: string): void {
    this.toggleNav();
    this.router.navigate([route]);
  }
}
