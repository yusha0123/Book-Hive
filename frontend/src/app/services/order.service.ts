import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Order } from '../interfaces';
import { apiUrl } from '../constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { extractErrorMessage } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  createOrder(order: Order): Observable<Order> {
    this.ngxLoader.start();
    return this.http.post<Order>(`${apiUrl}/orders`, order).pipe(
      catchError((error) => {
        const errorMessage = extractErrorMessage(error);
        this.toastr.error(errorMessage);
        return throwError(() => new Error(error));
      }),
      finalize(() => this.ngxLoader.stop())
    );
  }
}
