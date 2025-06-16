"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0.0)", "rgba(15, 23, 42, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(16px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">WorldPay</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Link href="/auth?mode=signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200"
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/auth?mode=signup">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-white/5 backdrop-blur-sm rounded-2xl mt-2 border border-white/10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setIsOpen(false);
                }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/auth?mode=signin">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="w-full text-white/80 hover:text-white px-4 py-3 text-left rounded-xl font-medium transition-all duration-200 hover:bg-white/10"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/auth?mode=signup">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
