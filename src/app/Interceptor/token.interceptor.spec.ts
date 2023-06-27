import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenInterceptor],
    });

    interceptor = TestBed.inject(TokenInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add the Authorization header if token exists in localStorage', () => {
    const token = 'example_token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const request = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return EMPTY;
      },
    };

    interceptor.intercept(request, next);
  });

  it('should not add the Authorization header if token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const request = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBe(false);
        return EMPTY;
      },
    };
    interceptor.intercept(request, next);
  });
});
