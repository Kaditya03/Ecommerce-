import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProfileProvider } from "@/context/ProfileContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurindel Handicrafts",
  description:
    "Discover handcrafted decor, jewelry, and artisan goods made with love at Aurindel.",
  icons: {
    icon: "/favicon.ico.jpg",
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
        {/* ✅ NOW MenuProvider ACTUALLY WRAPS EVERYTHING */}
        <AuthProvider>
          <CartProvider>
            <ProfileProvider>



        <MenuProvider>
          {children}
        </MenuProvider>
            </ProfileProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
