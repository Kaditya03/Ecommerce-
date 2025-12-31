"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import {
  Monsieur_La_Doulaise,
  Eagle_Lake,
  Poppins,
} from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/ProfileContext";

/* ================= FONTS (UNCHANGED) ================= */

const monsieur = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
});

const eagle = Eagle_Lake({
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400"],
});

/* ================= NAVBAR ================= */

export default function Navbar() {
  const { menuOpen, setMenuOpen } = useMenu();
  const [showSearch, setShowSearch] = React.useState(false);

  const [homeOpen, setHomeOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [collectionsOpen, setCollectionsOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const [profileOpen, setProfileOpen] = React.useState(false);

  const desktopProfileRef = React.useRef<HTMLDivElement | null>(null);
  const mobileProfileRef = React.useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { cartCount } = useCart();
  const { photo } = useProfile();

  /* Close profile dropdown on outside click */
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopProfileRef.current?.contains(event.target as Node) ||
        mobileProfileRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = (
    menu: "home" | "about" | "collections" | "contact" | "services"
  ) => {
    setHomeOpen(menu === "home" ? !homeOpen : false);
    setAboutOpen(menu === "about" ? !aboutOpen : false);
    setCollectionsOpen(menu === "collections" ? !collectionsOpen : false);
    setContactOpen(menu === "contact" ? !contactOpen : false);
    setServicesOpen(menu === "services" ? !servicesOpen : false);
  };

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {(menuOpen || showSearch) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => {
              setMenuOpen(false);
              setShowSearch(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b z-50">
        <div className="flex items-center px-4 md:px-8 py-4">
          {/* LOGO */}
          <Link
            href="/"
            className={`${monsieur.className} text-4xl text-indigo-700`}
          >
            Aurindel
          </Link>

          {/* DESKTOP LINKS */}
          <div
            className={`hidden sm:flex gap-10 absolute left-1/2 -translate-x-1/2 ${eagle.className}`}
          >
            <DesktopDropdown label="Home" items={["Overview", "Updates", "News"]} />
            <DesktopDropdown label="About" items={["Our Team", "Mission", "Vision"]} />
            <DesktopDropdown
              label="Collections"
              items={[
                "Home Decor",
                "Art & Paintings",
                "Brass & Metal Art",
                "Wooden Handicrafts",
                "Traditional Textiles",
              ]}
            />
            <DesktopDropdown label="Contact" items={["Email", "Phone", "Map"]} />
            <DesktopDropdown label="Services" items={["Web Design", "App Development", "Consulting"]} />
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <Icon onClick={() => setShowSearch(true)}>🔍</Icon>

            <div className="relative">
              <Icon onClick={() => router.push("/cart")}>🛒</Icon>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <Icon>❤️</Icon>

            {/* PROFILE */}
            <div className="relative" ref={desktopProfileRef}>
              <ProfileAvatar
                photo={photo}
                onClick={() => setProfileOpen((p) => !p)}
              />
              <ProfileDropdown
                open={profileOpen}
                isLoggedIn={isLoggedIn}
                router={router}
              />
            </div>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden ml-auto p-2"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-indigo-600" />
              <span className="block w-6 h-0.5 bg-indigo-600" />
              <span className="block w-6 h-0.5 bg-indigo-600" />
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`sm:hidden bg-white p-4 shadow-lg ${poppins.className}`}
            >
              <div className="flex justify-center gap-3 border-b pb-3 mb-3">
                <Icon onClick={() => setShowSearch(true)}>🔍</Icon>
                <Icon onClick={() => router.push("/cart")}>🛒</Icon>

                <div className="relative" ref={mobileProfileRef}>
                  <ProfileAvatar
                    photo={photo}
                    onClick={() => setProfileOpen((p) => !p)}
                  />
                  <ProfileDropdown
                    open={profileOpen}
                    isLoggedIn={isLoggedIn}
                    router={router}
                  />
                </div>
              </div>

              <MobileDropdown label="Home" items={["Overview", "Updates", "News"]} open={homeOpen} onClick={() => toggleMobileMenu("home")} />
              <MobileDropdown label="About" items={["Our Team", "Mission", "Vision"]} open={aboutOpen} onClick={() => toggleMobileMenu("about")} />
              <MobileDropdown label="Collections" items={["Home Decor","Art & Paintings","Brass & Metal Art","Wooden Handicrafts","Traditional Textiles"]} open={collectionsOpen} onClick={() => toggleMobileMenu("collections")} />
              <MobileDropdown label="Contact" items={["Email", "Phone", "Map"]} open={contactOpen} onClick={() => toggleMobileMenu("contact")} />
              <MobileDropdown label="Services" items={["Web Design", "App Development", "Consulting"]} open={servicesOpen} onClick={() => toggleMobileMenu("services")} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

/* ================= PROFILE AVATAR ================= */

function ProfileAvatar({ photo, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-indigo-400 transition-all duration-300"
    >
      {photo ? (
        <motion.img
          src={photo}
          alt="profile"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-lg">
          👤
        </div>
      )}
    </button>
  );
}

/* ================= PROFILE DROPDOWN ================= */

function ProfileDropdown({ open, isLoggedIn, router }: any) {
  const { logout } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`absolute right-0 mt-3 w-52 bg-white border rounded-md shadow-lg z-50 ${poppins.className}`}
        >
          {!isLoggedIn ? (
            <div className="flex flex-col">
              <button onClick={() => router.push("/login")} className="px-4 py-2 text-left hover:bg-indigo-50">Login</button>
              <button onClick={() => router.push("/register")} className="px-4 py-2 text-left hover:bg-indigo-50">Create Account</button>
            </div>
          ) : (
            <div className="flex flex-col">
              <button onClick={() => router.push("/profile")} className="px-4 py-2 text-left hover:bg-indigo-50">My Profile</button>
              <button onClick={() => router.push("/profile/edit")} className="px-4 py-2 text-left hover:bg-indigo-50">Edit Profile</button>
              <button onClick={() => router.push("/orders")} className="px-4 py-2 text-left hover:bg-indigo-50">My Orders</button>
              <button onClick={logout} className="px-4 py-2 text-left text-red-600 hover:bg-red-50">Logout</button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= COMMON ================= */

function Icon({ children, onClick }: any) {
  return (
    <button onClick={onClick} className="p-2 text-xl hover:bg-gray-100 rounded-full transition">
      {children}
    </button>
  );
}

function DesktopDropdown({ label, items }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="relative">
      <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">{label}</span>
      <AnimatePresence>
        {open && (
          <motion.div className={`absolute left-0 mt-2 bg-white border rounded-md shadow-md w-48 ${poppins.className}`}>
            {items.map((item: string) => (
              <div key={item} className="px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer">
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDropdown({ label, items, open, onClick }: any) {
  return (
    <div className="border-b py-2">
      <button onClick={onClick} className="w-full flex justify-between items-center text-indigo-600 hover:bg-indigo-50 px-2 py-2 rounded-md">
        {label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="pl-4 mt-2 flex flex-col gap-1">
            {items.map((item: string) => (
              <Link key={item} href="#" className="text-sm hover:bg-indigo-50 px-2 py-1 rounded">
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
