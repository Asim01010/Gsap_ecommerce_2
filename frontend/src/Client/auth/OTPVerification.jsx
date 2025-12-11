import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userReset,
  verifyUserOtp,
} from "../../features/Register/registerSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const successRef = useRef(null);
  const emailRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { user, userError, userSuccess, userMessage } = useSelector(
    (state) => state.register ?? state.auth ?? {}
  );

  const userEmail = user?.email || "your-email@example.com";

  const setInputRef = (el, i) => {
    inputRefs.current[i] = el;
  };

  // -------------------------
  // PAGE ANIMATIONS
  // -------------------------
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    tl.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.7)" },
      "-=0.3"
    );

    tl.fromTo(
      cardRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
    );

    tl.fromTo(
      emailRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    tl.fromTo(
      () => inputRefs.current.filter(Boolean),
      { y: 40, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.4)",
      },
      "-=0.3"
    );

    tl.fromTo(
      timerRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1,0.7)" }
    );

    startCountdown();

    return () => {
      gsap.killTweensOf("*");
      stopCountdown();
    };
  }, []);

  // -------------------------
  // COUNTDOWN TIMER
  // -------------------------
  const countdownRef = useRef(null);

  const startCountdown = () => {
    stopCountdown();
    setCanResend(false);
    setTimer(60);

    countdownRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
  };
  //
  const { id: userIdFromUrl } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("userInfo")); // if you save user on registration/login

  // -------------------------
  // REDUX SUCCESS / ERROR HANDLING
  // -------------------------
  useEffect(() => {
    if (userError) {
      toast.error(userMessage || "Invalid OTP");
      setIsVerifying(false);
      dispatch(userReset());
    }

    if (userSuccess) {
      toast.success(userMessage || "OTP Verified");
      setIsVerified(true);
      setIsVerifying(false);

      setTimeout(() => navigate("/home"), 1300);
      dispatch(userReset());
    }
  }, [userError, userSuccess]);

  // Success GSAP Animation
  useEffect(() => {
    if (isVerified) {
      gsap.fromTo(
        successRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isVerified]);

  // -------------------------
  // OTP INPUT HANDLERS
  // -------------------------
  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;

    const copy = [...otp];
    copy[i] = val;
    setOtp(copy);

    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (otp[i] === "" && i > 0) inputRefs.current[i - 1]?.focus();
      const copy = [...otp];
      copy[i] = "";
      setOtp(copy);
    }
    if (e.key === "ArrowLeft" && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const filled = paste.split("");
    while (filled.length < 6) filled.push("");

    setOtp(filled);

    setTimeout(() => {
      inputRefs.current[Math.min(filled.length - 1, 5)]?.focus();
    }, 50);
  };

  // -------------------------
  // VERIFY BUTTON
  // -------------------------
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter full 6-digit OTP");
      return;
    }

    // get user ID from Redux, localStorage, or URL
    const id = user?._id || storedUser?._id || userIdFromUrl;

    if (!id) {
      toast.error("User ID missing. Login again.");
      return;
    }

    setIsVerifying(true);

    dispatch(verifyUserOtp({ otp: code, id })).catch(() => {
      setIsVerifying(false);
      toast.error("Request failed");
    });
  };

  // -------------------------
  // RESEND OTP
  // -------------------------
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setIsVerified(false);
    setIsVerifying(false);

    startCountdown();

    gsap.fromTo(
      timerRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }
    );

    inputRefs.current[0]?.focus();
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 flex items-center justify-center p-4"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Confetti Elements */}
      {isVerified && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti absolute text-2xl opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: "100%",
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {["🎉", "🎊", "⭐", "✨", "🔥", "💫"][i % 6]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center space-x-3 interactive group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                  ShopHub
                </span>
                <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300"></div>
              </div>
            </div>
          </Link>

          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Verify Your Account
          </h1>
          <p className="text-gray-600 text-lg">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP Card */}
        <div
          ref={cardRef}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          {!isVerified ? (
            <>
              {/* Email Display */}
              <div
                ref={emailRef}
                className="text-center mb-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100"
              >
                <p className="text-gray-600 mb-1">Verification code sent to</p>
                <p className="text-lg font-semibold text-purple-600">
                  {userEmail}
                </p>
              </div>

              {/* OTP Inputs */}
              <div className="space-y-6">
                <div className="flex justify-center space-x-3 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => setInputRef(el, index)}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(
                          index,
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-14 h-14 text-2xl font-bold text-center bg-white border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 interactive"
                    />
                  ))}
                </div>

                {/* Timer */}
                <div ref={timerRef} className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                    <span className="text-lg">⏰</span>
                    <span className="font-semibold">
                      Code expires in: {formatTime(timer)}
                    </span>
                  </div>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  disabled={otp.join("").length !== 6 || isVerifying}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 interactive verify-button ${
                    otp.join("").length === 6 && !isVerifying
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify Account"
                  )}
                </button>

                {/* Resend Code */}
                <div className="text-center">
                  <button
                    onClick={handleResend}
                    disabled={!canResend}
                    className={`font-semibold transition-all duration-200 interactive ${
                      canResend
                        ? "text-purple-600 hover:text-purple-700 hover:scale-105"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Didn't receive code? Resend
                  </button>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <p className="font-semibold text-green-800">Security Tip</p>
                    <p className="text-sm text-green-600">
                      Never share this code with anyone. Our team will never ask
                      for your verification code.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div ref={successRef} className="text-center py-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-4xl text-white">✓</span>
              </div>

              <h2 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Verification Successful!
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Your account has been successfully verified. Welcome to ShopHub!
              </p>

              <div className="space-y-4">
                <Link
                  to="/"
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 interactive"
                >
                  Start Shopping
                </Link>

                <Link
                  to="/profile"
                  className="block w-full border-2 border-purple-600 text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 interactive"
                >
                  Go to Profile
                </Link>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🎁</span>
                  <h3 className="font-bold text-amber-800">Welcome Bonus!</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  You've earned <strong>500 loyalty points</strong> for
                  verifying your account!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        {!isVerified && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <a
                href="mailto:support@shophub.com"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Contact Support
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
