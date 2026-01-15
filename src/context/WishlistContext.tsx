"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type WishlistItem = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

/* ================= PROVIDER ================= */

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  /* LOAD FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* TOGGLE */
const toggleWishlist = (product: WishlistItem) => {
  setWishlist((prev) => {
    const exists = prev.find(
      (item) => item._id === product._id
    );

    if (exists) {
      return prev.filter(
        (item) => item._id !== product._id
      );
    }

    return [...prev, product];
  });
};


  /* CHECK */
  const isWishlisted = (id: string) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        count: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }
  return context;
}
