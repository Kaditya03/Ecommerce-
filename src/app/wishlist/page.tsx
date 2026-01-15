"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";
import BackButton from "@/components/BackButton";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
    <BackButton/>
    <section className={`${inter.className} bg-gray-50 min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <h1
          className={`${playfair.className} text-3xl sm:text-4xl mb-10`}
          >
          My Wishlist
        </h1>

        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500 text-lg">
              Your wishlist is empty.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {wishlist.map((item) => (
              <motion.div
              key={item._id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* IMAGE */}
                <Link href={`/products/${item.slug}`}>
                  <img
                   
  src={item.images?.[0]}
  alt={item.name}
  className="h-52 w-full object-cover"
/>

                </Link>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-indigo-600">₹{item.price}</p>

                  {/* MOVE TO CART */}
                  <button
                    onClick={() => {
                      addToCart(item, 50); // MOQ
                      toggleWishlist(item);
                    }}
                    className="w-full py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Move to Cart
                  </button>

                  {/* ACTIONS */}
                  <div className="flex gap-3 pt-2">
                    <Link
                      href={`/products/${item.slug}`}
                      className="flex-1 text-center py-2 rounded-full border hover:bg-gray-100 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="px-4 py-2 rounded-full text-red-500 border border-red-300 hover:bg-red-50 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
        </>
  );
}
