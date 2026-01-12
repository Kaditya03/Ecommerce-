import CategoryClient from "./CategoryClient";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${category}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <CategoryClient
      category={category}
      products={products}
    />
  );
}
