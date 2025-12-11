import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Refs for animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const searchBarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Navigation items
  const navItems = [
    { path: "/home", label: "Home", icon: "🏠" },
    { path: "/all-products", label: "Products", icon: "📦" },
    // { path: "/categories", label: "Categories", icon: "📊" },
    { path: "/deals", label: "Deals", icon: "🔥" },
    // { path: "/trending", label: "Trending", icon: "🚀" },
    { path: "/blog", label: "Blog", icon: "📝" },
    // { path: "/cart", label: "Cart", icon: "🛒" },
    // { path: "/user-profile", label: "Profile", icon: "👤" },
    { path: "/product-feed", label: "Social", icon: "🎃" },
  ];

  // Add menu item refs
  const addToMenuItemsRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial animations
    const tl = gsap.timeline();

    // Navbar background animation
    tl.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Menu items animation
    tl.fromTo(
      menuItemsRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Search button animation
    tl.fromTo(
      searchButtonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.8)" },
      "-=0.2"
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      // Open mobile menu animation
      gsap.to(menuButtonRef.current, {
        rotation: 90,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        mobileMenuRef.current,
        {
          x: "100%",
          opacity: 0,
          scale: 0.8,
        },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );

      // Animate mobile menu items
      gsap.fromTo(
        ".mobile-menu-item",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      // Close mobile menu animation
      gsap.to(menuButtonRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      // Open search animation
      gsap.to(searchButtonRef.current, {
        scale: 1.2,
        duration: 0.2,
        ease: "elastic.out(1, 0.8)",
      });

      gsap.fromTo(
        searchBarRef.current,
        {
          width: 0,
          opacity: 0,
          scale: 0.8,
        },
        {
          width: "300px",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    } else {
      // Close search animation
      gsap.to(searchBarRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  const { user } = useSelector((state) => state.register);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search submitted");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20"
            : "bg-white/80 backdrop-blur-lg shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              ref={logoRef}
              to="/home"
              className="flex items-center space-x-3 interactive group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                  {user?.lastName}ShopHub
                </span>
                <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  ref={addToMenuItemsRefs}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 interactive group relative ${
                    location.pathname === item.path
                      ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg scale-105"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>

                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div
                  ref={searchBarRef}
                  className={`overflow-hidden ${isSearchOpen ? "w-80" : "w-0"}`}
                >
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      placeholder="Search products, brands, categories..."
                      className="w-full px-4 py-2 bg-gray-100 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-xl font-semibold hover:shadow-lg transition-all duration-200 interactive"
                    >
                      🔍
                    </button>
                  </form>
                </div>

                {/* Search Toggle Button */}
                <button
                  ref={searchButtonRef}
                  onClick={toggleSearch}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 interactive ml-2"
                >
                  <span className="text-lg">{isSearchOpen ? "✕" : "🔍"}</span>
                </button>
              </div>

              {/* Cart & User (Desktop) */}
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/cart">
                  <button className="relative w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 interactive group">
                    <span className="text-lg">🛒</span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-200">
                      3
                    </span>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200 interactive">
                    🙋‍♂️
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200 interactive">
                    🤷‍♂️
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="lg:hidden w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-200 interactive"
              >
                <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden flex items-start justify-center pt-32 px-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/20">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Search Everything
                </h3>
                <button
                  onClick={toggleSearch}
                  className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <span className="text-lg">✕</span>
                </button>
              </div>

              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              />

              <div className="flex flex-wrap gap-2">
                {["iPhone", "Laptop", "Headphones", "Gaming", "Fashion"].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-colors duration-200 interactive"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
              >
                Search Products
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        >
          <div className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20 overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <div className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ShopHub
                  </div>
                  <div className="text-sm text-gray-500">Welcome back!</div>
                </div>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-3 pl-12 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="p-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-menu-item flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 interactive group ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-lg">{item.label}</span>

                  {location.pathname === item.path && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <div className="font-semibold text-gray-800">John Doe</div>
                  <div className="text-sm text-gray-500">Gold Member</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="p-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors duration-200 interactive text-center">
                  <div className="text-lg mb-1">💖</div>
                  <div className="text-sm font-medium">Wishlist</div>
                </button>
                <button className="p-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors duration-200 interactive text-center">
                  <div className="text-lg mb-1">⚙️</div>
                  <div className="text-sm font-medium">Settings</div>
                </button>
              </div>
            </div>

            {/* Mobile Cart */}
            <div className="p-6 border-t border-gray-200">
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all duration-200 interactive">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <div className="font-semibold">Your Cart</div>
                    <div className="text-sm text-white/80">
                      3 items • $299.99
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
