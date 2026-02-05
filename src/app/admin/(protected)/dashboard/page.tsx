import { cookies } from "next/headers";
import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export default async function Dashboard() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

  // ✅ MUST await cookies()
  const cookieStore: any = await cookies();
  const token = cookieStore?.get?.("token")?.value;

  const res = await fetch(`${baseUrl}/api/admin-auth/dashboard`, {
    cache: "no-store",
    headers: {
      cookie: token ? `token=${token}` : "",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("DASHBOARD API ERROR:", err);
    throw new Error("Failed to load dashboard data");
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
