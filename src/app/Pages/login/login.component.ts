import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import users from 'local-db/user';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { AuthenticationService } from '../../Service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users = users;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // This function handles the submission of a login form, validates the form, sends a login request to the server, and navigates to the home page if successful.
  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.onLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.access_token);
          this.sharedService.findUserByEmail(res.email);
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.loginForm.setErrors({ invalidCredentials: true });
          }
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((controlName) => {
        this.loginForm.controls[controlName].markAsTouched();
      });
    }
  }
}
