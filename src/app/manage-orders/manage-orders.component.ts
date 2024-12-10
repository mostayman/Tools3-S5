import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = []; // Array to store orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Load all orders
  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Update order status
  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      (response) => {
        alert(`Order ${orderId} status updated to ${status}`);
        this.loadOrders(); // Reload orders
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

  // Delete an order
  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        (response) => {
          alert(`Order ${orderId} deleted successfully`);
          this.loadOrders(); // Reload orders
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}
