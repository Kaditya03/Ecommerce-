"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/orders",{cache:"no-store"});
    setOrders(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-medium">₹{o.totalAmount}</p>
              <p className="text-sm text-gray-500">
                Status: {o.status}
              </p>
            </div>

            <select
              value={o.status}
              onChange={(e) =>
                updateStatus(o._id, e.target.value)
              }
              className="border rounded px-3"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
