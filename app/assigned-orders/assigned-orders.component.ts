import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css']
})
export class AssignedOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAssignedOrders();
  }

  fetchAssignedOrders() {
    this.http.get<any[]>('http://localhost:5000/courier/assigned-orders')
      .subscribe(
        data => {
          this.orders = data;
          console.log("Assigned orders fetched successfully", data);
        },
        error => {
          console.error("Error fetching assigned orders", error);
        }
      );
  }

  updateOrderStatus(orderId: string, status: string) {
    this.http.put(`http://localhost:5000/orders/${orderId}/status`, { status })
      .subscribe(
        response => {
          console.log(`Order ${orderId} status updated to ${status}`, response);
          // Update the local order status to reflect the change
          this.orders = this.orders.map(order => 
            order._id === orderId ? { ...order, status } : order
          );
        },
        error => {
          console.error(`Error updating order status for ${orderId}`, error);
        }
      );
  }
}
