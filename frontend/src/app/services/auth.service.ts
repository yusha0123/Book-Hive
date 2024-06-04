import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { apiUrl } from '../constants';
import { extractErrorMessage } from '../helpers';
import { LoginData, LoginResponse, RegisterData, User } from '../interfaces';

interface RegisterReponse {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | null>(null);

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      this.user.next(parsedUser);
      this.isAuthenticated.next(true);
    }
  }

  getUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  getAuthState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  register(user: RegisterData): Observable<RegisterReponse> {
    this.ngxLoader.start();
    return this.httpClient
      .post<RegisterReponse>(`${apiUrl}/auth/register`, user)
      .pipe(
        tap(() =>
          this.toastr.success('You can login now.', 'Registration Successful!')
        ),
        catchError((error) => {
          const errorMessage = extractErrorMessage(error);
          this.toastr.error(errorMessage);
          return throwError(() => new Error(error));
        }),
        finalize(() => this.ngxLoader.stop())
      );
  }

  login(user: LoginData): Observable<LoginResponse> {
    this.ngxLoader.start();
    return this.httpClient
      .post<LoginResponse>(`${apiUrl}/auth/login`, user)
      .pipe(
        tap((response) => this.handleSuccess(response)),
        catchError((error) => {
          const errorMessage = extractErrorMessage(error);
          this.toastr.error(errorMessage);
          return throwError(() => new Error(error));
        }),
        finalize(() => this.ngxLoader.stop())
      );
  }

  private handleSuccess(response: LoginResponse) {
    this.router.navigate(['/']);
    this.toastr.success(`Welcome back ${response.name}`);
    localStorage.setItem(
      'user',
      JSON.stringify({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        name: response.name,
        email: response.email,
      })
    );
    this.isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate(['/']);
  }
}
