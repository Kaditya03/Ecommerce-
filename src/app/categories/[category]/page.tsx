import { headers } from "next/headers";
import CategoryLayout from "@/components/category/CategoryLayout";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // ✅ headers() must be awaited
  const headersList = await headers();
  const host = headersList.get("host");

  const baseUrl = host?.includes("localhost")
    ? `http://${host}`
    : `https://${host}`;

  const res = await fetch(
    `${baseUrl}/api/products?category=${category}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <CategoryLayout
      category={category}
      products={products}
    />
  );
}
