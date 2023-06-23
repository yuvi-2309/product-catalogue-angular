import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to the login API', () => {
    const mockToken = { email: 'bruno@email.com', password: 'testpassword' };
    const mockResponse = { access_token: 'mockAccessToken' };

    service.onLogin(mockToken).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockToken);

    req.flush(mockResponse);
  });

  it('should send a GET request to the products API', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Fjallraven',
        price: 109.95,
        description: 'Your perfect pack',
        category: 'men',
        image: 'img',
        rating: { rate: 3.9, count: 120 },
        quantity: 1,
        total: 109.95,
      },
      {
        id: 2,
        title: 'Mens',
        price: 22.3,
        description: 'Slim-fitting style',
        category: 'men',
        image: 'img',
        rating: { rate: 4.1, count: 259 },
        quantity: 1,
        total: 22.3,
      },
    ];

    service.getProduct().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/products');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
