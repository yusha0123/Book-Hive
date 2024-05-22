import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input() id!: string;
  loading: boolean = false;
  book: Book | null = null;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookService.getSingleBook(this.id).subscribe({
      next: (response: Book | null) => {
        if (response) {
          this.book = response;
        }
      },
      error: () => {
        this.toastr.error('Failed to fetch Book', 'Something went wrong!');
      },
    });
  }
}
