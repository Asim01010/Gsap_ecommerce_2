import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [trendingCategories, setTrendingCategories] = useState([]);
  const [trendingBrands, setTrendingBrands] = useState([]);
  const [activeTimeframe, setActiveTimeframe] = useState("today");
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const productRefs = useRef([]);
  const categoryRefs = useRef([]);
  const brandRefs = useRef([]);
  const timelineRef = useRef(null);
  const sparkleRefs = useRef([]);

  const timeframes = [
    { id: "today", label: "Today", icon: "🕐" },
    { id: "week", label: "This Week", icon: "📅" },
    { id: "month", label: "This Month", icon: "🗓️" },
    { id: "all", label: "All Time", icon: "⭐" },
  ];

  // Sample trending data
  const trendingData = {
    today: {
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          image: "📱",
          category: "Electronics",
          price: "$1199.99",
          trend: "🔥 HOT",
          trendScore: 95,
          views: "12.4K",
          growth: "+245%",
          rating: 4.9,
          reviews: 1247,
          tags: ["5G", "Titanium", "48MP Camera"],
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: 2,
          name: 'MacBook Pro 16" M3',
          image: "💻",
          category: "Computers",
          price: "$2499.99",
          trend: "🚀 TRENDING",
          trendScore: 89,
          views: "8.7K",
          growth: "+189%",
          rating: 4.8,
          reviews: 892,
          tags: ["M3 Chip", "32GB RAM", "1TB SSD"],
          color: "from-purple-500 to-pink-500",
        },
        {
          id: 3,
          name: "Sony WH-1000XM5",
          image: "🎧",
          category: "Audio",
          price: "$399.99",
          trend: "📈 RISING",
          trendScore: 78,
          views: "15.2K",
          growth: "+312%",
          rating: 4.7,
          reviews: 2341,
          tags: ["Noise Cancel", "30h Battery", "Hi-Res"],
          color: "from-green-500 to-emerald-500",
        },
        {
          id: 4,
          name: "PlayStation 5 Pro",
          image: "🎮",
          category: "Gaming",
          price: "$599.99",
          trend: "⚡ FLASH",
          trendScore: 92,
          views: "23.1K",
          growth: "+567%",
          rating: 4.9,
          reviews: 3124,
          tags: ["4K Gaming", "8K Ready", "Ray Tracing"],
          color: "from-blue-600 to-indigo-600",
        },
        {
          id: 5,
          name: "DJI Mavic 3 Pro",
          image: "🚁",
          category: "Drones",
          price: "$2199.99",
          trend: "🌟 NEW",
          trendScore: 84,
          views: "6.8K",
          growth: "+178%",
          rating: 4.8,
          reviews: 567,
          tags: ["4K Camera", "46min Flight", "7km Range"],
          color: "from-orange-500 to-red-500",
        },
        {
          id: 6,
          name: "Apple Watch Ultra 2",
          image: "⌚",
          category: "Wearables",
          price: "$799.99",
          trend: "🔥 HOT",
          trendScore: 87,
          views: "9.3K",
          growth: "+234%",
          rating: 4.7,
          reviews: 1567,
          tags: ["Titanium", "Dive Ready", "GPS"],
          color: "from-gray-500 to-blue-500",
        },
      ],
      categories: [
        {
          id: 1,
          name: "Smartphones",
          trend: "+320%",
          products: 156,
          icon: "📱",
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: 2,
          name: "Gaming Consoles",
          trend: "+280%",
          products: 45,
          icon: "🎮",
          color: "from-purple-500 to-pink-500",
        },
        {
          id: 3,
          name: "Smart Home",
          trend: "+195%",
          products: 89,
          icon: "🏠",
          color: "from-green-500 to-emerald-500",
        },
        {
          id: 4,
          name: "Wearables",
          trend: "+167%",
          products: 67,
          icon: "⌚",
          color: "from-orange-500 to-red-500",
        },
      ],
      brands: [
        {
          id: 1,
          name: "Apple",
          trend: "+289%",
          products: 45,
          logo: "🍎",
          growth: "Exploding",
        },
        {
          id: 2,
          name: "Sony",
          trend: "+234%",
          products: 32,
          logo: "🔊",
          growth: "Rapid",
        },
        {
          id: 3,
          name: "Samsung",
          trend: "+198%",
          products: 38,
          logo: "📱",
          growth: "Growing",
        },
        {
          id: 4,
          name: "Nike",
          trend: "+176%",
          products: 56,
          logo: "👟",
          growth: "Steady",
        },
      ],
    },
    week: {
      products: [
        {
          id: 7,
          name: "iPad Pro M2",
          image: "📱",
          category: "Tablets",
          price: "$1099.99",
          trend: "📈 RISING",
          trendScore: 82,
          views: "18.2K",
          growth: "+167%",
          rating: 4.8,
          reviews: 892,
          tags: ["M2 Chip", "Liquid Retina", "5G"],
          color: "from-gray-500 to-blue-500",
        },
        {
          id: 8,
          name: "Bose QuietComfort",
          image: "🎧",
          category: "Audio",
          price: "$349.99",
          trend: "🔥 HOT",
          trendScore: 79,
          views: "12.7K",
          growth: "+145%",
          rating: 4.6,
          reviews: 1234,
          tags: ["Noise Cancel", "24h Battery", "Comfort"],
          color: "from-blue-500 to-cyan-500",
        },
      ],
      categories: [
        {
          id: 5,
          name: "Laptops",
          trend: "+245%",
          products: 78,
          icon: "💻",
          color: "from-purple-500 to-pink-500",
        },
        {
          id: 6,
          name: "Cameras",
          trend: "+189%",
          products: 34,
          icon: "📸",
          color: "from-indigo-500 to-purple-500",
        },
      ],
      brands: [
        {
          id: 5,
          name: "Google",
          trend: "+167%",
          products: 23,
          logo: "🔍",
          growth: "Growing",
        },
        {
          id: 6,
          name: "Microsoft",
          trend: "+154%",
          products: 28,
          logo: "💻",
          growth: "Steady",
        },
      ],
    },
  };

  const stats = [
    { number: "2.4M", label: "Total Views", change: "+34%", icon: "👁️" },
    { number: "156K", label: "Products Tracked", change: "+12%", icon: "📊" },
    { number: "45K", label: "Trending Items", change: "+67%", icon: "🔥" },
    { number: "98%", label: "Accuracy Rate", change: "+2%", icon: "🎯" },
  ];

  // Add product refs
  const addToProductRefs = (el) => {
    if (el && !productRefs.current.includes(el)) {
      productRefs.current.push(el);
    }
  };

  // Add category refs
  const addToCategoryRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  // Add brand refs
  const addToBrandRefs = (el) => {
    if (el && !brandRefs.current.includes(el)) {
      brandRefs.current.push(el);
    }
  };

  // Add sparkle refs
  const addToSparkleRefs = (el) => {
    if (el && !sparkleRefs.current.includes(el)) {
      sparkleRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const data = trendingData[activeTimeframe] || trendingData.today;
      setTrendingProducts(data.products);
      setTrendingCategories(data.categories);
      setTrendingBrands(data.brands);
      setLoading(false);
    }, 1200);
  }, [activeTimeframe]);

  useEffect(() => {
    if (loading) return;

    const masterTl = gsap.timeline();

    // Header animation with floating effect
    masterTl.fromTo(
      headerRef.current,
      {
        y: -100,
        opacity: 0,
        rotationX: 45,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }
    );

    // Stats animation
    masterTl.fromTo(
      statsRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Timeline animation
    masterTl.fromTo(
      timelineRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Sparkle animations
    sparkleRefs.current.forEach((sparkle, index) => {
      gsap.to(sparkle, {
        rotation: 360,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });
    });

    // Products animation with ScrollTrigger
    productRefs.current.forEach((product, index) => {
      gsap.fromTo(
        product,
        {
          y: 150,
          opacity: 0,
          scale: 0.7,
          rotationY: 15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.9,
          delay: index * 0.15,
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
          y: -15,
          scale: 1.05,
          boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.3)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      product.addEventListener("mouseleave", () => {
        gsap.to(product, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Categories animation
    categoryRefs.current.forEach((category, index) => {
      gsap.fromTo(
        category,
        { x: -80, opacity: 0, rotation: -10 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Brands animation
    brandRefs.current.forEach((brand, index) => {
      gsap.fromTo(
        brand,
        { x: 80, opacity: 0, rotation: 10 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: brand,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating animation for trending items
    gsap.to(".floating-trend", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, [loading, activeTimeframe]);

  const handleTimeframeChange = (timeframe) => {
    setActiveTimeframe(timeframe);
    setLoading(true);

    // Button animation
    const buttons = document.querySelectorAll(".timeframe-btn");
    buttons.forEach((btn) => {
      if (btn.dataset.timeframe === timeframe) {
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.3,
          ease: "elastic.out(1, 0.8)",
        });
      } else {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    // Content transition animation
    gsap.to(".trending-content", {
      opacity: 0,
      y: 50,
      duration: 0.3,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(".trending-content", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }, 300);
      },
    });
  };

  const getTrendColor = (score) => {
    if (score >= 90) return "from-red-500 to-orange-500";
    if (score >= 80) return "from-orange-500 to-yellow-500";
    if (score >= 70) return "from-green-500 to-emerald-500";
    return "from-blue-500 to-cyan-500";
  };

  const getTrendIcon = (score) => {
    if (score >= 90) return "🚀";
    if (score >= 80) return "🔥";
    if (score >= 70) return "📈";
    return "⭐";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tracking Trends...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 pt-20"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>

        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={addToSparkleRefs}
            className="absolute text-2xl opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 relative z-10">
              TRENDING NOW
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-30 transform scale-110"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Discover what's hot right now! Real-time trending products,
            categories, and brands based on millions of user interactions.
          </p>

          {/* Timeframe Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                data-timeframe={timeframe.id}
                onClick={() => handleTimeframeChange(timeframe.id)}
                className={`timeframe-btn flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 interactive ${
                  activeTimeframe === timeframe.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl scale-105"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg"
                }`}
              >
                <span className="text-xl">{timeframe.icon}</span>
                <span className="font-semibold">{timeframe.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group floating-trend"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trending Products */}
        <div className="trending-content">
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🔥 Trending Products
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Live Updates</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {trendingProducts.map((product, index) => (
                <div
                  key={product.id}
                  ref={addToProductRefs}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group relative overflow-hidden"
                >
                  {/* Trend Score Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`bg-gradient-to-r ${getTrendColor(
                        product.trendScore
                      )} text-white px-3 py-2 rounded-2xl text-center shadow-lg`}
                    >
                      <div className="text-xs font-bold">
                        {getTrendIcon(product.trendScore)}
                      </div>
                      <div className="text-lg font-black">
                        {product.trendScore}
                      </div>
                    </div>
                  </div>

                  {/* Product Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-3xl text-white">
                        {product.image}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-black text-gray-800 text-xl mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 font-bold">
                          {product.price}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                          {product.trend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-black text-gray-800">
                        {product.views}
                      </div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-green-600">
                        {product.growth}
                      </div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-black text-gray-800">
                          {product.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive">
                      View Details
                    </button>
                    <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 interactive">
                      <span className="text-lg">💖</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Categories & Brands */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trending Categories */}
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                📈 Hot Categories
              </h3>
              <div className="space-y-4">
                {trendingCategories.map((category, index) => (
                  <div
                    key={category.id}
                    ref={addToCategoryRefs}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 interactive group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center`}
                        >
                          <span className="text-xl text-white">
                            {category.icon}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {category.products} products
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-green-600">
                          {category.trend}
                        </div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Brands */}
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                🏆 Top Brands
              </h3>
              <div className="space-y-4">
                {trendingBrands.map((brand, index) => (
                  <div
                    key={brand.id}
                    ref={addToBrandRefs}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 interactive group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                          <span className="text-xl text-white">
                            {brand.logo}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {brand.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {brand.products} trending items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-green-600">
                          {brand.trend}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {brand.growth}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Timeline */}
          <div
            ref={timelineRef}
            className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
          >
            <h3 className="text-2xl font-black mb-6 text-center">
              📊 Trend Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black mb-2">12H</div>
                <div className="text-purple-200">iPhone 15 Launch</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-2">24H</div>
                <div className="text-purple-200">PlayStation Release</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-2">48H</div>
                <div className="text-purple-200">Black Friday Start</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-2">72H</div>
                <div className="text-purple-200">Cyber Monday Peak</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
