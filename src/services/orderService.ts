// src/services/orderService.ts

export async function createOrder(data: any) {
  return {
    success: true,
    orderId: "demo_order_id",
    status: "pending",
  };
}

export async function getOrders() {
  return [];
}

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  return {
    success: true,
    orderId,
    status,
  };
}
