import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module'; // If you have routing
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component'; // Adjust the path as necessary
import { LoginComponent } from './login/login.component'; // Add LoginComponent import
import { OrderComponent } from './order/order.component'; // Add OrderComponent import
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './services/order.service';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AssignedOrdersToCourierComponent } from './assigned-orders-to-courier/assigned-orders-to-courier.component'; 


@NgModule({
  declarations: [
    RegistrationComponent, // Declare RegistrationComponent
    LoginComponent,        // Declare LoginComponent
    OrderComponent,
    MyOrdersComponent,
    ManageOrdersComponent,  
    AssignedOrdersToCourierComponent,       // Declare OrderComponent
  ],
  imports: [
    BrowserModule,         // Core Angular module
    AppRoutingModule,      // Routing module
    FormsModule,           // Template-driven forms
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,    // Reactive forms
  ],
  providers: [OrderService],           // Add any services if needed
  bootstrap: [AppComponent] // Bootstrap the root AppComponent
})
export class AppModule { }
