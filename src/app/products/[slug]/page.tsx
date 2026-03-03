import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";
import connectDB from "@/lib/db";
import Product from "@/models/Product";


export const runtime = "nodejs";


type Props = {
  params: Promise<{ slug: string }>;
};

/* ================= METADATA ================= */
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // CRITICAL: Await the promise
  const slug = resolvedParams.slug;

  await connectDB();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return { title: "Product Not Found | Aurindel" };
  }

  return {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
  };
}

/* ================= PAGE ================= */
export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params; // CRITICAL: Await the promise
  const slug = resolvedParams.slug;

  await connectDB();
  
  // Use .lean() to get a plain JS object immediately
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    notFound();
  }

  // Ensure high-fidelity serialization for Client Components
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductClient product={plainProduct} />;
}