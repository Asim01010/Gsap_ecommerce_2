import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Refs for animations
  const chatButtonRef = useRef(null);
  const chatWindowRef = useRef(null);
  const messageContainerRef = useRef(null);
  const messageRefs = useRef([]);

  // Sample initial messages
  const initialMessages = [
    {
      id: 1,
      text: "Hi there! 👋 Welcome to our store. How can I help you today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      text: "I'm interested in the new iPhone 15 Pro. Do you have it in stock?",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: 3,
      text: "Yes! We have the iPhone 15 Pro in all colors and storage options. Would you like me to show you the available variants?",
      sender: "bot",
      timestamp: new Date(Date.now() - 180000),
    },
  ];

  // Add message refs
  const addToMessageRefs = (el) => {
    if (el && !messageRefs.current.includes(el)) {
      messageRefs.current.push(el);
    }
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Chat window opening animation
      const tl = gsap.timeline();

      tl.fromTo(
        chatWindowRef.current,
        {
          scale: 0,
          opacity: 0,
          rotationY: 90,
          x: 100,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Animate existing messages
      tl.fromTo(
        messageRefs.current,
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

      // Auto-scroll to bottom
      scrollToBottom();
    } else {
      // Chat window closing animation
      gsap.to(chatWindowRef.current, {
        scale: 0,
        opacity: 0,
        rotationY: -90,
        x: 100,
        y: 100,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // Animate new messages
    if (messageRefs.current.length > 0) {
      const lastMessage = messageRefs.current[messageRefs.current.length - 1];
      gsap.fromTo(
        lastMessage,
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );

      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);

    // Button animation
    gsap.to(chatButtonRef.current, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "elastic.out(1, 0.8)",
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand! Let me check that for you.",
        "Great question! Here's what I can tell you...",
        "Thanks for asking! We have several options available.",
        "I'd be happy to help with that!",
        "Let me get that information for you right away.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {/* Chat Button */}
      <div
        ref={chatButtonRef}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 interactive group"
      >
        <div className="relative">
          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-ping">
            3
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            3
          </div>

          {/* Chat Button */}
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-2xl text-white">{isOpen ? "✕" : "💬"}</span>
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-24 right-6 w-96 h-[600px] z-50"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Customer Support</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white/80">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-200 interactive"
                >
                  <span className="text-lg">−</span>
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={messageContainerRef}
              className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100"
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    ref={addToMessageRefs}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 interactive ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                          : "bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-none shadow-lg"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl rounded-bl-none shadow-lg p-4 interactive">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Responses */}
            <div className="p-4 border-t border-gray-200 bg-white/80">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "What's in stock?",
                  "Shipping info",
                  "Return policy",
                  "Track my order",
                ].map((quickText, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(quickText)}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-colors duration-200 interactive"
                  >
                    {quickText}
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none interactive"
                >
                  <span className="text-lg">↑</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
