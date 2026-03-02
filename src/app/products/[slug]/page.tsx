import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";

/* ================= METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/slug/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return { title: "Product Not Found | Aurindel" };
  }

  const product = await res.json();

  return {
    title: `${product.name} | Handcrafted Export Product | Aurindel India`,
    description:
      product.description ||
      `Buy ${product.name} from Aurindel – premium Indian handicraft exporter.`,

    openGraph: {
      title: `${product.name} | Aurindel`,
      description: product.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${params.slug}`,
      siteName: "Aurindel",
      images: product.images?.length
        ? [
            {
              url: product.images[0],
              width: 1200,
              height: 630,
            },
          ]
        : [],
      locale: "en_IN",
      type: "website",
    },
  };
}

/* ================= PAGE ================= */
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/slug/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  return <ProductClient product={product} />;
}