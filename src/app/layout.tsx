import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- UPDATED METADATA SECTION ---
export const metadata: Metadata = {
  title: "Aurindel | Golden Heritage Meets Indian Elegance",
  description: "Connecting Indian Craftsmanship to the World. Discover authentic handicrafts curated by Puriva Industries.",
  metadataBase: new URL("https://www.aurindel.com"),
  icons: {
    icon: "/images/AurindelLogo_site.png", // Kept your specific favicon path
  },
  openGraph: {
    title: "Aurindel | Connecting Indian Craftsmanship to the World",
    description: "Explore the legacy of Indian artistry and master craftsmanship. Exporting elegance to discerning spaces worldwide.",
    url: "https://www.aurindel.com",
    siteName: "Aurindel Studio",
    images: [
      {
        url: "/images/AurindelLogo.png", 
        width: 1200,
        height: 630,
        alt: "Aurindel Studio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurindel | Indian Handicraft Excellence",
    description: "Timeless artistry meets modern elegance. A legacy of Puriva Industries.",
    images: ["/images/AurindelLogo.png"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* All Providers preserved to keep site functionality active */}
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ProfileProvider>
                <MenuProvider>
                  {children}
                  <Toaster richColors position="top-right" />
                </MenuProvider>
              </ProfileProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}