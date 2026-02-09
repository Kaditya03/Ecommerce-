import { headers } from "next/headers";
import CategoryLayout from "@/components/category/CategoryLayout";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Setup base URL for internal API call
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(
      `${baseUrl}/api/products?category=${category}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");
    
    const products = await res.json();

    return (
      <CategoryLayout
        category={category}
        products={Array.isArray(products) ? products : []}
      />
    );
  } catch (error) {
    return (
      <div className="h-screen flex items-center justify-center italic text-stone-400">
        Error loading collection. Please try again later.
      </div>
    );
  }
}