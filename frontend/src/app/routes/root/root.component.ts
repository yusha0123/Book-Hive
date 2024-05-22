import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces';
import { BookService } from 'src/app/services/book.service';

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
    private router: Router
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

  navigateToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }
}
