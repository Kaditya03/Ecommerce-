import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

/* ================= TYPES ================= */
type Props = {
  params: Promise<{ slug: string }>; // In Next.js 15, params is a Promise
};

/* ================= METADATA ================= */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // Await the params here
  
  await connectDB();
  const product = await Product.findOne({ slug });

  if (!product) {
    return { title: "Product Not Found | Aurindel" };
  }

  return {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
    openGraph: {
      images: product.images || [],
    },
  };
}

/* ================= PAGE ================= */
export default async function ProductPage({ params }: Props) {
  const { slug } = await params; // Await the params here

  await connectDB();
  const product = await Product.findOne({ slug });

  if (!product) {
    notFound();
  }

  // Convert Mongoose doc to plain object for Client Component
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductClient product={plainProduct} />;
}