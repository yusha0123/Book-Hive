import { AbstractControl, ValidatorFn } from '@angular/forms';
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

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    const patterns = [
      /^[0-9]{5}(?:-[0-9]{4})?$/, // US ZIP codes
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, // Canadian postal codes
      /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[ABD-HJLNP-UW-Z]{2})$/, // UK postal codes
      /^\d{5}$/, // German postal codes
      /^\d{4}$/, // Australian postal codes
      /^\d{4,5}$/, // French postal codes
      /^\d{6}$/, // Indian postal codes
      // Add more patterns as needed
    ];

    const valid = patterns.some((pattern) => pattern.test(value));

    return valid ? null : { invalidPostalCode: { value: control.value } };
  };
}
