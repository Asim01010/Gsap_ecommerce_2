import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { regUser, userReset } from "../../features/Register/registerSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  // Add input ref to the array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
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

    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Form container animation
    tl.fromTo(
      formRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Input fields staggered animation
    tl.fromTo(
      inputRefs.current,
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

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.2"
    );

    // Hover animations for inputs
    inputRefs.current.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
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
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, []);

  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------
  // ------------------------------------

  // const { userError, userMessage, userSuccess } = useSelector(
  //   (state) => state.useRegister
  // );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userSuccess, userError, userMessage, userLoading } =
    useSelector((state) => state.register);
  useEffect(() => {
    if (userSuccess) {
      toast.success(userMessage);
      dispatch(userReset());
    }

    if (userSuccess) {
      // after registration
      navigate(`/otpVerify/${user._id}`);
      // Replace "/some-path" with the desired route after successful registration
    }

    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }
  }, [userSuccess, userError]);

  // const { success, error } = useToast();
  // useEffect(() => {
  //   if (userSuccess) success(userMessage);
  //   if (userError) error(userMessage);
  // }, [userSuccess, userError]);

  // State for form fields
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  });
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
    terms,
  } = formData;

  const handleRegister = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent reload
    // Here you can handle the signup logic, e.g., send data to backend
    const userData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      terms,
    };
    dispatch(regUser(userData));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Form Container */}
      <div
        ref={formRef}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

        <div className="p-8">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1
              ref={titleRef}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
            >
              {userLoading ? "Creating Account..." : "Create Account"}
            </h1>
            <p className="text-gray-600 text-lg">Join our community today</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={handleRegister}
                  ref={addToInputRefs}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white/50"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={handleRegister}
                  ref={addToInputRefs}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white/50"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                value={email}
                onChange={handleRegister}
                ref={addToInputRefs}
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white/50"
                placeholder="john@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                value={password}
                onChange={handleRegister}
                ref={addToInputRefs}
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white/50"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleRegister}
                ref={addToInputRefs}
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none bg-white/50"
                placeholder="••••••••"
              />
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleRegister}
                    ref={addToInputRefs}
                    type="radio"
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  Male
                </label>

                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    onChange={handleRegister}
                    ref={addToInputRefs}
                    type="radio"
                    name="gender"
                    checked={gender === "female"}
                    value="female"
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-3">
              <input
                name="terms"
                value={terms}
                onChange={handleRegister}
                ref={addToInputRefs}
                type="checkbox"
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              ref={buttonRef}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-4">
            <button className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md transform hover:scale-105">
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </button>
            <button className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md transform hover:scale-105">
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
            </button>
            <button className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md transform hover:scale-105">
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </div>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
