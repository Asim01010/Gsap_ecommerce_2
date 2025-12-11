import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // Refs for animations
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const sectionRefs = useRef([]);
  const socialRefs = useRef([]);
  const linkRefs = useRef([]);
  const newsletterRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Footer sections data
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", path: "/products" },
        { name: "New Arrivals", path: "/products?filter=new" },
        { name: "Best Sellers", path: "/products?filter=bestsellers" },
        { name: "Sale Items", path: "/deals" },
        { name: "Gift Cards", path: "/gift-cards" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Electronics", path: "/categories/electronics" },
        { name: "Fashion", path: "/categories/fashion" },
        { name: "Home & Garden", path: "/categories/home" },
        { name: "Sports", path: "/categories/sports" },
        { name: "Beauty", path: "/categories/beauty" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Shipping Info", path: "/shipping" },
        { name: "Returns", path: "/returns" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "FAQs", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Affiliates", path: "/affiliates" },
        { name: "Sustainability", path: "/sustainability" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "🐦", url: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: "📷", url: "#", color: "hover:text-pink-600" },
    { name: "YouTube", icon: "📺", url: "#", color: "hover:text-red-600" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "hover:text-blue-700" },
    { name: "TikTok", icon: "🎵", url: "#", color: "hover:text-black" },
  ];

  const paymentMethods = ["💳", "📱", "🍎", "🔵", "🅰️", "💲", "📊"];

  // Add section refs
  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Add social refs
  const addToSocialRefs = (el) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };

  // Add link refs
  const addToLinkRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  useEffect(() => {
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    // Footer background animation
    masterTl.fromTo(
      footerRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Logo animation
    masterTl.fromTo(
      logoRef.current,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Newsletter animation
    masterTl.fromTo(
      newsletterRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Sections animation
    masterTl.fromTo(
      sectionRefs.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Social links animation
    masterTl.fromTo(
      socialRefs.current,
      {
        scale: 0,
        rotation: 360,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.2"
    );

    // Footer links animation
    masterTl.fromTo(
      linkRefs.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Bottom bar animation
    masterTl.fromTo(
      bottomBarRef.current,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Floating animation for social icons
    gsap.to(socialRefs.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    // Hover animations for links
    linkRefs.current.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          x: 10,
          color: "#8b5cf6",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          x: 0,
          color: "#d1d5db",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                             linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8">
            {/* Brand & Newsletter Section */}
            <div className="xl:col-span-2 space-y-8">
              {/* Logo */}
              <div
                ref={logoRef}
                className="flex items-center space-x-3 interactive group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                    ShopHub
                  </span>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Your ultimate destination for premium shopping experience.
                Discover the latest trends, exclusive deals, and top-quality
                products.
              </p>

              {/* Newsletter Subscription */}
              <div
                ref={newsletterRef}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">
                  📧 Stay Updated
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get exclusive deals and early access to new products
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-gray-400 text-xs mt-3">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div
                key={section.title}
                ref={addToSectionRefs}
                className="space-y-4"
              >
                <h4 className="text-lg font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <Link
                        ref={addToLinkRefs}
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors duration-200 interactive text-sm flex items-center space-x-2 group"
                      >
                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social & Trust Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      ref={addToSocialRefs}
                      href={social.url}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-xl hover:bg-white/20 transition-all duration-300 interactive ${social.color}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-4">
                <h4 className="text-lg font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Secure Payment
                </h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="w-12 h-8 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg hover:bg-white/20 transition-all duration-300 interactive"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="bg-gradient-to-r from-purple-900 to-pink-900 border-t border-white/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="text-gray-300 text-sm">
                © 2024 ShopHub. All rights reserved. Crafted with ❤️ for amazing
                shopping experiences.
              </div>

              {/* Additional Links */}
              <div className="flex flex-wrap gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-200 interactive"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors duration-200 interactive"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-white transition-colors duration-200 interactive"
                >
                  Cookie Policy
                </Link>
                <button className="text-gray-300 hover:text-white transition-colors duration-200 interactive flex items-center space-x-1">
                  <span>🌐</span>
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { number: "2M+", label: "Happy Customers" },
                { number: "50K+", label: "Products" },
                { number: "150+", label: "Countries" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-black text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center text-white interactive group z-40"
        >
          <span className="text-lg group-hover:-translate-y-1 transition-transform duration-200">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
