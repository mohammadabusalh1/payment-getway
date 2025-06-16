"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CreditCard,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Lock,
  Activity,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption and fraud protection with 99.9% uptime guarantee",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process payments in under 2 seconds with our optimized infrastructure",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Accept payments from 190+ countries with multi-currency support",
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description:
        "Monitor transactions and insights with our advanced dashboard",
    },
  ];

  const stats = [
    { value: "500M+", label: "Transactions Processed" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "190+", label: "Countries Supported" },
    { value: "2.1s", label: "Average Processing Time" },
  ];

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        className="pt-24 relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Hero Section */}
        <motion.section
          id="home"
          ref={heroRef}
          style={{ y, opacity }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                Trusted by 50,000+ businesses worldwide
              </span>
            </div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6"
              style={{
                transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
              }}
            >
              WorldPay
              <br />
              <span className="text-4xl md:text-6xl">Payment Gateway</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the future of payments with our cutting-edge 3D
              interface. Secure, fast, and beautifully designed for the modern
              world.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Floating 3D Card */}
          <motion.div
            initial={{ opacity: 0, rotateX: 45, z: -100 }}
            animate={heroInView ? { opacity: 1, rotateX: 0, z: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative"
            style={{
              transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${
                mousePosition.x * 0.1
              }deg)`,
            }}
          >
            <div className="w-80 h-48 bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <CreditCard className="w-8 h-8 text-white" />
                  <span className="text-white/80 text-sm font-medium">
                    WorldPay
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-white text-xl font-mono">
                    •••• •••• •••• 1234
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">
                      Valid Thru: 12/28
                    </span>
                    <span className="text-white/80 text-sm">CVV: •••</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          ref={featuresRef}
          className="relative z-10 py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose WorldPay?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Built for the future with cutting-edge technology and
                unparalleled security
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
          ref={statsRef}
          className="relative z-10 py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Start processing payments today with our completely free plan
              </p>
            </motion.div>

            {/* Free Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12 text-center relative overflow-hidden">
                {/* Popular badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Free Forever
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      $0
                    </span>
                    <span className="text-gray-300 text-xl">/month</span>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Everything you need to start processing payments
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Unlimited transactions",
                    "No setup fees",
                    "No monthly fees",
                    "Bank-grade security",
                    "24/7 customer support",
                    "Real-time analytics",
                    "Multi-currency support",
                    "API integration",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={statsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => {
                    router.push("/auth/sign-in");
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Free Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Trusted by businesses worldwide
                </h3>
                <p className="text-gray-300">
                  Join thousands of companies already using WorldPay
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="relative z-10 py-20 px-4 bg-white/5 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                About WorldPay
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Founded in 2020, WorldPay has revolutionized the payment gateway
                industry with cutting-edge 3D technology and unparalleled
                security. We serve over 50,000 businesses worldwide, processing
                millions of transactions daily with our advanced infrastructure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">2020</h3>
                  <p className="text-gray-300">Founded</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
                  <p className="text-gray-300">Businesses Served</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                  <p className="text-gray-300">Customer Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="contact"
          ref={ctaRef}
          className="relative z-10 py-20 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl border border-white/10 p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Payments?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using WorldPay to process
                payments faster, safer, and smarter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Get Started Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Contact Sales
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
