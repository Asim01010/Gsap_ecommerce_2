import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);
  const socialButtonsRef = useRef([]);

  // Add input ref to the array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  // Add social button ref
  const addToSocialRefs = (el) => {
    if (el && !socialButtonsRef.current.includes(el)) {
      socialButtonsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Initial animation sequence
    const tl = gsap.timeline();

    // Background animation
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Title animation with floating effect
    tl.fromTo(
      titleRef.current,
      {
        y: -50,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Form container animation
    tl.fromTo(
      formRef.current,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: 10,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Input fields staggered animation
    tl.fromTo(
      inputRefs.current,
      {
        x: -80,
        opacity: 0,
        skewX: 5,
      },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Remember me and forgot password animation
    const extraElements = document.querySelectorAll(".extra-element");
    tl.fromTo(
      extraElements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Button animation
    tl.fromTo(
      buttonRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.2"
    );

    // Social buttons staggered animation
    tl.fromTo(
      socialButtonsRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Hover animations for inputs
    inputRefs.current.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Button hover animation
    const button = buttonRef.current;
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Social buttons hover animations
    socialButtonsRef.current.forEach((socialBtn, index) => {
      socialBtn.addEventListener("mouseenter", () => {
        gsap.to(socialBtn, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      socialBtn.addEventListener("mouseleave", () => {
        gsap.to(socialBtn, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Continuous floating animation for background elements
    const floatingAnimation = gsap.to(backgroundRef.current.children, {
      y: "+=20",
      rotation: "+=1",
      duration: 4,
      stagger: 0.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      floatingAnimation.kill();
    };
  }, []);

  // here westart the function
  // here westart the function
  // here westart the function
  // here westart the function
  // here westart the function
  // here westart the function

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Form Container */}
      <div
        ref={formRef}
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
      >
        {/* Enhanced Decorative Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transform origin-left"></div>

        <div className="p-8">
          {/* Enhanced Title Section */}
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <h1
                ref={titleRef}
                className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3 relative z-10"
              >
                Welcome Back
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-30 transform scale-110"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <LoginForm addToInputRefs={addToInputRefs} buttonRef={buttonRef} />

          {/* Enhanced Divider */}
          <div className="my-8 flex items-center extra-element">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm font-medium bg-white/50 backdrop-blur-sm rounded-full py-1">
              or continue with
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Enhanced Social Login */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "github", color: "text-gray-800", bg: "bg-gray-800" },
              { icon: "twitter", color: "text-blue-400", bg: "bg-blue-400" },
              { icon: "facebook", color: "text-blue-600", bg: "bg-blue-600" },
            ].map((social) => (
              <button
                key={social.icon}
                ref={addToSocialRefs}
                className="p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm group"
              >
                <div className="flex justify-center">
                  <div
                    className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {social.icon === "github" && (
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {social.icon === "twitter" && (
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    )}
                    {social.icon === "facebook" && (
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Enhanced Register Link */}
          <div className="text-center mt-8 extra-element">
            <p className="text-gray-600 font-medium">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-bold transition-all duration-300 hover:underline underline-offset-4"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
