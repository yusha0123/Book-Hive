import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

interface Token {
  access_token: string;
  refresh_token: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userString = localStorage.getItem('user');
    const user = userString ? (JSON.parse(userString) as Token) : null;

    if (user && user.access_token && this.router.url !== '/sign-in') {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${user.access_token}`
        ),
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          (error.status === 401 || error.status === 403) &&
          this.router.url !== '/sign-in'
        ) {
          this.authService.logout();
          this.toastr.error('Please login again!', 'Session Expired.');
        }
        return throwError(() => error);
      })
    );
  }
}
