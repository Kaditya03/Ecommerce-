"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Monsieur_La_Doulaise, Eagle_Lake, Poppins } from "next/font/google";

// ✅ Google Font
const monsieur = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
});

const eagle = Eagle_Lake({
subsets:["latin"],
weight:"400",
style:"normal",
});

const poppins= Poppins({
    subsets:["latin" ],
    weight:["100","300","200","400"],
    style:"normal",
})

// ✅ Navbar Component
const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [isHomeHover, setIsHomeHover] = React.useState(false);

  // ✅ Dropdown states for mobile
  const [homeOpen, setHomeOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  // ✅ Toggle one mobile menu at a time
  const toggleMenu = (menu: "home" | "about" | "contact" | "services") => {
    setHomeOpen(menu === "home" ? !homeOpen : false);
    setAboutOpen(menu === "about" ? !aboutOpen : false);
    setContactOpen(menu === "contact" ? !contactOpen : false);
    setServicesOpen(menu === "services" ? !servicesOpen : false);
  };



  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-20 xl:px-32 py-4 border-b border-gray-300 bg-white z-50 transition-all">
      
      {/* ✅ Logo */}
      <div className="flex justify-start items-center">
        <Link
          href="/"
          className={`${monsieur.className} text-4xl text-indigo-600 tracking-wide`}
        >
          Aurindel
        </Link>
      </div>

      {/* ✅ Desktop Menu */}
      <div className={`hidden sm:flex items-center gap-8 ${eagle.className}`}>

        {/* HOME DROPDOWN (animated) */}
        <div
          className="relative"
          onMouseEnter={() => setIsHomeHover(true)}
          onMouseLeave={() => setIsHomeHover(false)}
        >
          <Link
            href="/"
            className="relative hover:text-indigo-600 transition pb-1 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
              after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
          >
          Home
          </Link>

          <AnimatePresence>
            {isHomeHover && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 ${poppins.className}`}
              >
                {["Overview", "Updates", "News"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="relative block px-4 py-2 pb-1 text-gray-700 hover:text-indigo-600
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                      after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* OTHER DROPDOWNS */}
        <AnimatedDropdown
          label="About"
          href="/about"
          items={["Our Team", "Mission", "Vision"]}
        fontClass={poppins.className}
        />

        <AnimatedDropdown
          label="Contact"
          href="/contact"
          items={["Email", "Phone", "Map"]}
          fontClass={poppins.className}
        />

        <AnimatedDropdown
          label="Services"
          href="/services"
          items={["Web Design", "App Development", "Consulting"]}
          fontClass={poppins.className}
        />

        {/* SEARCH BAR */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* CART ICON */}
        <div className="relative cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            0
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
          Login
        </button>
      </div>

      {/* ✅ Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* ✅ Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden ${eagle.className}`}
          >
            <MobileDropdown label="Home" open={homeOpen} onClick={() => toggleMenu("home")} links={["Overview", "Updates", "News"]} />
            <MobileDropdown label="About" open={aboutOpen} onClick={() => toggleMenu("about")} links={["Our Team", "Mission", "Vision"]} />
            <MobileDropdown label="Contact" open={contactOpen} onClick={() => toggleMenu("contact")} links={["Email", "Phone", "Map"]} />
            <MobileDropdown label="Services" open={servicesOpen} onClick={() => toggleMenu("services")} links={["Web Design", "App Development", "Consulting"]} />

            <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ✅ Desktop Animated Dropdown */
interface DropdownProps {
  label: string;
  href: string;
  items: string[];
  fontClass?:string;
}

const AnimatedDropdown: React.FC<DropdownProps> = ({ label, href, items, fontClass, }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        className="relative pb-1 hover:text-indigo-600 transition 
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
          after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        {label}
      </Link>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 ${poppins.className}`}
          >
            {items.map((item) => (
              <Link
                key={item}
                href="#"
                className="relative block px-4 py-2 pb-1 text-gray-700 hover:text-indigo-600
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                  after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ✅ Mobile Dropdown with Motion */
interface MobileDropdownProps {
  label: string;
  open: boolean;
  onClick: () => void;
  links: string[];
}
const MobileDropdown: React.FC<MobileDropdownProps> = ({ label, open, onClick, links }) => (
  <div className="w-full">
    {/* Button: underline appears on hover (desktop) and when `open` is true (mobile) */}
    <button
      onClick={onClick}
      className={
        // base classes
        `flex justify-between w-full px-2 py-2 hover:bg-gray-100 rounded-md relative
         after:content-[''] after:absolute after:left-2 after:bottom-0 after:h-[2px]
         after:bg-indigo-600 after:transition-all after:duration-300 
        ` +
        // when open, set after width; otherwise keep it zero (so mobile shows underline when open)
        (open ? " after:w-[90%]" : " after:w-0")
      }
    >
      <span>{label}</span>
      <svg
        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="pl-4 flex flex-col gap-1 mt-1"
        >
          {links.map((link) => (
            <Link
              key={link}
              href="#"
              className={
                // link classes: underline on hover (desktop), and on focus/active (mobile)
                `relative block py-1 text-gray-700 hover:text-indigo-600
                 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
                 after:bg-indigo-600 after:transition-all after:duration-300 after:w-0
                 hover:after:w-full focus:after:w-full active:after:w-full ${poppins.className}`
              }
            >
              {link}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


export default Navbar;
