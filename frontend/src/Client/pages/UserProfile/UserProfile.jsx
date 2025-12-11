import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const statsRefs = useRef([]);
  const orderRefs = useRef([]);
  const activityRefs = useRef([]);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    avatar: "👨‍💼",
    level: "Gold Member",
    points: 2450,
    orders: 12,
    wishlist: 8,
    reviews: 7,
  };

  const recentOrders = [
    {
      id: "#ORD-789012",
      date: "2024-03-15",
      status: "Delivered",
      total: "$299.99",
      items: 2,
      tracking: "SH-789012345",
    },
    {
      id: "#ORD-789011",
      date: "2024-03-10",
      status: "Processing",
      total: "$1,199.99",
      items: 3,
      tracking: "SH-789012344",
    },
    {
      id: "#ORD-789010",
      date: "2024-03-05",
      status: "Shipped",
      total: "$89.99",
      items: 1,
      tracking: "SH-789012343",
    },
    {
      id: "#ORD-789009",
      date: "2024-02-28",
      status: "Delivered",
      total: "$459.99",
      items: 4,
      tracking: "SH-789012342",
    },
  ];

  const recentActivity = [
    {
      type: "order",
      message: "You placed a new order",
      time: "2 hours ago",
      icon: "🛒",
    },
    {
      type: "review",
      message: "You reviewed iPhone 15 Pro",
      time: "1 day ago",
      icon: "⭐",
    },
    {
      type: "wishlist",
      message: "Added MacBook Pro to wishlist",
      time: "2 days ago",
      icon: "💖",
    },
    {
      type: "login",
      message: "Successful login from new device",
      time: "3 days ago",
      icon: "🔐",
    },
    {
      type: "points",
      message: "Earned 150 loyalty points",
      time: "1 week ago",
      icon: "🎯",
    },
  ];

  const stats = [
    {
      label: "Total Orders",
      value: "12",
      change: "+2",
      trend: "up",
      icon: "📦",
    },
    {
      label: "Total Spent",
      value: "$3,245.99",
      change: "+$450",
      trend: "up",
      icon: "💰",
    },
    {
      label: "Wishlist Items",
      value: "8",
      change: "-1",
      trend: "down",
      icon: "💖",
    },
    {
      label: "Reviews Written",
      value: "7",
      change: "+3",
      trend: "up",
      icon: "⭐",
    },
  ];

  // Add stats refs
  const addToStatsRefs = (el) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  // Add order refs
  const addToOrderRefs = (el) => {
    if (el && !orderRefs.current.includes(el)) {
      orderRefs.current.push(el);
    }
  };

  // Add activity refs
  const addToActivityRefs = (el) => {
    if (el && !activityRefs.current.includes(el)) {
      activityRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setUserData(user);
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

    // Sidebar animation
    masterTl.fromTo(
      sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Content animation
    masterTl.fromTo(
      contentRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Stats cards animation
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

    // Orders animation
    orderRefs.current.forEach((order, index) => {
      gsap.fromTo(
        order,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: order,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Activity animation
    activityRefs.current.forEach((activity, index) => {
      gsap.fromTo(
        activity,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: activity,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Hover animations
    const interactiveElements = document.querySelectorAll(".interactive");
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, [loading, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Tab change animation
    gsap.to(".tab-content", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to(".tab-content", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  const handleEditProfile = () => {
    setEditMode(!editMode);

    if (!editMode) {
      gsap.fromTo(
        ".edit-form",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  const OverviewTab = () => (
    <div className="tab-content space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={addToStatsRefs}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-semibold ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span>{stat.trend === "up" ? "↗" : "↘"}</span>
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-3xl font-black text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Recent Orders
            </h3>
            <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={order.id}
                ref={addToOrderRefs}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl interactive group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-xl">📦</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {order.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.date} • {order.items} items
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{order.total}</div>
                  <div
                    className={`text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                ref={addToActivityRefs}
                className="flex items-center space-x-4 p-3 interactive group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-gray-800">
                    {activity.message}
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-black mb-2">Gold Member Status</h3>
            <p className="text-purple-100 mb-4">
              You've earned {user.points} loyalty points. Only 550 points until
              Platinum!
            </p>
            <div className="w-full bg-purple-500 rounded-full h-3 mb-2">
              <div
                className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(user.points / 3000) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-purple-200">
              {user.points} / 3000 points
            </div>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 interactive">
            View Benefits
          </button>
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="tab-content">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Order History
        </h3>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={order.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-gray-50 rounded-2xl interactive group"
            >
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">
                    {order.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    Placed on {order.date}
                  </div>
                  <div className="text-sm text-gray-500">
                    Tracking: {order.tracking}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:items-end space-y-2">
                <div className="font-bold text-xl text-gray-800">
                  {order.total}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WishlistTab = () => (
    <div className="tab-content">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Your Wishlist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl interactive group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-800">iPhone 15 Pro</h4>
                <div className="text-lg font-bold text-gray-800 mt-1">
                  $999.99
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm text-gray-600">
                    4.8 (1.2K reviews)
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center interactive hover:bg-red-100 transition-colors duration-200">
                <span className="text-lg">🗑️</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="tab-content">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Profile Settings
          </h3>
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 interactive"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {editMode ? (
          <div className="edit-form space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  defaultValue="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  defaultValue="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                defaultValue="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center text-white text-4xl">
                {user.avatar}
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-800">
                  {user.name}
                </h4>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {user.joinDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800">
                  Account Information
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membership Level</span>
                    <span className="font-semibold text-purple-600">
                      {user.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loyalty Points</span>
                    <span className="font-semibold text-gray-800">
                      {user.points}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-semibold text-gray-800">
                      {user.orders}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800">Preferences</h5>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      defaultChecked
                    />
                    <span className="text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      defaultChecked
                    />
                    <span className="text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Marketing emails</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍💼</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loading Profile...
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
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome back, {user.name}! Here's your personalized overview and
            account management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-24">
              {/* User Profile Card */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  {user.avatar}
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-1">
                  {user.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xs font-bold inline-block">
                  {user.level}
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: "📊" },
                  { id: "orders", label: "Orders", icon: "📦" },
                  { id: "wishlist", label: "Wishlist", icon: "💖" },
                  { id: "settings", label: "Settings", icon: "⚙️" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 interactive ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Quick Stats
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loyalty Points</span>
                    <span className="font-semibold text-purple-600">
                      {user.points}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-semibold text-gray-800">
                      {user.orders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wishlist Items</span>
                    <span className="font-semibold text-gray-800">
                      {user.wishlist}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
