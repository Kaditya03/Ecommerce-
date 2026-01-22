import { headers } from "next/headers";
import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export default async function Dashboard() {
  const headersList = await headers();
  const host = headersList.get("host");

  const baseUrl = host?.includes("localhost")
    ? `http://${host}`
    : `https://${host}`;

  const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  const data = await res.json();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={data.products} icon={<Package />} />
        <StatCard title="Orders" value={data.orders} icon={<ShoppingCart />} />
        <StatCard title="Revenue" value={`₹${data.revenue}`} icon={<IndianRupee />} />
      </div>

      <Charts data={data.chart} />
    </div>
  );
}
