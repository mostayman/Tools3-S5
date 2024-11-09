import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    this.http.get<any[]>('http://localhost:5000/admin/orders')
      .subscribe(
        data => {
          this.orders = data;
          console.log("All orders fetched successfully", data);
        },
        error => {
          console.error("Error fetching orders", error);
        }
      );
  }

  updateOrderStatus(orderId: string, status: string) {
    this.http.put(`http://localhost:5000/orders/${orderId}/status`, { status })
      .subscribe(
        response => {
          console.log(`Order ${orderId} status updated to ${status}`, response);
        },
        error => {
          console.error(`Error updating order status for ${orderId}`, error);
        }
      );
  }

  deleteOrder(orderId: string) {
    this.http.delete(`http://localhost:5000/orders/${orderId}`)
      .subscribe(
        response => {
          console.log(`Order ${orderId} deleted`, response);
          this.orders = this.orders.filter(order => order._id !== orderId); // Remove from local list
        },
        error => {
          console.error(`Error deleting order ${orderId}`, error);
        }
      );
  }
}
