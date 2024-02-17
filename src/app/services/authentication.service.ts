import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      return JSON.parse(payload); // convert payload into an Object
    } else {
      return null; // If token is null, return null
    }
  }
}
