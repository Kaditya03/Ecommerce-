import { notFound } from "next/navigation";
import { headers } from "next/headers";
import ProductClient from "@/components/ProductClient";

/* ================= METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

 
  const h = await headers();
  const host = h.get("host");

  if (!host) {
    return { title: "Product | Aurindel" };
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/products/slug/${slug}`,
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
    `Buy ${product.name} from Aurindel – a premium Indian handicraft exporter under Puriva Industries Pvt. Ltd. Supplying handcrafted decor and artisan products globally.`,

  openGraph: {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
    url: `https://${host}/product/${slug}`,
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

  robots: {
    index: true,
    follow: true,
  },
};
}

/* ================= PAGE ================= */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ headers() IS ASYNC
  const h = await headers();
  const host = h.get("host");

  if (!host) {
    notFound();
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/products/slug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  return <ProductClient product={product} />;
}
