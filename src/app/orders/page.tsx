'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';


interface Order {
  order_id: string;
  amount: number;
  payment_status: string;
  order_status: string;
  item_details: { [key: string]: { name: string; quantity: number } };
  address: { street: string; city: string; state: string; postcode: string; country: string };
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  // Assume user_id is stored in localStorage after login
  const userId = localStorage.getItem('user_id') || 'ZOxldv'; // Replace with actual user_id retrieval

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/orders/orders?user_id=${userId}`);
        setOrders(response.data.data);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        const errorMessage = error.response?.data?.detail || error.message || 'Failed to fetch orders';
        setError(errorMessage);
        console.log("error fetching orders")
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">No orders found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (AUD)</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Shipping Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>{order.payment_status}</TableCell>
                    <TableCell>{order.order_status}</TableCell>
                    <TableCell>
                      {Object.values(order.item_details).map((item, index) => (
                        <div key={index}>
                          {item.name} (Qty: {item.quantity})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {order.address.street}, {order.address.city}, {order.address.state} {order.address.postcode}, {order.address.country}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}