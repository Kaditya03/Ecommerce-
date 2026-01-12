"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductGallery from "@/components/ProductGallery";
import { Inter, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import BackButton from "@/components/BackButton";



const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function ProductClient({ product }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist(); // ✅ FIXED

  const MIN_QTY = product.minOrderQty || 50;
  const STEP = 10;

  const [qty, setQty] = useState(MIN_QTY);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
    <BackButton/>
    <section className={`${inter.className} bg-gray-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* IMAGE GALLERY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 shadow-md"
          >
            <ProductGallery images={product.images} />
          </motion.div>

          {/* PRODUCT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            >
            <h1
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl`}
              >
              {product.name}
            </h1>

            <p className="text-indigo-600 text-2xl font-medium">
              ₹{product.price}
            </p>

           <p className="text-gray-600 leading-relaxed">
  {product.description}
</p>


            {/* BADGES */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1 rounded-full text-sm bg-gray-100">
                Handcrafted
              </span>
              <span className="px-4 py-1 rounded-full text-sm bg-gray-100">
                Export Quality
              </span>
              <span className="px-4 py-1 rounded-full text-sm bg-gray-100">
                MOQ: {MIN_QTY}
              </span>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() =>
                  qty > MIN_QTY && setQty(qty - STEP)
                }
                className="w-11 h-11 border rounded-full text-xl hover:bg-gray-100 transition"
                >
                −
              </button>

              <span className="min-w-[60px] text-center text-lg font-medium">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + STEP)}
                className="w-11 h-11 border rounded-full text-xl hover:bg-gray-100 transition"
                >
                +
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {/* ADD TO CART */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                className={`px-8 py-4 rounded-full text-white transition ${
                  added
                    ? "bg-green-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  >
                {added
                  ? "Added to Cart ✓"
                  : `Add ${qty} to Cart`}
              </motion.button>

              {/* WISHLIST */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  toggleWishlist({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                  })
                }
                className={`px-6 py-4 rounded-full border flex items-center gap-2 transition ${
                  isWishlisted(product.id)
                  ? "border-red-500 text-red-500"
                  : "hover:bg-gray-100"
                }`}
                >
                <span className="text-xl">
                  {isWishlisted(product.id) ? "❤️" : "🤍"}
                </span>
                {isWishlisted(product.id)
                  ? "Wishlisted"
                  : "Add to Wishlist"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
                </>
  );
}
