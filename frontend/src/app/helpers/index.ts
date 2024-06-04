import { HttpErrorResponse } from '@angular/common/http';

export function extractErrorMessage(error: HttpErrorResponse): string {
  if (error.error instanceof ErrorEvent) {
    // Client-side or network error
    return error.error.message;
  } else {
    // Server-side error
    return error.error.message || 'An unknown error occurred!';
  }
}
