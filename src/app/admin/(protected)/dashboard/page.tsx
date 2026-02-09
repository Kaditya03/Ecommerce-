import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export default async function Dashboard() {
  await connectDB();

  // ✅ cookies() MUST be awaited in Next 15
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error("Invalid token");
  }

  if (decoded.role !== "admin") {
    throw new Error("Forbidden");
  }

  const products = await Product.countDocuments({
    $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
  });

  const orders = await Order.countDocuments();
  const revenue = 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={products} icon={<Package />} />
        <StatCard title="Orders" value={orders} icon={<ShoppingCart />} />
        <StatCard title="Revenue" value={`₹${revenue}`} icon={<IndianRupee />} />
      </div>

      <Charts data={[]} />
    </div>
  );
}
