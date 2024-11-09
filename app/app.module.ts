import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { routes } from './app.routes'; // Import the routes
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateOrderComponent } from './create-order/create-order.component';  // Import CreateOrderComponent
import { MyOrdersComponent } from './my-orders/my-orders.component';  // Import MyOrdersComponent
import { OrderDetailsComponent } from './order-details/order-details.component';  // Import OrderDetailsComponent
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AssignOrdersComponent } from './assign-orders/assign-orders.component';

@NgModule({
  declarations: [
    AppComponent,           // Root component
    RegisterComponent,       // Registration component
    LoginComponent,           // Login component
    CreateOrderComponent,  // Declare CreateOrderComponent
    MyOrdersComponent,      // Declare MyOrdersComponent
    OrderDetailsComponent,  // Declare OrderDetailsComponent
    AssignedOrdersComponent,  // Declare AssignedOrdersComponent
    ManageOrdersComponent,
    AssignOrdersComponent
  ],
  imports: [
    BrowserModule,           // Provides essential Angular services for the browser
    FormsModule,             // Allows template-driven forms (needed for ngModel in form inputs)
    HttpClientModule,         // Allows HTTP communication with backend APIs
    RouterModule.forRoot(routes) // Use routes here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
