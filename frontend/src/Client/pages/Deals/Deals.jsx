import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const countdownRef = useRef(null);
  const flashSaleRef = useRef(null);
  const dealRefs = useRef([]);
  const featuredRefs = useRef([]);
  const tabRefs = useRef([]);

  // Countdown timer for flash sale
  const calculateTimeLeft = () => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 6); // 6 hours from now

    const difference = targetTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Sample deals data
  const dealsData = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      originalPrice: "$1299.99",
      discountPrice: "$999.99",
      discount: "23% OFF",
      image: "📱",
      category: "Electronics",
      timeLeft: "2 days",
      type: "featured",
      tag: "HOT DEAL",
      sold: 45,
      total: 100,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      originalPrice: "$2599.99",
      discountPrice: "$2199.99",
      discount: "15% OFF",
      image: "💻",
      category: "Electronics",
      timeLeft: "1 day",
      type: "flash",
      tag: "FLASH SALE",
      sold: 78,
      total: 150,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      originalPrice: "$449.99",
      discountPrice: "$349.99",
      discount: "22% OFF",
      image: "🎧",
      category: "Audio",
      timeLeft: "3 hours",
      type: "flash",
      tag: "ENDING SOON",
      sold: 120,
      total: 200,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Designer Leather Jacket",
      originalPrice: "$399.99",
      discountPrice: "$249.99",
      discount: "38% OFF",
      image: "🧥",
      category: "Fashion",
      timeLeft: "5 days",
      type: "featured",
      tag: "BEST SELLER",
      sold: 89,
      total: 200,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Professional Camera Drone",
      originalPrice: "$899.99",
      discountPrice: "$699.99",
      discount: "22% OFF",
      image: "🚁",
      category: "Electronics",
      timeLeft: "12 hours",
      type: "flash",
      tag: "LIMITED STOCK",
      sold: 34,
      total: 50,
      rating: 4.8,
    },
    {
      id: 6,
      name: "Smart Fitness Watch",
      originalPrice: "$299.99",
      discountPrice: "$199.99",
      discount: "33% OFF",
      image: "⌚",
      category: "Wearables",
      timeLeft: "2 days",
      type: "regular",
      tag: "POPULAR",
      sold: 156,
      total: 300,
      rating: 4.5,
    },
    {
      id: 7,
      name: "Gaming Console Pro",
      originalPrice: "$499.99",
      discountPrice: "$399.99",
      discount: "20% OFF",
      image: "🎮",
      category: "Gaming",
      timeLeft: "1 day",
      type: "flash",
      tag: "HOT DEAL",
      sold: 67,
      total: 100,
      rating: 4.9,
    },
    {
      id: 8,
      name: "Wireless Earbuds Pro",
      originalPrice: "$199.99",
      discountPrice: "$129.99",
      discount: "35% OFF",
      image: "🎵",
      category: "Audio",
      timeLeft: "4 days",
      type: "regular",
      tag: "NEW",
      sold: 234,
      total: 500,
      rating: 4.4,
    },
    {
      id: 9,
      name: '4K Smart TV 65"',
      originalPrice: "$1199.99",
      discountPrice: "$899.99",
      discount: "25% OFF",
      image: "📺",
      category: "Electronics",
      timeLeft: "3 days",
      type: "featured",
      tag: "MEGA DEAL",
      sold: 45,
      total: 100,
      rating: 4.7,
    },
    {
      id: 10,
      name: "Robot Vacuum Cleaner",
      originalPrice: "$399.99",
      discountPrice: "$299.99",
      discount: "25% OFF",
      image: "🤖",
      category: "Home",
      timeLeft: "6 hours",
      type: "flash",
      tag: "FLASH SALE",
      sold: 89,
      total: 150,
      rating: 4.6,
    },
    {
      id: 11,
      name: "Professional Blender",
      originalPrice: "$249.99",
      discountPrice: "$179.99",
      discount: "28% OFF",
      image: "🥤",
      category: "Kitchen",
      timeLeft: "2 days",
      type: "regular",
      tag: "KITCHEN ESSENTIAL",
      sold: 167,
      total: 300,
      rating: 4.5,
    },
    {
      id: 12,
      name: "Designer Backpack",
      originalPrice: "$179.99",
      discountPrice: "$119.99",
      discount: "33% OFF",
      image: "🎒",
      category: "Fashion",
      timeLeft: "1 day",
      type: "flash",
      tag: "TRENDING",
      sold: 78,
      total: 120,
      rating: 4.6,
    },
  ];

  const dealTypes = [
    { id: "all", name: "All Deals", count: 12, icon: "🔥" },
    { id: "flash", name: "Flash Sales", count: 6, icon: "⚡" },
    { id: "featured", name: "Featured", count: 3, icon: "⭐" },
    { id: "ending", name: "Ending Soon", count: 4, icon: "⏰" },
  ];

  // Add deal refs
  const addToDealRefs = (el) => {
    if (el && !dealRefs.current.includes(el)) {
      dealRefs.current.push(el);
    }
  };

  // Add featured refs
  const addToFeaturedRefs = (el) => {
    if (el && !featuredRefs.current.includes(el)) {
      featuredRefs.current.push(el);
    }
  };

  // Add tab refs
  const addToTabRefs = (el) => {
    if (el && !tabRefs.current.includes(el)) {
      tabRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Initialize timer
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Simulate data loading
    setTimeout(() => {
      setDeals(dealsData);
      setFlashSales(dealsData.filter((deal) => deal.type === "flash"));
      setFeaturedDeals(dealsData.filter((deal) => deal.type === "featured"));
      setLoading(false);
    }, 1500);

    return () => clearInterval(timer);
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

    // Countdown animation
    masterTl.fromTo(
      countdownRef.current,
      { scale: 0.5, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Flash sale animation
    masterTl.fromTo(
      flashSaleRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Tabs animation
    masterTl.fromTo(
      tabRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Featured deals animation
    masterTl.fromTo(
      featuredRefs.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Deals grid animation with ScrollTrigger
    dealRefs.current.forEach((deal, index) => {
      gsap.fromTo(
        deal,
        {
          y: 80,
          opacity: 0,
          rotationX: 10,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: deal,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Deal hover animations
      deal.addEventListener("mouseenter", () => {
        gsap.to(deal, {
          y: -8,
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      deal.addEventListener("mouseleave", () => {
        gsap.to(deal, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Pulse animation for flash sale timer
    gsap.to(".pulse-timer", {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [loading, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Tab animation
    tabRefs.current.forEach((tab, index) => {
      if (dealTypes[index].id === tabId) {
        gsap.to(tab, {
          scale: 1.05,
          duration: 0.3,
          ease: "elastic.out(1, 0.8)",
        });
      } else {
        gsap.to(tab, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    // Content transition animation
    gsap.to(".deals-content", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to(".deals-content", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  const handleQuickBuy = (dealId) => {
    const dealElement = dealRefs.current.find(
      (_, index) => filteredDeals[index]?.id === dealId
    );

    if (dealElement) {
      // Quick buy animation
      gsap.to(dealElement, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const getFilteredDeals = () => {
    switch (activeTab) {
      case "flash":
        return deals.filter((deal) => deal.type === "flash");
      case "featured":
        return deals.filter((deal) => deal.type === "featured");
      case "ending":
        return deals.filter(
          (deal) =>
            deal.timeLeft.includes("hour") || deal.timeLeft.includes("hours")
        );
      default:
        return deals;
    }
  };

  const filteredDeals = getFilteredDeals();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔥</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loading Hot Deals...
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            Hot Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Don't miss out on these incredible offers! Limited time deals with
            massive discounts on your favorite products.
          </p>
        </div>

        {/* Flash Sale Countdown */}
        <div
          ref={countdownRef}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h2 className="text-3xl font-black mb-2">⚡ Flash Sale Live!</h2>
              <p className="text-orange-100 text-lg">
                Massive discounts for the next 6 hours only!
              </p>
            </div>

            <div className="flex items-center space-x-4 pulse-timer">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-black">
                    {String(timeLeft.hours || 0).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-sm text-orange-100 mt-2">HOURS</div>
              </div>

              <div className="text-2xl font-black text-orange-200">:</div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-black">
                    {String(timeLeft.minutes || 0).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-sm text-orange-100 mt-2">MINUTES</div>
              </div>

              <div className="text-2xl font-black text-orange-200">:</div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-black">
                    {String(timeLeft.seconds || 0).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-sm text-orange-100 mt-2">SECONDS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Products */}
        <div ref={flashSaleRef} className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-8">
            ⚡ Flash Sale Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSales.slice(0, 3).map((deal, index) => (
              <div
                key={deal.id}
                ref={addToFeaturedRefs}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 interactive group relative overflow-hidden"
              >
                {/* Hot Deal Ribbon */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    {deal.tag}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
                    style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                  ></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{deal.image}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                        {deal.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-red-600 font-black text-xl">
                          {deal.discountPrice}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          {deal.originalPrice}
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                          {deal.discount}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {deal.sold} of {deal.total} sold
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(deal.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {deal.timeLeft} left
                    </span>
                  </div>

                  <button
                    onClick={() => handleQuickBuy(deal.id)}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
                  >
                    Quick Buy - {deal.discountPrice}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {dealTypes.map((type, index) => (
            <button
              key={type.id}
              ref={addToTabRefs}
              onClick={() => handleTabChange(type.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 interactive ${
                activeTab === type.id
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg"
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{type.name}</div>
                <div
                  className={`text-sm ${
                    activeTab === type.id ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {type.count} deals
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* All Deals Grid */}
        <div className="deals-content">
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
            {activeTab === "all"
              ? "All Deals"
              : activeTab === "flash"
              ? "Flash Sales"
              : activeTab === "featured"
              ? "Featured Deals"
              : "Ending Soon"}
          </h2>

          {filteredDeals.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">😔</div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                No Deals Found
              </h3>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                No deals available in this category. Check back later for new
                offers!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDeals.map((deal, index) => (
                <div
                  key={deal.id}
                  ref={addToDealRefs}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
                >
                  {/* Deal Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        deal.type === "flash"
                          ? "bg-red-500 text-white animate-pulse"
                          : deal.type === "featured"
                          ? "bg-purple-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {deal.tag}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {deal.timeLeft}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl">{deal.image}</span>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                    {deal.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-red-600 font-black text-xl">
                      {deal.discountPrice}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      {deal.originalPrice}
                    </span>
                  </div>

                  {/* Rating and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-sm text-gray-600">
                        {deal.rating}
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {deal.category}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Sold: {deal.sold}</span>
                      <span>Total: {deal.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000"
                        style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleQuickBuy(deal.id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive text-sm"
                    >
                      Buy Now
                    </button>
                    <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 interactive">
                      <span className="text-lg">💖</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Never Miss a Deal! 🎯</h3>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">
            Get exclusive deals and early access to flash sales delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 interactive">
              Get Deals!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
