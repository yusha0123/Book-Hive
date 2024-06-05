import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  navLinks!: { route: string; label: string; icon: string }[];

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.getAuthState();
    this.user$ = this.authService.getUser();
  }

  ngOnInit() {
    this.navLinks = [
      { route: '/', label: 'Home', icon: 'pi pi-home' },
      { route: '/cart', label: 'Cart', icon: 'pi pi-shopping-cart' },
      { route: '/orders', label: 'Orders', icon: 'pi pi-box' },
    ];
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
