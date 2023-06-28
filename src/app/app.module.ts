import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {
  DialogComponent,
  HeaderComponent,
  NoProductFoundComponent,
  ProductButtonComponent,
  WishlistButtonComponent,
} from './Component/main';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import {
  CartComponent,
  HomeComponent,
  LoginComponent,
  ProductComponent,
  WishlistComponent,
} from './Pages/main';
import { FilterPipe } from './Pipes/main';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    DialogComponent,
    FilterPipe,
    NoProductFoundComponent,
    ProductButtonComponent,
    WishlistButtonComponent,
    HomeComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
