import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { login } from '../types/auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient){}

    login(data:login) {
        return this.httpClient.post(`${this.baseUrl}/auth/login`, data);
    }

}