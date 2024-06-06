import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Book, CartItem, User, UserCart } from 'src/app/interfaces';
import { apiUrl } from '../constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { extractErrorMessage } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) {}

  cartItems: CartItem[] = [];

  addToCart(book: Book): void {
    this.http
      .post<{ success: boolean; message: string }>(`${apiUrl}/cart`, {
        bookId: book._id,
      })
      .pipe(
        map((response) => {
          if (response.success) {
            this.toastr.success(response.message);
          }
        }),
        catchError((error) => {
          this.toastr.error('Failed to add to cart!');
          throw error;
        })
      )
      .subscribe();
  }

  getCartItems(): Observable<UserCart> {
    this.ngxLoader.start();
    return this.http.get<UserCart>(`${apiUrl}/cart`).pipe(
      catchError((error) => {
        const errorMessage = extractErrorMessage(error);
        this.toastr.error(errorMessage);
        return throwError(() => new Error(error));
      }),
      finalize(() => this.ngxLoader.stop())
    );
  }

  updateCart(
    action: 'increment' | 'decrement' | 'remove',
    bookId: string
  ): Observable<any> {
    return this.http
      .patch<any>(
        `${apiUrl}/cart`,
        { bookId },
        {
          params: {
            action,
          },
        }
      )
      .pipe(
        catchError((error) => {
          const errorMessage = extractErrorMessage(error);
          this.toastr.error(errorMessage);
          return throwError(() => new Error(error));
        })
      );
  }
}
