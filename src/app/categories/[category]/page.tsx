import { notFound } from "next/navigation";
import CategoryLayout from "@/components/category/CategoryLayout";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = params;

  if (!category) notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/products?category=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch products");
    notFound();
  }

  const products = await res.json();

  return (
    <CategoryLayout
      category={category}
      products={products}
    />
  );
}
