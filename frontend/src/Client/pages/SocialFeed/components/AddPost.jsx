import * as React from "react";
import { useRef, useEffect } from "react";
import Modal from "@mui/material/Modal";
import AddPostBox from "./AddPostBox";
import {
  Camera,
  Video,
  Smile,
  Image,
  User,
  Radio,
  Palette,
  Globe,
} from "lucide-react";
import gsap from "gsap";

export default function AddPost() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef([]);

  // Initialize icons ref array
  useEffect(() => {
    iconsRef.current = iconsRef.current.slice(0, 4);
  }, []);

  // GSAP animation on component mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5 } });

    if (avatarRef.current) {
      tl.fromTo(
        avatarRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, ease: "back.out(1.2)" },
        "-=0.4"
      );
    }

    // Stagger animation for icons
    if (iconsRef.current.length > 0) {
      tl.fromTo(
        iconsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );
    }
  }, []);

  // Add hover effects to text button
  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;

      const handleMouseEnter = () => {
        gsap.to(textElement, {
          scale: 1.02,
          backgroundColor: "#f8fafc",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(textElement, {
          scale: 1,
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      textElement.addEventListener("mouseenter", handleMouseEnter);
      textElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        textElement.removeEventListener("mouseenter", handleMouseEnter);
        textElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Add click animation to text button
  const handleTextClick = () => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: handleOpen,
      });
    } else {
      handleOpen();
    }
  };

  // Icon hover animation
  const setupIconHover = (iconRef, index) => {
    if (!iconRef) return;

    const handleMouseEnter = () => {
      gsap.to(iconRef, {
        scale: 1.1,
        y: -3,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
      // Animate the icon inside
      const innerIcon = iconRef.querySelector(".icon-animate");
      if (innerIcon) {
        gsap.to(innerIcon, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(iconRef, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      const innerIcon = iconRef.querySelector(".icon-animate");
      if (innerIcon) {
        gsap.to(innerIcon, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    iconRef.addEventListener("mouseenter", handleMouseEnter);
    iconRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      iconRef.removeEventListener("mouseenter", handleMouseEnter);
      iconRef.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-6 mb-6 backdrop-blur-sm bg-opacity-90"
    >
      {/* Header with Avatar */}
      <div className="flex items-center gap-4 mb-6">
        {/* Animated Avatar with glow effect */}
        <div ref={avatarRef} className="relative group">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <User className="w-7 h-7 text-white icon-animate" />
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-0 group-hover:opacity-100"></div>
          </div>
          {/* Online status indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          {/* Hover effect ring */}
          <div className="absolute inset-0 rounded-full border-3 border-transparent group-hover:border-blue-300 group-hover:animate-spin-slow transition-all duration-500"></div>
        </div>

        {/* Text Input Button with gradient */}
        <button
          ref={textRef}
          onClick={handleTextClick}
          className="flex-1 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 rounded-2xl px-6 py-4 text-left transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          <p className="text-gray-700 font-semibold text-base">
            What's on your mind, User?
          </p>
          <p className="text-gray-500 text-sm font-medium mt-1 opacity-70">
            Share your thoughts, photos, or videos
          </p>
        </button>
      </div>

      {/* Action Icons - Beautiful and defining */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200">
        {/* Live Video - Red theme */}
        <button
          ref={(el) => (iconsRef.current[0] = el)}
          onClick={handleOpen}
          className="group relative bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border-2 border-red-100 hover:border-red-300 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Radio className="w-7 h-7 text-white icon-animate" />
            </div>
            <div className="text-center">
              <span className="text-red-700 font-bold text-sm block">
                Live Video
              </span>
              <span className="text-red-500 text-xs font-medium opacity-80 mt-1 block">
                Go live now
              </span>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-400/0 to-pink-400/0 group-hover:from-red-400/10 group-hover:to-pink-400/10 transition-all duration-300"></div>
        </button>

        {/* Photo/Video - Green theme */}
        <button
          ref={(el) => (iconsRef.current[1] = el)}
          onClick={handleOpen}
          className="group relative bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-100 hover:border-green-300 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Image className="w-7 h-7 text-white icon-animate" />
            </div>
            <div className="text-center">
              <span className="text-green-700 font-bold text-sm block">
                Photo/Video
              </span>
              <span className="text-green-500 text-xs font-medium opacity-80 mt-1 block">
                Share memories
              </span>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 transition-all duration-300"></div>
        </button>

        {/* Feeling/Activity - Yellow theme */}
        <button
          ref={(el) => (iconsRef.current[2] = el)}
          onClick={handleOpen}
          className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border-2 border-yellow-100 hover:border-yellow-300 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Smile className="w-7 h-7 text-white icon-animate" />
            </div>
            <div className="text-center">
              <span className="text-yellow-700 font-bold text-sm block">
                Feeling/Activity
              </span>
              <span className="text-yellow-500 text-xs font-medium opacity-80 mt-1 block">
                Express yourself
              </span>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/10 group-hover:to-orange-400/10 transition-all duration-300"></div>
        </button>

        {/* Camera - Blue theme */}
        <button
          ref={(el) => (iconsRef.current[3] = el)}
          onClick={handleOpen}
          className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-2 border-blue-100 hover:border-blue-300 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Camera className="w-7 h-7 text-white icon-animate" />
            </div>
            <div className="text-center">
              <span className="text-blue-700 font-bold text-sm block">
                Camera
              </span>
              <span className="text-blue-500 text-xs font-medium opacity-80 mt-1 block">
                Take a photo
              </span>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all duration-300"></div>
        </button>
      </div>

      {/* Add custom animations to tailwind config */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: "800px",
            outline: "none",
            border: "none",
          }}
        >
          <AddPostBox handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}
