import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures that Angular automatically provides this service
})
export class OrderService {
  private readonly apiUrl = 'http://your-backend-api.com/orders'; // Replace with your backend API

  constructor(private readonly http: HttpClient) {}

  /**
   * Get the list of orders assigned to the courier.
   * @returns Observable with the array of assigned orders.
   */
  getAssignedOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/assigned`);
  }

  /**
   * Accept a specific order.
   * @param orderId The ID of the order to accept.
   * @returns Observable with the response from the server.
   */
  acceptOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/accept`, {});
  }

  /**
   * Decline a specific order.
   * @param orderId The ID of the order to decline.
   * @returns Observable with the response from the server.
   */
  declineOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/decline`, {});
  }

  /**
   * Get detailed information about a specific order.
   * @param orderId The ID of the order.
   * @returns Observable with the order details.
   */
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  /**
   * Cancel a specific order.
   * @param orderId The ID of the order to cancel.
   * @returns Observable with the response from the server.
   */
  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}/cancel`);
  }

  /**
   * Update the status of an order (e.g., picked up, in transit, delivered).
   * @param orderId The ID of the order.
   * @param status The new status to set.
   * @returns Observable with the response from the server.
   */
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, { status });
  }
}
