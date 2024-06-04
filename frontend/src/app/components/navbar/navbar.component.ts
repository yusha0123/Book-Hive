import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isOpen: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.getAuthState();
  }

  navLinks: { route: string; label: string; icon: string }[] = [
    { route: '/', label: 'Home', icon: 'pi pi-home' },
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

  logout() {
    this.authService.logout();
  }
}
