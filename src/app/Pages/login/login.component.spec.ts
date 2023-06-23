import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthenticationService } from 'src/app/Service/authentication/authentication.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [AuthenticationService, Router],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate to home when form is valid', fakeAsync(() => {
    const mockResponse = { access_token: 'mock_token' };
    spyOn(authenticationService, 'onLogin').and.returnValue(of(mockResponse));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    component.loginForm.setValue({
      ['email']: 'bruno@email.com',
      ['password']: 'password',
    });
    component.onSubmit();
    tick();

    expect(authenticationService.onLogin).toHaveBeenCalledWith(
      component.loginForm.value
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      mockResponse.access_token
    );
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should set invalidCredentials error when login request returns 401 status', fakeAsync(() => {
    const mockError = new HttpErrorResponse({ status: 401 });
    spyOn(authenticationService, 'onLogin').and.returnValue(
      throwError(mockError)
    );

    component.loginForm.setValue({
      ['email']: 'bruno@email.com',
      ['password']: 'password',
    });
    component.onSubmit();
    tick();

    expect(authenticationService.onLogin).toHaveBeenCalledWith(
      component.loginForm.value
    );
    expect(component.loginForm.hasError('invalidCredentials')).toBe(true);
  }));

  it('should mark all form controls as touched when form is invalid', () => {
    const formControls = component.loginForm.controls;
    spyOn(formControls['email'], 'markAsTouched');
    spyOn(formControls['password'], 'markAsTouched');

    component.onSubmit();

    expect(formControls['email'].markAsTouched).toHaveBeenCalled();
    expect(formControls['password'].markAsTouched).toHaveBeenCalled();
  });
});
