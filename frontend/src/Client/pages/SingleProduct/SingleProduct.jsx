import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SingleProduct = () => {
  const [selectedColor, setSelectedColor] = useState("space-gray");
  const [selectedSize, setSelectedSize] = useState("256GB");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Refs for animations
  const productRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const featuresRef = useRef([]);
  const ctaRef = useRef(null);
  const galleryRefs = useRef([]);
  const reviewRefs = useRef([]);

  const product = {
    id: 1,
    name: "iPhone 15 Pro Max",
    description:
      "The ultimate iPhone experience with Titanium design, A17 Pro chip, and revolutionary camera system.",
    price: "$1199.99",
    originalPrice: "$1299.99",
    discount: "8% off",
    rating: 4.9,
    reviewCount: 1247,
    inStock: true,
    features: [
      "6.7-inch Super Retina XDR display",
      "Titanium design with textured matte glass back",
      "A17 Pro chip with 6-core CPU",
      "Pro camera system with 48MP Main camera",
      "5G capable with eSIM support",
      "Face ID for secure authentication",
    ],
    colors: [
      { name: "space-gray", value: "bg-gray-800", label: "Space Gray" },
      { name: "silver", value: "bg-gray-300", label: "Silver" },
      { name: "gold", value: "bg-amber-200", label: "Gold" },
      { name: "blue", value: "bg-blue-500", label: "Blue Titanium" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    images: ["📱", "📸", "🎥", "⚡"],
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely love this phone! The titanium build feels premium and the camera quality is mind-blowing.",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great upgrade from my previous model. Battery life could be better but overall excellent device.",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "3 days ago",
      comment:
        "The display is incredible and the performance is buttery smooth. Worth every penny!",
      verified: true,
    },
  ];

  // Add feature refs
  const addToFeatureRefs = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  // Add gallery refs
  const addToGalleryRefs = (el) => {
    if (el && !galleryRefs.current.includes(el)) {
      galleryRefs.current.push(el);
    }
  };

  // Add review refs
  const addToReviewRefs = (el) => {
    if (el && !reviewRefs.current.includes(el)) {
      reviewRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Master timeline
    const masterTl = gsap.timeline();

    // Product container animation
    masterTl.fromTo(
      productRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Image animation with 3D effect
    masterTl.fromTo(
      imageRef.current,
      {
        rotationY: -30,
        opacity: 0,
        scale: 0.8,
      },
      {
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Details section animation
    masterTl.fromTo(
      detailsRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Title animation
    masterTl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0, rotationX: 45 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Price animation
    masterTl.fromTo(
      priceRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.8)" },
      "-=0.2"
    );

    // Features staggered animation
    masterTl.fromTo(
      featuresRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Gallery images animation
    galleryRefs.current.forEach((galleryItem, index) => {
      gsap.fromTo(
        galleryItem,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: galleryItem,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Reviews animation
    reviewRefs.current.forEach((review, index) => {
      gsap.fromTo(
        review,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: review,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // CTA button animation
    masterTl.fromTo(
      ctaRef.current,
      { y: 100, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.3"
    );

    // Hover animations for interactive elements
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

    // Color selection animations
    const colorButtons = document.querySelectorAll(".color-option");
    colorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Animate all color buttons
        gsap.to(colorButtons, {
          scale: 0.9,
          duration: 0.2,
          ease: "power2.out",
        });

        // Animate selected button
        gsap.to(button, {
          scale: 1.1,
          duration: 0.3,
          ease: "elastic.out(1, 0.8)",
        });
      });
    });
  }, []);

  const handleAddToCart = () => {
    // Add to cart animation
    gsap.to(ctaRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const heart = document.querySelector(".wishlist-heart");

    if (!isWishlisted) {
      gsap.to(heart, {
        scale: 1.5,
        color: "#ec4899",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.8)",
      });
    }
  };

  const handleImageChange = (index) => {
    setActiveImage(index);

    // Image transition animation
    gsap.to(imageRef.current, {
      scale: 0.9,
      opacity: 0.5,
      duration: 0.2,
      onComplete: () => {
        gsap.to(imageRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Container */}
        <div
          ref={productRef}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Product Images Section */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative">
                <div
                  ref={imageRef}
                  className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group cursor-pointer interactive"
                >
                  <span className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                    {product.images[activeImage]}
                  </span>

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                      {product.discount}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center interactive wishlist-heart"
                  >
                    <span
                      className={`text-2xl ${
                        isWishlisted ? "text-pink-500" : "text-gray-400"
                      }`}
                    >
                      {isWishlisted ? "💖" : "🤍"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    ref={addToGalleryRefs}
                    className={`h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center cursor-pointer interactive transform transition-all duration-300 ${
                      activeImage === index
                        ? "ring-4 ring-purple-500 scale-105"
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <span className="text-2xl">{image}</span>
                  </div>
                ))}
              </div>

              {/* Product Features Preview */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-white/50 rounded-xl interactive"
                  >
                    <span className="text-green-500 text-lg">✓</span>
                    <span className="text-sm text-gray-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div ref={detailsRef} className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1
                  ref={titleRef}
                  className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
                >
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div ref={priceRef} className="flex items-center space-x-4">
                <span className="text-4xl font-black text-gray-800">
                  {product.price}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  {product.originalPrice}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full">
                  Save $
                  {(
                    parseFloat(product.originalPrice.replace("$", "")) -
                    parseFloat(product.price.replace("$", ""))
                  ).toFixed(2)}
                </span>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Color:{" "}
                  {product.colors.find((c) => c.name === selectedColor)?.label}
                </h3>
                <div className="flex space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-option w-12 h-12 ${
                        color.value
                      } rounded-full border-4 interactive transform transition-all duration-300 ${
                        selectedColor === color.name
                          ? "border-purple-500 scale-110 ring-4 ring-purple-200"
                          : "border-gray-300 hover:scale-110"
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Storage</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.storage.map((size) => (
                    <button
                      key={size}
                      className={`py-3 px-6 rounded-xl border-2 font-semibold interactive transform transition-all duration-300 ${
                        selectedSize === size
                          ? "border-purple-500 bg-purple-50 text-purple-700 scale-105"
                          : "border-gray-300 text-gray-700 hover:border-purple-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center interactive font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center interactive font-bold text-xl"
                  >
                    +
                  </button>
                  <span className="text-gray-500 ml-4">
                    {product.inStock ? "✓ In stock" : "✗ Out of stock"}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-800">
                  Key Features
                </h3>
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    ref={addToFeatureRefs}
                    className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl interactive"
                  >
                    <span className="text-purple-500 text-lg">⚡</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex space-x-4 pt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive"
                >
                  🛒 Add to Cart - {product.price}
                </button>
                <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 interactive">
                  💳 Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4 pt-6 text-center">
                <div className="p-4 bg-white/50 rounded-xl interactive">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-semibold text-gray-800">
                    Free Shipping
                  </div>
                  <div className="text-sm text-gray-600">2-3 days delivery</div>
                </div>
                <div className="p-4 bg-white/50 rounded-xl interactive">
                  <div className="text-2xl mb-2">↩️</div>
                  <div className="font-semibold text-gray-800">
                    30-Day Return
                  </div>
                  <div className="text-sm text-gray-600">
                    Money back guarantee
                  </div>
                </div>
                <div className="p-4 bg-white/50 rounded-xl interactive">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="font-semibold text-gray-800">
                    2-Year Warranty
                  </div>
                  <div className="text-sm text-gray-600">Full protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                ref={addToReviewRefs}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg interactive"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {review.name}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{review.comment}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{review.date}</span>
                  {review.verified && (
                    <span className="text-green-600 font-semibold">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 interactive">
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
