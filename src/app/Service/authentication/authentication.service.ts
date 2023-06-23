import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  //  This function sends a POST request to the specified URL with a token as the payload and returns an Observable.
  onLogin(token: any): Observable<any> {
    return this.http.post('http://localhost:8000/auth/login', token);
  }

  // This function returns an observable that retrieves products from a specified URL using HTTP GET method.
  getProduct(): Observable<any> {
    return this.http.get('http://localhost:8000/products');
  }
}
