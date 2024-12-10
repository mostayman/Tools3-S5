import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-assigned-orders-to-courier',
  templateUrl: './assigned-orders-to-courier.component.html',
  styleUrls: ['./assigned-orders-to-courier.component.css'],
})
export class AssignedOrdersToCourierComponent implements OnInit {
  assignedOrders: any[] = []; // Array to store assigned orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadAssignedOrders();
  }

  // Load all assigned orders
  loadAssignedOrders(): void {
    this.orderService.getAssignedOrdersToCouriers().subscribe(
      (data) => {
        this.assignedOrders = data;
      },
      (error) => {
        console.error('Error fetching assigned orders:', error);
      }
    );
  }

  // Reassign an order to another courier
  reassignOrder(orderId: number): void {
    const newCourierId = prompt('Enter the new courier ID:');
    if (newCourierId) {
      this.orderService.reassignOrder(orderId, Number(newCourierId)).subscribe(
        (response) => {
          alert(`Order ${orderId} reassigned successfully!`);
          this.loadAssignedOrders(); // Reload the list
        },
        (error) => {
          console.error('Error reassigning order:', error);
        }
      );
    }
  }
}
