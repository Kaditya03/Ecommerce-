import { notFound } from "next/navigation";
import CategoryLayout from "@/components/category/CategoryLayout";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // ✅ MUST AWAIT params
  const { category } = await params;

  if (!category) notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products?category=${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <CategoryLayout
      category={category}
      products={products}
    />
  );
}
