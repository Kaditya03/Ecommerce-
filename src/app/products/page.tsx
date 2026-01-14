import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find().lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
