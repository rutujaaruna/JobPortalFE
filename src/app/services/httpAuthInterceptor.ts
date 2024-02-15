import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is targeting a specific origin
    
    // if (request.url.startsWith('http://localhost:3000')) {
      
      // Retrieve the authentication token from localStorage
      const authToken = localStorage.getItem('token');      
      
      // Clone the request and add the Authorization header if token exists
      let authReq = request;
      if (authToken) {          
        authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      }

      // Proceed with the modified request and handle errors
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Create a custom response with the error status and message
          const customResponse = new HttpResponse({
            status: error.status,
            body: { status: error.status, error: error.error, data: null }
          });

          // Return the custom response globally for all errors
          return of(customResponse);
        })
      );
    // } else {
    //   // This request is not going to "localhost:3000," proceed with the original request
    //   return next.handle(request);
    // }
  }
}
