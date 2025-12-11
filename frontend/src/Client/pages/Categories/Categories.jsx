import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const categoryGridRef = useRef(null);
  const categoryRefs = useRef([]);
  const featuredRef = useRef(null);
  const statsRefs = useRef([]);

  // Sample categories data
  const categoriesData = [
    {
      id: 1,
      name: "Smartphones",
      description:
        "Latest smartphones from top brands with cutting-edge technology",
      image: "📱",
      productCount: 156,
      trending: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      features: ["5G Connectivity", "High-Res Cameras", "Long Battery Life"],
      popularBrands: ["Apple", "Samsung", "Google", "OnePlus"],
    },
    {
      id: 2,
      name: "Laptops & Computers",
      description:
        "Powerful laptops, desktops, and accessories for work and gaming",
      image: "💻",
      productCount: 89,
      trending: true,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      features: ["High Performance", "Gaming Ready", "Ultra Portable"],
      popularBrands: ["Apple", "Dell", "HP", "Lenovo"],
    },
    {
      id: 3,
      name: "Audio & Headphones",
      description:
        "Immerse yourself in crystal-clear sound with premium audio gear",
      image: "🎧",
      productCount: 67,
      trending: false,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      features: ["Noise Cancelling", "Wireless", "Hi-Fi Sound"],
      popularBrands: ["Sony", "Bose", "Sennheiser", "JBL"],
    },
    {
      id: 4,
      name: "Smart Watches",
      description:
        "Stay connected and track your fitness with smart wearable technology",
      image: "⌚",
      productCount: 45,
      trending: true,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      features: ["Health Tracking", "Notifications", "Water Resistant"],
      popularBrands: ["Apple", "Samsung", "Fitbit", "Garmin"],
    },
    {
      id: 5,
      name: "Cameras & Photography",
      description:
        "Capture life's moments with professional cameras and equipment",
      image: "📸",
      productCount: 34,
      trending: false,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      features: ["4K Video", "Interchangeable Lenses", "Professional Grade"],
      popularBrands: ["Canon", "Nikon", "Sony", "GoPro"],
    },
    {
      id: 6,
      name: "Gaming Consoles",
      description:
        "Next-gen gaming consoles and accessories for ultimate entertainment",
      image: "🎮",
      productCount: 28,
      trending: true,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      features: ["4K Gaming", "VR Ready", "Online Multiplayer"],
      popularBrands: ["PlayStation", "Xbox", "Nintendo", "Steam"],
    },
    {
      id: 7,
      name: "Home Appliances",
      description: "Smart home devices and appliances for modern living",
      image: "🏠",
      productCount: 123,
      trending: false,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      features: ["Smart Home", "Energy Efficient", "Voice Controlled"],
      popularBrands: ["Samsung", "LG", "Philips", "Dyson"],
    },
    {
      id: 8,
      name: "Fitness Equipment",
      description:
        "Stay active and healthy with premium fitness gear and equipment",
      image: "💪",
      productCount: 56,
      trending: true,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      features: ["Smart Tracking", "Home Gym", "Professional Grade"],
      popularBrands: ["Peloton", "NordicTrack", "Bowflex", "Fitbit"],
    },
    {
      id: 9,
      name: "Fashion & Wearables",
      description: "Stylish clothing, accessories, and wearable technology",
      image: "👕",
      productCount: 234,
      trending: false,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      features: ["Smart Fabrics", "Fashion Tech", "Premium Materials"],
      popularBrands: ["Apple", "Samsung", "Fossil", "Garmin"],
    },
    {
      id: 10,
      name: "Books & Education",
      description: "Educational materials, books, and learning resources",
      image: "📚",
      productCount: 567,
      trending: false,
      color: "from-gray-500 to-blue-500",
      bgColor: "bg-gray-50",
      features: ["E-books", "Audiobooks", "Educational Kits"],
      popularBrands: ["Amazon", "Apple", "Google", "Microsoft"],
    },
    {
      id: 11,
      name: "Beauty & Personal Care",
      description: "Beauty products, skincare, and personal care devices",
      image: "💄",
      productCount: 178,
      trending: true,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      features: ["Smart Devices", "Organic", "Professional Grade"],
      popularBrands: ["Dyson", "Foreo", "NuFACE", "Clarisonic"],
    },
    {
      id: 12,
      name: "Toys & Games",
      description:
        "Fun and educational toys, games, and entertainment for all ages",
      image: "🧸",
      productCount: 89,
      trending: false,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      features: ["Educational", "Interactive", "Age Appropriate"],
      popularBrands: ["LEGO", "Hasbro", "Mattel", "Nintendo"],
    },
  ];

  const stats = [
    { number: "50+", label: "Categories", icon: "📊" },
    { number: "2,000+", label: "Products", icon: "📦" },
    { number: "100+", label: "Brands", icon: "🏷️" },
    { number: "98%", label: "Satisfaction", icon: "⭐" },
  ];

  // Add category refs
  const addToCategoryRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  // Add stats refs
  const addToStatsRefs = (el) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setCategories(categoriesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) return;

    const masterTl = gsap.timeline();

    // Header animation
    masterTl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Search bar animation
    masterTl.fromTo(
      searchRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Stats animation
    masterTl.fromTo(
      statsRefs.current,
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Featured categories animation
    masterTl.fromTo(
      featuredRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Categories grid animation
    masterTl.fromTo(
      categoryGridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // Individual category animations with ScrollTrigger
    categoryRefs.current.forEach((category, index) => {
      gsap.fromTo(
        category,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Category hover animations
      category.addEventListener("mouseenter", () => {
        gsap.to(category, {
          y: -10,
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      category.addEventListener("mouseleave", () => {
        gsap.to(category, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  }, [loading]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Click animation
    const categoryElement = categoryRefs.current.find(
      (_, index) => categories[index]?.id === category.id
    );

    if (categoryElement) {
      gsap.to(categoryElement, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingCategories = categories.filter((category) => category.trending);
  const featuredCategories = categories.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loading Categories...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Shop Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our wide range of product categories. From cutting-edge
            technology to lifestyle essentials, find exactly what you're looking
            for.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg shadow-lg"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={addToStatsRefs}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 text-center shadow-xl border border-white/20 interactive group"
            >
              <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Categories */}
        <div ref={featuredRef} className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 interactive group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">{category.image}</span>
                    </div>
                    {category.trending && (
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                        TRENDING
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.productCount} products
                    </span>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        {trendingCategories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
              🔥 Trending Now
            </h2>
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              {trendingCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-80 bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{category.image}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.productCount} products
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Categories Grid */}
        <div ref={categoryGridRef}>
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
            All Categories
          </h2>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                No Categories Found
              </h3>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                No categories match your search. Try different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  ref={addToCategoryRefs}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group cursor-pointer"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{category.image}</span>
                    </div>
                    {category.trending && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Category Info */}
                  <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {category.features
                      .slice(0, 2)
                      .map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    {category.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs rounded-full">
                        +{category.features.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {category.productCount} products
                    </div>
                    <div className="flex -space-x-2">
                      {category.popularBrands
                        .slice(0, 3)
                        .map((brand, brandIndex) => (
                          <div
                            key={brandIndex}
                            className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                            title={brand}
                          >
                            {brand.charAt(0)}
                          </div>
                        ))}
                      {category.popularBrands.length > 3 && (
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">
                          +{category.popularBrands.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Detail Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {selectedCategory.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 interactive"
                  >
                    <span className="text-lg">✕</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">{selectedCategory.image}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">
                      {selectedCategory.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{selectedCategory.productCount} products</span>
                      {selectedCategory.trending && (
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                          Trending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedCategory.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-gray-600"
                        >
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Popular Brands
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.popularBrands.map((brand, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive">
                  Browse {selectedCategory.productCount} Products
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
