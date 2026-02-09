import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export const runtime = "nodejs"; // ✅ IMPORTANT for Vercel

export default async function Dashboard() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/login");
  }

  if (decoded.role !== "admin") {
    redirect("/login");
  }

  const products = await Product.countDocuments({
    $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
  });

  const orders = await Order.countDocuments();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={products} icon={<Package />} />
        <StatCard title="Orders" value={orders} icon={<ShoppingCart />} />
        <StatCard title="Revenue" value={`₹0`} icon={<IndianRupee />} />
      </div>

      <Charts data={[]} />
    </div>
  );
}
