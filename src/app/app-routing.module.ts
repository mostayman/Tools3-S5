import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component'; // Import AssignedOrdersComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'order', component: OrderComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'assigned-orders', component: AssignedOrdersComponent }, // New route for Assigned Orders
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
