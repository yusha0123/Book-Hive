import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private toastr: ToastrService
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
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.toastr.success('Hello world!', 'Toastr fun!');
    }
  };
}
