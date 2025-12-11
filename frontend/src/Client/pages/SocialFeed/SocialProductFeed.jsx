import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddPost from "./components/AddPost";
gsap.registerPlugin(ScrollTrigger);

const SocialProductFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    image: "",
    description: "",
    price: "",
    productName: "",
  });
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle this to see different views

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const createPostRef = useRef(null);
  const postRefs = useRef([]);
  const commentRefs = useRef([]);

  // Sample initial posts
  const samplePosts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "👩‍💼",
        role: "Admin",
        verified: true,
      },
      product: {
        name: "iPhone 15 Pro",
        price: "$999.99",
        image: "📱",
        category: "Electronics",
      },
      description:
        "Just launched! The new iPhone 15 Pro with titanium design and revolutionary camera system. What do you think?",
      timestamp: "2 hours ago",
      likes: 124,
      shares: 45,
      comments: 23,
      isLiked: false,
      isShared: false,
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "👨‍💻",
        role: "Admin",
        verified: true,
      },
      product: {
        name: 'MacBook Pro 16"',
        price: "$2,399.99",
        image: "💻",
        category: "Electronics",
      },
      description:
        "Our most powerful MacBook Pro yet! Featuring the M2 Pro chip and stunning Liquid Retina XDR display.",
      timestamp: "5 hours ago",
      likes: 89,
      shares: 32,
      comments: 18,
      isLiked: true,
      isShared: false,
    },
    {
      id: 3,
      user: {
        name: "Emily Davis",
        avatar: "👩‍🎨",
        role: "Admin",
        verified: true,
      },
      product: {
        name: "Designer Leather Jacket",
        price: "$299.99",
        image: "🧥",
        category: "Fashion",
      },
      description:
        "New collection just dropped! Premium leather jacket with modern design. Perfect for the upcoming season!",
      timestamp: "1 day ago",
      likes: 267,
      shares: 78,
      comments: 45,
      isLiked: false,
      isShared: true,
    },
  ];

  const sampleComments = {
    1: [
      {
        id: 1,
        user: { name: "Alex Thompson", avatar: "👨‍🚀" },
        text: "The camera quality looks amazing! Can't wait to get my hands on one.",
        timestamp: "1 hour ago",
        likes: 12,
      },
      {
        id: 2,
        user: { name: "Lisa Park", avatar: "👩‍🔬" },
        text: "Is the titanium build as premium as it looks?",
        timestamp: "45 minutes ago",
        likes: 8,
      },
    ],
    2: [
      {
        id: 1,
        user: { name: "Tech Enthusiast", avatar: "🤖" },
        text: "The performance benchmarks are insane!",
        timestamp: "3 hours ago",
        likes: 15,
      },
    ],
    3: [
      {
        id: 1,
        user: { name: "Fashion Lover", avatar: "👗" },
        text: "Love the design! What colors are available?",
        timestamp: "12 hours ago",
        likes: 23,
      },
    ],
  };

  // Add post refs
  const addToPostRefs = (el) => {
    if (el && !postRefs.current.includes(el)) {
      postRefs.current.push(el);
    }
  };

  // Add comment refs
  const addToCommentRefs = (el) => {
    if (el && !commentRefs.current.includes(el)) {
      commentRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setPosts(samplePosts);
      setComments(sampleComments);
      setLoading(false);
    }, 1500);
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

    // Create post animation (only for admin)
    if (isAdmin) {
      masterTl.fromTo(
        createPostRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    // Posts staggered animation
    masterTl.fromTo(
      postRefs.current,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Comments animation (when expanded)
    commentRefs.current.forEach((comment, index) => {
      gsap.fromTo(
        comment,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
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

    // Like button animations
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        gsap.to(this, {
          scale: 1.3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "elastic.out(1, 0.8)",
        });
      });
    });
  }, [loading, isAdmin]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.productName || !newPost.description) return;

    const post = {
      id: posts.length + 1,
      user: {
        name: "You",
        avatar: "👑",
        role: "Admin",
        verified: true,
      },
      product: {
        name: newPost.productName,
        price: newPost.price || "$0.00",
        image: newPost.image || "📦",
        category: "New Product",
      },
      description: newPost.description,
      timestamp: "Just now",
      likes: 0,
      shares: 0,
      comments: 0,
      isLiked: false,
      isShared: false,
    };

    setPosts([post, ...posts]);
    setNewPost({ image: "", description: "", price: "", productName: "" });

    // Success animation
    gsap.fromTo(
      postRefs.current[0],
      { scale: 0.5, opacity: 0, rotationY: 180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: "back.out(1.7)" }
    );
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const wasLiked = post.isLiked;
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !wasLiked,
          };
        }
        return post;
      })
    );
  };

  const handleShare = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const wasShared = post.isShared;
          return {
            ...post,
            shares: wasShared ? post.shares - 1 : post.shares + 1,
            isShared: !wasShared,
          };
        }
        return post;
      })
    );

    // Share animation
    gsap.to(".share-notification", {
      y: -20,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(".share-notification", {
            y: 0,
            opacity: 0,
            duration: 0.5,
          });
        }, 2000);
      },
    });
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: { name: "You", avatar: "👤" },
      text: commentText,
      timestamp: "Just now",
      likes: 0,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    // Update post comment count
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: post.comments + 1 };
        }
        return post;
      })
    );

    // Comment animation
    const commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection) {
      const newCommentElement = commentSection.lastElementChild;
      gsap.fromTo(
        newCommentElement,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  };

  const CreatePostForm = () => (
    <div
      ref={createPostRef}
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 mb-8"
    >
      <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Create Product Post
      </h3>
      <form onSubmit={handleCreatePost} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={newPost.productName}
              onChange={(e) =>
                setNewPost({ ...newPost, productName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              value={newPost.price}
              onChange={(e) =>
                setNewPost({ ...newPost, price: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="$0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Image (Emoji)
          </label>
          <input
            type="text"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
            placeholder="📱 (emoji)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            rows="3"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 resize-none"
            placeholder="Share something about this product..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 interactive"
          >
            Post Product
          </button>
        </div>
      </form>
    </div>
  );

  const Post = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      handleAddComment(post.id, commentText);
      setCommentText("");
    };

    return (
      <div
        ref={addToPostRefs}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 interactive group mb-8"
      >
        {/* Post Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl">
              {post.user.avatar}
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-800">{post.user.name}</h4>
                {post.user.verified && (
                  <span className="text-blue-500" title="Verified">
                    ✓
                  </span>
                )}
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                  {post.user.role}
                </span>
              </div>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          <p className="text-gray-800 mb-4 text-lg">{post.description}</p>

          {/* Product Card */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-4 interactive">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center text-2xl">
                {post.product.image}
              </div>
              <div className="flex-grow">
                <h5 className="font-bold text-gray-800 text-lg">
                  {post.product.name}
                </h5>
                <p className="text-purple-600 font-semibold">
                  {post.product.price}
                </p>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {post.product.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="px-6 py-3 border-t border-b border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-200 interactive like-button ${
              post.isLiked
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-xl">{post.isLiked ? "❤️" : "🤍"}</span>
            <span className="font-semibold">Like</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center justify-center space-x-2 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 interactive"
          >
            <span className="text-xl">💬</span>
            <span className="font-semibold">Comment</span>
          </button>

          <button
            onClick={() => handleShare(post.id)}
            className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-200 interactive ${
              post.isShared
                ? "bg-green-50 text-green-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-xl">🔄</span>
            <span className="font-semibold">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200 p-6">
            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  👤
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                    placeholder="Write a comment..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 interactive"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div id={`comments-${post.id}`} className="space-y-4">
              {(comments[post.id] || []).map((comment, index) => (
                <div
                  key={comment.id}
                  ref={addToCommentRefs}
                  className="flex space-x-3 interactive group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {comment.user.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-800">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 px-2">
                      <button className="text-sm text-gray-500 hover:text-gray-700 interactive">
                        Like ({comment.likes})
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700 interactive">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loading Feed...
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

      {/* Share Notification */}
      <div className="share-notification fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-2xl z-50 opacity-0">
        ✅ Post shared successfully!
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Product Feed
          </h1>
          <p className="text-xl text-gray-600">
            Discover new products and share your thoughts with the community
          </p>
        </div>

        {/* Admin Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20">
            <AddPost />
          </div>
        </div>

        {/* Create Post Form (Admin Only) */}
        {isAdmin && <CreatePostForm />}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">💬</div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              No Posts Yet
            </h3>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              {isAdmin
                ? "Be the first to share a product with the community!"
                : "No products have been shared yet. Check back soon!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialProductFeed;
