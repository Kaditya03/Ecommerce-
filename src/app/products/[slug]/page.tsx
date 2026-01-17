import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products/slug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return {};

  const product = await res.json();

  return {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
    openGraph: {
      images: product.images,
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const res = await fetch(`/api/products/slug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const product = await res.json();

  return <ProductClient product={product} />;
}
