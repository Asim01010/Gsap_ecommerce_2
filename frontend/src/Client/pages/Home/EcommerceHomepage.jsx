import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../../components/Layout";

gsap.registerPlugin(ScrollTrigger);

const EcommerceHomepage = () => {
  const [cartCount, setCartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const productsRef = useRef([]);
  const categoryRefs = useRef([]);
  const featuredRef = useRef(null);
  const navbarRef = useRef(null);
  const cartNotificationRef = useRef(null);

  // Add product refs
  const addToProductRefs = (el) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current.push(el);
    }
  };

  // Add category refs
  const addToCategoryRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Navbar animation
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(
        heroRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotationX: 45 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.8)" },
        "-=0.2"
      );

    // Floating animation for hero elements
    gsap.to(".float-animation", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    // Categories animation with ScrollTrigger
    categoryRefs.current.forEach((category, index) => {
      gsap.fromTo(
        category,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Featured products animation
    gsap.fromTo(
      featuredRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Products staggered animation
    productsRef.current.forEach((product, index) => {
      gsap.fromTo(
        product,
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: product,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Product hover animations
      product.addEventListener("mouseenter", () => {
        gsap.to(product, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      product.addEventListener("mouseleave", () => {
        gsap.to(product, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Cart notification animation
    if (cartCount > 0) {
      gsap.fromTo(
        cartNotificationRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.8)" }
      );
    }
  }, [cartCount]);

  const addToCart = (productName) => {
    setCartCount((prev) => prev + 1);

    // Cart notification animation
    gsap.fromTo(
      cartNotificationRef.current,
      { scale: 1.5 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.8)" }
    );
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      price: "$299.99",
      image: "🎧",
      category: "Electronics",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Smart Fitness Watch Series X",
      price: "$199.99",
      image: "⌚",
      category: "Wearables",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: "$29.99",
      image: "👕",
      category: "Fashion",
      rating: 4.4,
    },
    {
      id: 4,
      name: "Professional Camera Drone",
      price: "$799.99",
      image: "🚁",
      category: "Electronics",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Designer Leather Backpack",
      price: "$149.99",
      image: "🎒",
      category: "Accessories",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Wireless Charging Station",
      price: "$49.99",
      image: "⚡",
      category: "Electronics",
      rating: 4.3,
    },
  ];

  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      count: "124 products",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Fashion",
      icon: "👗",
      count: "89 products",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Home & Garden",
      icon: "🏠",
      count: "67 products",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Sports",
      icon: "⚽",
      count: "45 products",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Beauty",
      icon: "💄",
      count: "78 products",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Books",
      icon: "📚",
      count: "156 products",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Navigation Bar */}

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div ref={heroRef} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 float-animation"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 float-animation"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 float-animation"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6"
            >
              SHOP IN STYLE
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium"
            >
              Discover the latest trends in technology, fashion, and lifestyle.
              Premium quality meets unbeatable prices.
            </p>
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                🛍️ Shop Now
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                🔥 View Deals
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: "50K+", label: "Products" },
                { number: "2M+", label: "Customers" },
                { number: "98%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're
              looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                ref={addToCategoryRefs}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        ref={featuredRef}
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked items just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={addToProductRefs}
                className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Product Image */}
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-4 flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                  <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </span>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.rating})
                    </span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-800">
                    {product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product.name)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105">
              View All Products →
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get exclusive deals and early access to new products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline-none focus:ring-4 focus:ring-purple-300"
            />
            <button className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <Layout />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-black">ShopHub</span>
              </div>
              <p className="text-gray-400">
                Your one-stop destination for all your shopping needs.
              </p>
            </div>

            {["Shop", "Support", "Company"].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-lg mb-4">{section}</h3>
                <ul className="space-y-2 text-gray-400">
                  {["All Products", "Deals", "New Arrivals"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceHomepage;
