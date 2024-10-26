import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import this
import { HttpClientModule } from '@angular/common/http'; // For API requests

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Make sure it's here
    HttpClientModule // Needed for backend requests
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
