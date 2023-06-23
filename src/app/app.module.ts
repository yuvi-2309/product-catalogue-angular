import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import {
  CartComponent,
  LoginComponent,
  ProductComponent,
  HomeComponent,
  WishListComponent,
} from './Pages/main';
import {
  HeaderComponent,
  DialogComponent,
  NoProductFoundComponent,
  ProductButtonComponent,
  WishListButtonComponent,
} from './Component/main';
import { FilterPipe } from './Pipes/main';

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
    WishListButtonComponent,
    HomeComponent,
    WishListComponent,
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
