import CategoryLayout from "@/components/category/CategoryLayout";

export default async function CategoriesPage() {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <CategoryLayout
      category="all"
      products={products}
    />
  );
}
