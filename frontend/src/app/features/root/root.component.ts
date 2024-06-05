import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  books: Book[] = [];
  loading: boolean = false;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.loading = false;
      },
      error: (err: any) => {
        this.toastr.error('Failed to fetch books', 'Something went wrong!');
      },
    });
  }

  onAddToCart(event: Event, book: Book): void {
    event.stopPropagation();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.cartService.addToCart(book);
    }
  }

  navigateToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  isInCart(book: Book): boolean {
    // return !!this.cartService.cartItems.find((item) => item._id === book._id);
    return false;
  }

  navigateToCart(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/cart']);
  }
}
