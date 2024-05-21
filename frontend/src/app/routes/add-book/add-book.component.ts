import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private bookService: BookService
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, Validators.required],
      coverUrl: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitForm = () => {
    const book: Book = this.bookForm.value;
    this.bookService.listBook(book).subscribe({
      next: () => {
        this.toastr.success('Book listed successfully!');
        this.bookForm.reset();
      },
      error: () => {
        this.toastr.error('Failed to list book', 'Something went wrong!');
      },
    });
  };
}
