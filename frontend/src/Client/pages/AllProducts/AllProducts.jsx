import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const productGridRef = useRef(null);
  const productRefs = useRef([]);
  const categoryRefs = useRef([]);
  const loadMoreRef = useRef(null);

  const categories = [
    { id: "all", name: "All Products", icon: "🌟", count: 156 },
    { id: "electronics", name: "Electronics", icon: "📱", count: 45 },
    { id: "fashion", name: "Fashion", icon: "👗", count: 38 },
    { id: "home", name: "Home & Garden", icon: "🏠", count: 29 },
    { id: "sports", name: "Sports", icon: "⚽", count: 22 },
    { id: "beauty", name: "Beauty", icon: "💄", count: 31 },
    { id: "books", name: "Books", icon: "📚", count: 51 },
  ];

  const filters = {
    price: [
      "Under $25",
      "$25 - $50",
      "$50 - $100",
      "$100 - $200",
      "Above $200",
    ],
    rating: ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"],
    brands: ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Dell"],
  };

  // Generate mock products
  useEffect(() => {
    const mockProducts = [
      // Electronics
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        originalPrice: 1099.99,
        category: "electronics",
        rating: 4.8,
        reviewCount: 1247,
        image: "📱",
        featured: true,
        discount: 9,
        brand: "Apple",
        tags: ["New", "5G", "Face ID"],
      },
      {
        id: 2,
        name: 'MacBook Pro 16"',
        price: 2399.99,
        originalPrice: 2599.99,
        category: "electronics",
        rating: 4.9,
        reviewCount: 892,
        image: "💻",
        featured: true,
        discount: 8,
        brand: "Apple",
        tags: ["M2 Pro", "32GB", "1TB"],
      },
      {
        id: 3,
        name: "Sony WH-1000XM5",
        price: 399.99,
        originalPrice: 449.99,
        category: "electronics",
        rating: 4.7,
        reviewCount: 2341,
        image: "🎧",
        featured: false,
        discount: 11,
        brand: "Sony",
        tags: ["Noise Cancel", "Wireless", "30h Battery"],
      },
      {
        id: 4,
        name: "Samsung Galaxy Watch",
        price: 299.99,
        originalPrice: 349.99,
        category: "electronics",
        rating: 4.5,
        reviewCount: 1567,
        image: "⌚",
        featured: false,
        discount: 14,
        brand: "Samsung",
        tags: ["Smart Watch", "Health", "Waterproof"],
      },

      // Fashion
      {
        id: 5,
        name: "Designer Leather Jacket",
        price: 299.99,
        originalPrice: 399.99,
        category: "fashion",
        rating: 4.6,
        reviewCount: 423,
        image: "🧥",
        featured: true,
        discount: 25,
        brand: "Nike",
        tags: ["Premium", "Leather", "Winter"],
      },
      {
        id: 6,
        name: "Running Shoes Pro",
        price: 129.99,
        originalPrice: 159.99,
        category: "fashion",
        rating: 4.4,
        reviewCount: 1892,
        image: "👟",
        featured: false,
        discount: 19,
        brand: "Adidas",
        tags: ["Running", "Comfort", "Durable"],
      },
      {
        id: 7,
        name: "Classic Sunglasses",
        price: 89.99,
        originalPrice: 129.99,
        category: "fashion",
        rating: 4.3,
        reviewCount: 756,
        image: "🕶️",
        featured: false,
        discount: 31,
        brand: "Ray-Ban",
        tags: ["UV Protection", "Classic"],
      },

      // Home & Garden
      {
        id: 8,
        name: "Smart Home Speaker",
        price: 199.99,
        originalPrice: 249.99,
        category: "home",
        rating: 4.7,
        reviewCount: 3123,
        image: "🔊",
        featured: true,
        discount: 20,
        brand: "Amazon",
        tags: ["Alexa", "Smart Home", "Voice Control"],
      },
      {
        id: 9,
        name: "Air Purifier Pro",
        price: 179.99,
        originalPrice: 229.99,
        category: "home",
        rating: 4.5,
        reviewCount: 987,
        image: "💨",
        featured: false,
        discount: 22,
        brand: "Dyson",
        tags: ["HEPA", "Auto Mode", "Quiet"],
      },

      // Sports
      {
        id: 10,
        name: "Professional Basketball",
        price: 49.99,
        originalPrice: 69.99,
        category: "sports",
        rating: 4.6,
        reviewCount: 234,
        image: "🏀",
        featured: false,
        discount: 29,
        brand: "Spalding",
        tags: ["Official", "Durable", "Grip"],
      },
      {
        id: 11,
        name: "Yoga Mat Premium",
        price: 39.99,
        originalPrice: 59.99,
        category: "sports",
        rating: 4.4,
        reviewCount: 567,
        image: "🧘",
        featured: false,
        discount: 33,
        brand: "Lululemon",
        tags: ["Non-slip", "Eco-friendly", "Thick"],
      },

      // Beauty
      {
        id: 12,
        name: "Skincare Set",
        price: 79.99,
        originalPrice: 119.99,
        category: "beauty",
        rating: 4.8,
        reviewCount: 1894,
        image: "💆",
        featured: true,
        discount: 33,
        brand: "La Roche-Posay",
        tags: ["Sensitive Skin", "Set", "Organic"],
      },
      {
        id: 13,
        name: "Professional Hair Dryer",
        price: 89.99,
        originalPrice: 129.99,
        category: "beauty",
        rating: 4.5,
        reviewCount: 2341,
        image: "💇",
        featured: false,
        discount: 31,
        brand: "Dyson",
        tags: ["Ionic", "Fast Drying", "Lightweight"],
      },

      // Books
      {
        id: 14,
        name: "Bestseller Novel",
        price: 14.99,
        originalPrice: 24.99,
        category: "books",
        rating: 4.7,
        reviewCount: 4567,
        image: "📖",
        featured: false,
        discount: 40,
        brand: "Penguin",
        tags: ["Fiction", "Award Winner"],
      },
      {
        id: 15,
        name: "Cookbook Collection",
        price: 29.99,
        originalPrice: 49.99,
        category: "books",
        rating: 4.6,
        reviewCount: 1234,
        image: "🍳",
        featured: true,
        discount: 40,
        brand: "Williams Sonoma",
        tags: ["Recipes", "Hardcover", "Illustrated"],
      },
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

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

  useEffect(() => {
    if (loading) return;

    // Page load animation
    const masterTl = gsap.timeline();

    // Header animation
    masterTl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Filter section animation
    masterTl.fromTo(
      filterRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Categories animation
    masterTl.fromTo(
      categoryRefs.current,
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

    // Product grid animation
    masterTl.fromTo(
      productGridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // Individual product animations with ScrollTrigger
    productRefs.current.forEach((product, index) => {
      gsap.fromTo(
        product,
        {
          y: 100,
          opacity: 0,
          rotationY: 10,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.05,
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
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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

    // Load more button animation
    if (loadMoreRef.current) {
      gsap.fromTo(
        loadMoreRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: loadMoreRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [loading, filteredProducts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    // Animate category buttons
    categoryRefs.current.forEach((cat, index) => {
      if (categories[index].id === categoryId) {
        gsap.to(cat, {
          scale: 1.05,
          duration: 0.3,
          ease: "elastic.out(1, 0.8)",
        });
      } else {
        gsap.to(cat, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    // Filter products
    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === categoryId)
      );
    }
  };

  const handleAddToCart = (productId) => {
    const productElement = productRefs.current.find(
      (_, index) => filteredProducts[index]?.id === productId
    );

    if (productElement) {
      // Add to cart animation
      gsap.to(productElement, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const handleQuickView = (product) => {
    // Quick view animation
    const quickViewModal = document.createElement("div");
    quickViewModal.className =
      "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center";
    quickViewModal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4">
        <h3 class="text-2xl font-bold mb-4">${product.name}</h3>
        <p>Quick view content for ${product.name}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl">Close</button>
      </div>
    `;
    document.body.appendChild(quickViewModal);

    gsap.fromTo(
      quickViewModal,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Loading Products...
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
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our carefully curated collection of premium products. From
            cutting-edge technology to timeless fashion, find exactly what
            you're looking for.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 space-x-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={addToCategoryRefs}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 interactive ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{category.name}</div>
                <div
                  className={`text-sm ${
                    selectedCategory === category.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {category.count} items
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div ref={filterRef} className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 sticky top-24">
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {filters.price.map((range) => (
                    <label
                      key={range}
                      className="flex items-center space-x-3 cursor-pointer interactive"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Customer Rating
                </h4>
                <div className="space-y-2">
                  {filters.rating.map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-3 cursor-pointer interactive"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-700">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Brands</h4>
                <div className="space-y-2">
                  {filters.brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center space-x-3 cursor-pointer interactive"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 interactive">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div ref={productGridRef} className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="text-gray-600 mb-4 sm:mb-0">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  ref={addToProductRefs}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
                >
                  {/* Product Image */}
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                      <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                          {product.discount}% OFF
                        </span>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-purple-500 text-white text-sm font-bold rounded-full">
                          FEATURED
                        </span>
                      </div>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => handleQuickView(product)}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 interactive"
                    >
                      <span className="text-lg">👁️</span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-black text-gray-800">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
                    >
                      🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div ref={loadMoreRef} className="text-center mt-12">
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 interactive">
                Load More Products ↓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
