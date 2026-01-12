import CategoryClient from "./CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${params.category}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <CategoryClient
      category={params.category}
      products={products}
    />
  );
}
