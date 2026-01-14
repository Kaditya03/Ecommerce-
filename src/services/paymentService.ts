// src/services/paymentService.ts

export async function createPayment(payload: any) {
  return {
    success: true,
    paymentId: "demo_payment_id",
  };
}

export async function verifyPayment(payload: any) {
  return {
    success: true,
    status: "verified",
  };
}
