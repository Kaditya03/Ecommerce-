import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

/* ================= METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();

  const product = await Product.findOne({ slug: params.slug });

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
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();

  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    notFound();
  }

  return <ProductClient product={JSON.parse(JSON.stringify(product))} />;
}