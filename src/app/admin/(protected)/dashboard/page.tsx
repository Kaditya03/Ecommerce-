import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export default async function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not defined");
  }

  const res = await fetch(
    `${baseUrl}/api/admin/dashboard`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load dashboard data");
  }

  const data = await res.json();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={data.products} icon={<Package size={22} />} />
        <StatCard title="Orders" value={data.orders} icon={<ShoppingCart size={22} />} />
        <StatCard title="Revenue" value={`₹${data.revenue}`} icon={<IndianRupee size={22} />} />
      </div>

      <Charts data={data.chart} />
    </div>
  );
}
