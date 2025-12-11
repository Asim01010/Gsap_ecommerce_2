import React, { useEffect, useState } from "react";

const GradientToast = ({
  message,
  type = "info",
  duration = 4000,
  onClose,
  position = "top-right",
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const getGradientStyle = () => {
    const gradients = {
      info: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)",
      warning: "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #667eea 100%)",
      error: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #fa709a 100%)",
    };
    return gradients[type] || gradients.info;
  };

  const getIcon = () => {
    const icons = {
      info: "💡",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };
    return icons[type] || icons.info;
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${
        positionClasses[position]
      } z-50 transition-all duration-300 ${
        isLeaving ? "opacity-0 scale-95 translate-y-2" : "opacity-100 scale-100"
      }`}
    >
      <div
        className="relative min-w-80 max-w-md rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: getGradientStyle(),
          boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />

        <div className="relative p-6 text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-xl filter drop-shadow-lg">{getIcon()}</span>
              {title && (
                <h3 className="font-bold text-lg drop-shadow-sm">{title}</h3>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center text-white/80 hover:text-white backdrop-blur-sm border border-white/20 hover:scale-110"
            >
              ×
            </button>
          </div>

          {/* Message */}
          <p className="text-white/90 leading-relaxed drop-shadow-sm">
            {message}
          </p>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-white/40 rounded-full transition-all duration-100 ease-linear"
              style={{
                width: isLeaving ? "100%" : "0%",
                transition: `width ${duration}ms linear`,
              }}
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-full bg-white/30 blur-sm" />
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-pink-300/20 rounded-full blur-xl" />
      </div>
    </div>
  );
};

// Toast Container to manage multiple toasts
const ToastContainer = ({ toasts, removeToast, position = "top-right" }) => {
  return (
    <div
      className={`fixed ${position.includes("top") ? "top-0" : "bottom-0"} ${
        position.includes("left")
          ? "left-0"
          : position.includes("right")
          ? "right-0"
          : "left-1/2 transform -translate-x-1/2"
      } z-50 p-4 space-y-3 w-full max-w-md`}
    >
      {toasts.map((toast) => (
        <GradientToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          title={toast.title}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Hook to use toast functionality
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    const newToast = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    info: (message, options = {}) =>
      addToast({ message, type: "info", ...options }),
    success: (message, options = {}) =>
      addToast({ message, type: "success", ...options }),
    warning: (message, options = {}) =>
      addToast({ message, type: "warning", ...options }),
    error: (message, options = {}) =>
      addToast({ message, type: "error", ...options }),
    remove: removeToast,
    clear: () => setToasts([]),
  };

  return { toasts, toast, removeToast };
};

// Usage example component
const ToastExample = () => {
  const { toasts, toast, removeToast } = useToast();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Beautiful Gradient Toasts
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() =>
              toast.info(
                "This is an information message with gradient background!",
                { title: "Info" }
              )
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Show Info Toast
          </button>

          <button
            onClick={() =>
              toast.success("Operation completed successfully!", {
                title: "Success",
              })
            }
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Show Success Toast
          </button>

          <button
            onClick={() =>
              toast.warning("Please check your input data.", {
                title: "Warning",
              })
            }
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Show Warning Toast
          </button>

          <button
            onClick={() =>
              toast.error("Something went wrong!", { title: "Error" })
            }
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Show Error Toast
          </button>
        </div>

        <button
          onClick={() => toast.clear()}
          className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Clear All Toasts
        </button>
      </div>

      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
        position="top-right"
      />
    </div>
  );
};

export default GradientToast;
export { ToastContainer, useToast, ToastExample };
