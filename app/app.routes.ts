import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AssignOrdersComponent } from './assign-orders/assign-orders.component';

export const routes: Routes = [
  { path: 'manage-orders', component: ManageOrdersComponent },
  { path: 'assign-orders', component: AssignOrdersComponent },
  { path: 'assigned-orders', component: AssignedOrdersComponent },
  { path: 'order-details/:orderId', component: OrderDetailsComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Optional default route
];
