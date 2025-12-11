import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999.99,
      originalPrice: 1099.99,
      image: "📱",
      category: "Electronics",
      quantity: 1,
      inStock: true,
      delivery: "Free Delivery",
      color: "Space Gray",
      storage: "256GB",
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      price: 2399.99,
      originalPrice: 2599.99,
      image: "💻",
      category: "Electronics",
      quantity: 1,
      inStock: true,
      delivery: "Free Delivery",
      color: "Silver",
      storage: "1TB",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 399.99,
      originalPrice: 449.99,
      image: "🎧",
      category: "Electronics",
      quantity: 2,
      inStock: true,
      delivery: "Free Delivery",
      color: "Black",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // cart, shipping, payment, confirmation

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cartItemsRef = useRef([]);
  const summaryRef = useRef(null);
  const emptyCartRef = useRef(null);
  const progressRef = useRef(null);
  const stepRefs = useRef([]);

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 29.99) : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  // Add cart item refs
  const addToCartItemRefs = (el) => {
    if (el && !cartItemsRef.current.includes(el)) {
      cartItemsRef.current.push(el);
    }
  };

  // Add step refs
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useEffect(() => {
    const masterTl = gsap.timeline();

    if (cartItems.length === 0) {
      // Empty cart animation
      masterTl.fromTo(
        emptyCartRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        }
      );
    } else {
      // Header animation
      masterTl.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Progress bar animation
      masterTl.fromTo(
        progressRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Cart items staggered animation
      masterTl.fromTo(
        cartItemsRef.current,
        { x: -100, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Summary animation
      masterTl.fromTo(
        summaryRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      // Step indicators animation
      masterTl.fromTo(
        stepRefs.current,
        { y: 50, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.3"
      );
    }

    // Hover animations for cart items
    cartItemsRef.current.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          y: -5,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, [cartItems.length, checkoutStep]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // Quantity update animation
    const itemElement = cartItemsRef.current.find(
      (_, index) => cartItems[index]?.id === id
    );

    if (itemElement) {
      gsap.to(itemElement, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const removeItem = (id) => {
    const itemElement = cartItemsRef.current.find(
      (_, index) => cartItems[index]?.id === id
    );

    if (itemElement) {
      gsap.to(itemElement, {
        x: 300,
        opacity: 0,
        scale: 0.5,
        rotation: 30,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        },
      });
    } else {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim() && !isPromoApplied) {
      setIsPromoApplied(true);

      // Promo code success animation
      gsap.to(".promo-success", {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.8)",
      });
    }
  };

  const proceedToCheckout = () => {
    setCheckoutStep("shipping");

    // Checkout transition animation
    gsap.to(".checkout-transition", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => {
        gsap.fromTo(
          ".checkout-transition",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      },
    });
  };

  const renderCheckoutStep = () => {
    switch (checkoutStep) {
      case "shipping":
        return <ShippingSection onNext={() => setCheckoutStep("payment")} />;
      case "payment":
        return (
          <PaymentSection onNext={() => setCheckoutStep("confirmation")} />
        );
      case "confirmation":
        return <ConfirmationSection />;
      default:
        return renderCartItems();
    }
  };

  const renderCartItems = () => (
    <div className="space-y-6 checkout-transition">
      {cartItems.map((item, index) => (
        <div
          key={item.id}
          ref={addToCartItemRefs}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                <span className="text-3xl">{item.image}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    {item.color && (
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        Color: {item.color}
                      </span>
                    )}
                    {item.storage && (
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        Storage: {item.storage}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-semibold ${
                        item.inStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      {item.delivery}
                    </span>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-800">
                      ${item.price}
                    </div>
                    {item.originalPrice && (
                      <div className="text-lg text-gray-400 line-through">
                        ${item.originalPrice}
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center interactive font-bold text-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center interactive font-bold text-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="flex-shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center interactive hover:bg-red-100 transition-colors duration-200 group/remove"
            >
              <span className="text-xl group-hover/remove:scale-110 transition-transform duration-200">
                🗑️
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ShippingSection = ({ onNext }) => (
    <div className="checkout-transition">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Shipping Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="123 Main St"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="10001"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Shipping Method
          </h4>
          <div className="space-y-3">
            {[
              {
                method: "Standard Shipping",
                price: "Free",
                time: "5-7 business days",
              },
              {
                method: "Express Shipping",
                price: "$9.99",
                time: "2-3 business days",
              },
              {
                method: "Next Day Delivery",
                price: "$19.99",
                time: "1 business day",
              },
            ].map((option, index) => (
              <label
                key={index}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="shipping"
                    className="w-4 h-4 text-purple-600"
                    defaultChecked={index === 0}
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {option.method}
                    </div>
                    <div className="text-sm text-gray-600">{option.time}</div>
                  </div>
                </div>
                <div className="font-bold text-gray-800">{option.price}</div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const PaymentSection = ({ onNext }) => (
    <div className="checkout-transition">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Payment Method
        </h3>

        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { method: "Credit Card", icon: "💳", popular: true },
              { method: "PayPal", icon: "🔵" },
              { method: "Apple Pay", icon: "🍎" },
              { method: "Google Pay", icon: "🔴" },
            ].map((payment, index) => (
              <label
                key={index}
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all duration-200 interactive"
              >
                <input
                  type="radio"
                  name="payment"
                  className="w-4 h-4 text-purple-600"
                  defaultChecked={index === 0}
                />
                <div className="flex items-center space-x-3 ml-3">
                  <span className="text-2xl">{payment.icon}</span>
                  <span className="font-semibold text-gray-800">
                    {payment.method}
                  </span>
                  {payment.popular && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Credit Card Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  placeholder="123"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center space-x-6 py-4">
            <div className="text-center">
              <div className="text-2xl">🔒</div>
              <div className="text-xs text-gray-600 mt-1">
                256-bit SSL Secure
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🛡️</div>
              <div className="text-xs text-gray-600 mt-1">PCI Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">💰</div>
              <div className="text-xs text-gray-600 mt-1">
                Money Back Guarantee
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive"
        >
          Complete Order - ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );

  const ConfirmationSection = () => (
    <div className="checkout-transition text-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/20">
        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-white">✓</span>
        </div>

        <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Order Confirmed!
        </h3>

        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="text-sm text-gray-600 mb-2">Order Number</div>
          <div className="text-2xl font-black text-gray-800">
            #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive">
            Track Your Order
          </button>
          <Link to="/all-products">
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 interactive">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

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
            {checkoutStep === "cart"
              ? "Your Cart"
              : checkoutStep === "shipping"
              ? "Shipping"
              : checkoutStep === "payment"
              ? "Payment"
              : "Order Confirmed"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {checkoutStep === "cart" &&
              "Review your items and proceed to checkout"}
            {checkoutStep === "shipping" && "Enter your shipping information"}
            {checkoutStep === "payment" && "Complete your payment details"}
            {checkoutStep === "confirmation" &&
              "Your order has been successfully placed!"}
          </p>
        </div>

        {/* Progress Bar */}
        {checkoutStep !== "confirmation" && (
          <div ref={progressRef} className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-4">
              {[
                { step: "cart", label: "Cart", number: "1" },
                { step: "shipping", label: "Shipping", number: "2" },
                { step: "payment", label: "Payment", number: "3" },
              ].map((stepInfo, index) => (
                <div
                  key={stepInfo.step}
                  ref={addToStepRefs}
                  className={`flex flex-col items-center interactive ${
                    (checkoutStep === "cart" && index === 0) ||
                    (checkoutStep === "shipping" && index <= 1) ||
                    (checkoutStep === "payment" && index <= 2)
                      ? "text-purple-600 scale-110"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300 ${
                      (checkoutStep === "cart" && index === 0) ||
                      (checkoutStep === "shipping" && index <= 1) ||
                      (checkoutStep === "payment" && index <= 2)
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stepInfo.number}
                  </div>
                  <span className="font-semibold">{stepInfo.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    checkoutStep === "cart"
                      ? "33%"
                      : checkoutStep === "shipping"
                      ? "66%"
                      : "100%",
                }}
              ></div>
            </div>
          </div>
        )}

        {cartItems.length === 0 && checkoutStep === "cart" ? (
          // Empty Cart State
          <div ref={emptyCartRef} className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">{renderCheckoutStep()}</div>

            {/* Order Summary - Only show in cart and shipping steps */}
            {(checkoutStep === "cart" || checkoutStep === "shipping") && (
              <div ref={summaryRef} className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-24">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Subtotal (
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 promo-success">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-black text-gray-800">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  {checkoutStep === "cart" && (
                    <div className="mb-6">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code"
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                          disabled={isPromoApplied}
                        />
                        <button
                          onClick={applyPromoCode}
                          disabled={isPromoApplied}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 interactive ${
                            isPromoApplied
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}
                        >
                          {isPromoApplied ? "Applied" : "Apply"}
                        </button>
                      </div>
                      {isPromoApplied && (
                        <div className="text-green-600 text-sm mt-2 promo-success">
                          🎉 10% discount applied successfully!
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checkout Button */}
                  {checkoutStep === "cart" && (
                    <button
                      onClick={proceedToCheckout}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive"
                    >
                      Proceed to Checkout
                    </button>
                  )}

                  {/* Security Badge */}
                  <div className="text-center mt-6">
                    <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                      <span>🔒</span>
                      <span>Secure Checkout • 256-bit SSL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
