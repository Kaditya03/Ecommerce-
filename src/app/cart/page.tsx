"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
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

export default function CartPage() {
  const { items } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
    <BackButton/>
    
    <section
      className={`${inter.className} bg-gray-50 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* PAGE TITLE */}
        <h1
          className={`${playfair.className} text-3xl sm:text-4xl mb-10`}
        >
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-500 text-lg">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
              <h2
                className={`${playfair.className} text-xl mb-6`}
              >
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Products</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span className="text-indigo-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-full text-sm tracking-wide">
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Prices are exclusive of taxes & shipping
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
