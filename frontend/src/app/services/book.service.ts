import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces';
import { apiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiUrl}/books`);
  }

  listBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${apiUrl}/books`, book);
  }

  getSingleBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${apiUrl}/books/${id}`);
  }
}
