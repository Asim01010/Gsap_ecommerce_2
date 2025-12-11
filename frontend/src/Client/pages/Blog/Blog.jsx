import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const blogGridRef = useRef(null);
  const blogRefs = useRef([]);
  const categoryRefs = useRef([]);
  const sidebarRef = useRef(null);
  const loadMoreRef = useRef(null);
  const searchRef = useRef(null);

  const categories = [
    { id: "all", name: "All Articles", count: 48, icon: "📚" },
    { id: "technology", name: "Technology", count: 15, icon: "💻" },
    { id: "design", name: "Design", count: 12, icon: "🎨" },
    { id: "business", name: "Business", count: 8, icon: "💼" },
    { id: "lifestyle", name: "Lifestyle", count: 7, icon: "🌟" },
    { id: "tutorials", name: "Tutorials", count: 6, icon: "📖" },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      reads: "12.4K",
      image: "🤖",
    },
    { id: 2, title: "Mastering Tailwind CSS", reads: "8.7K", image: "🎨" },
    {
      id: 3,
      title: "React 18 Features You Need to Know",
      reads: "15.2K",
      image: "⚛️",
    },
    {
      id: 4,
      title: "Building Scalable Applications",
      reads: "6.3K",
      image: "🏗️",
    },
  ];

  const tags = [
    "React",
    "Tailwind",
    "JavaScript",
    "UI/UX",
    "Animation",
    "GSAP",
    "Web Development",
    "Design System",
    "Responsive",
    "Performance",
  ];

  // Generate mock blog data
  useEffect(() => {
    const generateBlogs = () => {
      const mockBlogs = [
        {
          id: 1,
          title: "The Future of Web Development: What to Expect in 2024",
          excerpt:
            "Explore the latest trends and technologies shaping the future of web development. From AI integration to new frameworks, discover what's coming next.",
          content: "Full content about web development trends...",
          author: "Sarah Chen",
          authorAvatar: "👩‍💻",
          date: "2 hours ago",
          readTime: "8 min read",
          category: "technology",
          image: "🚀",
          featured: true,
          likes: 234,
          comments: 45,
          tags: ["Web Development", "Trends", "2024"],
        },
        {
          id: 2,
          title: "Mastering GSAP: Advanced Animation Techniques",
          excerpt:
            "Take your animations to the next level with these advanced GSAP techniques. Learn about scroll triggers, timelines, and performance optimization.",
          content: "Full content about GSAP animations...",
          author: "Mike Rodriguez",
          authorAvatar: "👨‍💻",
          date: "5 hours ago",
          readTime: "12 min read",
          category: "tutorials",
          image: "🎬",
          featured: true,
          likes: 189,
          comments: 32,
          tags: ["GSAP", "Animation", "JavaScript"],
        },
        {
          id: 3,
          title: "Building Beautiful UIs with Tailwind CSS",
          excerpt:
            "Learn how to create stunning user interfaces using Tailwind CSS. Discover best practices, components, and design patterns.",
          content: "Full content about Tailwind CSS...",
          author: "Emily Davis",
          authorAvatar: "👩‍🎨",
          date: "1 day ago",
          readTime: "6 min read",
          category: "design",
          image: "💅",
          featured: false,
          likes: 156,
          comments: 28,
          tags: ["Tailwind", "CSS", "Design"],
        },
        {
          id: 4,
          title: "React Performance Optimization Guide",
          excerpt:
            "Optimize your React applications for maximum performance. Learn about memoization, code splitting, and bundle optimization.",
          content: "Full content about React performance...",
          author: "Alex Thompson",
          authorAvatar: "👨‍🚀",
          date: "1 day ago",
          readTime: "10 min read",
          category: "technology",
          image: "⚡",
          featured: false,
          likes: 278,
          comments: 41,
          tags: ["React", "Performance", "JavaScript"],
        },
        {
          id: 5,
          title: "The Psychology of Great UX Design",
          excerpt:
            "Understand the psychological principles behind effective user experience design and how to apply them to your projects.",
          content: "Full content about UX psychology...",
          author: "Dr. Lisa Park",
          authorAvatar: "👩‍🔬",
          date: "2 days ago",
          readTime: "7 min read",
          category: "design",
          image: "🧠",
          featured: false,
          likes: 198,
          comments: 23,
          tags: ["UX", "Psychology", "Design"],
        },
        {
          id: 6,
          title: "Starting Your Own Tech Business in 2024",
          excerpt:
            "A comprehensive guide to launching your tech startup. From idea validation to funding and scaling your business.",
          content: "Full content about tech business...",
          author: "James Wilson",
          authorAvatar: "👨‍💼",
          date: "3 days ago",
          readTime: "15 min read",
          category: "business",
          image: "💡",
          featured: true,
          likes: 312,
          comments: 67,
          tags: ["Business", "Startup", "Tech"],
        },
        {
          id: 7,
          title: "Minimalist Lifestyle for Developers",
          excerpt:
            "How adopting a minimalist approach can improve your productivity, focus, and overall well-being as a developer.",
          content: "Full content about minimalist lifestyle...",
          author: "Emma Roberts",
          authorAvatar: "👩‍🌾",
          date: "4 days ago",
          readTime: "5 min read",
          category: "lifestyle",
          image: "🌿",
          featured: false,
          likes: 145,
          comments: 19,
          tags: ["Lifestyle", "Productivity", "Minimalism"],
        },
        {
          id: 8,
          title: "Advanced CSS Grid Layout Techniques",
          excerpt:
            "Master complex layouts with CSS Grid. Learn advanced techniques for responsive design and creative layouts.",
          content: "Full content about CSS Grid...",
          author: "Carlos Martinez",
          authorAvatar: "👨‍🎓",
          date: "5 days ago",
          readTime: "9 min read",
          category: "tutorials",
          image: "📐",
          featured: false,
          likes: 167,
          comments: 31,
          tags: ["CSS", "Grid", "Layout"],
        },
      ];
      return mockBlogs;
    };

    setLoading(true);
    setTimeout(() => {
      const blogData = generateBlogs();
      setBlogs(blogData);
      setFilteredBlogs(blogData);
      setLoading(false);
    }, 1500);
  }, []);

  // Add blog refs
  const addToBlogRefs = (el) => {
    if (el && !blogRefs.current.includes(el)) {
      blogRefs.current.push(el);
    }
  };

  // Add category refs
  const addToCategoryRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (loading) return;

    const masterTl = gsap.timeline();

    // Header animation
    masterTl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Search bar animation
    masterTl.fromTo(
      searchRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Categories animation
    masterTl.fromTo(
      categoryRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Featured post animation
    const featuredPosts = filteredBlogs.filter((blog) => blog.featured);
    if (featuredPosts.length > 0) {
      masterTl.fromTo(
        featuredRef.current,
        { x: -100, opacity: 0, rotationY: 10 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: "power2.out" },
        "-=0.2"
      );
    }

    // Sidebar animation
    masterTl.fromTo(
      sidebarRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Blog grid animation
    masterTl.fromTo(
      blogGridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    // Individual blog post animations with ScrollTrigger
    blogRefs.current.forEach((blog, index) => {
      gsap.fromTo(
        blog,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotationX: 5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: blog,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Blog hover animations
      blog.addEventListener("mouseenter", () => {
        gsap.to(blog, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      blog.addEventListener("mouseleave", () => {
        gsap.to(blog, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Load more button animation
    if (loadMoreRef.current) {
      gsap.fromTo(
        loadMoreRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: loadMoreRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [loading, filteredBlogs]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    // Animate category buttons
    categoryRefs.current.forEach((cat, index) => {
      if (categories[index].id === categoryId) {
        gsap.to(cat, {
          scale: 1.05,
          duration: 0.3,
          ease: "elastic.out(1, 0.8)",
        });
      } else {
        gsap.to(cat, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    // Filter blogs
    if (categoryId === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === categoryId));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(value.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(value.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(value.toLowerCase())
          )
      );
      setFilteredBlogs(filtered);
    }
  };

  const loadMoreBlogs = () => {
    setLoadingMore(true);

    // Simulate API call
    setTimeout(() => {
      const newBlogs = [
        {
          id: blogs.length + 1,
          title: "New Blog Post: Modern Web Architecture",
          excerpt:
            "Exploring the latest patterns in web application architecture and microservices.",
          author: "Tech Team",
          authorAvatar: "👥",
          date: "Just now",
          readTime: "11 min read",
          category: "technology",
          image: "🏛️",
          featured: false,
          likes: 0,
          comments: 0,
          tags: ["Architecture", "Microservices", "Web"],
        },
        {
          id: blogs.length + 2,
          title: "The Art of Code Review",
          excerpt:
            "Best practices for conducting effective and constructive code reviews in your team.",
          author: "Code Master",
          authorAvatar: "👨‍🏫",
          date: "Just now",
          readTime: "7 min read",
          category: "tutorials",
          image: "🔍",
          featured: false,
          likes: 0,
          comments: 0,
          tags: ["Code Review", "Best Practices", "Teamwork"],
        },
      ];

      setBlogs((prev) => [...prev, ...newBlogs]);
      setFilteredBlogs((prev) => [...prev, ...newBlogs]);
      setLoadingMore(false);

      // Animate new blogs
      setTimeout(() => {
        const newBlogElements = blogRefs.current.slice(-newBlogs.length);
        newBlogElements.forEach((blog, index) => {
          gsap.fromTo(
            blog,
            {
              y: 100,
              opacity: 0,
              scale: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.2,
              ease: "back.out(1.7)",
            }
          );
        });
      }, 100);
    }, 1000);
  };

  const handleLike = (blogId) => {
    const blogElement = blogRefs.current.find(
      (_, index) => filteredBlogs[index]?.id === blogId
    );

    if (blogElement) {
      // Like animation
      gsap.to(blogElement.querySelector(".like-button"), {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.8)",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loading Articles...
          </div>
        </div>
      </div>
    );
  }

  const featuredPosts = filteredBlogs.filter((blog) => blog.featured);
  const regularPosts = filteredBlogs.filter((blog) => !blog.featured);

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
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the latest insights, tutorials, and trends in technology,
            design, and development. Stay updated with our carefully curated
            articles.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg shadow-lg"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 space-x-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={addToCategoryRefs}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 interactive ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{category.name}</div>
                <div
                  className={`text-sm ${
                    selectedCategory === category.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {category.count} articles
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div ref={featuredRef} className="mb-12">
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((blog) => (
                    <div
                      key={blog.id}
                      ref={addToBlogRefs}
                      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                          <span className="text-2xl">{blog.image}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {blog.date} • {blog.readTime}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {blog.authorAvatar}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {blog.author}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500">
                          <button
                            onClick={() => handleLike(blog.id)}
                            className="like-button flex items-center space-x-1 interactive"
                          >
                            <span>❤️</span>
                            <span className="text-sm">{blog.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 interactive">
                            <span>💬</span>
                            <span className="text-sm">{blog.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div ref={blogGridRef}>
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                {selectedCategory === "all"
                  ? "Latest Articles"
                  : `${
                      categories.find((c) => c.id === selectedCategory)?.name
                    }`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map((blog, index) => (
                  <div
                    key={blog.id}
                    ref={addToBlogRefs}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 interactive group"
                  >
                    {/* Blog Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-xl">{blog.image}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                            {blog.category}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {blog.date}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {blog.readTime}
                      </span>
                    </div>

                    {/* Blog Content */}
                    <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Blog Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {blog.authorAvatar}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {blog.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-500">
                        <button
                          onClick={() => handleLike(blog.id)}
                          className="like-button flex items-center space-x-1 interactive text-sm"
                        >
                          <span>❤️</span>
                          <span>{blog.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 interactive text-sm">
                          <span>💬</span>
                          <span>{blog.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {filteredBlogs.length > 0 && (
                <div ref={loadMoreRef} className="text-center mt-12">
                  <button
                    onClick={loadMoreBlogs}
                    disabled={loadingMore}
                    className={`px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg transition-all duration-300 transform interactive ${
                      loadingMore
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-purple-600 hover:text-white hover:scale-105"
                    }`}
                  >
                    {loadingMore ? (
                      <span className="flex items-center space-x-2">
                        <span className="animate-spin">⏳</span>
                        <span>Loading...</span>
                      </span>
                    ) : (
                      "Load More Articles ↓"
                    )}
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredBlogs.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    No Articles Found
                  </h3>
                  <p className="text-xl text-gray-600 max-w-md mx-auto">
                    {searchTerm
                      ? `No results found for "${searchTerm}". Try different keywords.`
                      : "No articles available in this category."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-1 space-y-8">
            {/* Popular Posts */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Popular Posts
              </h3>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 interactive"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{post.image}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {post.reads} reads
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 text-white">
              <h3 className="text-xl font-black mb-3">Stay Updated</h3>
              <p className="text-purple-100 mb-4 text-sm">
                Get the latest articles delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 interactive">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-all duration-200 interactive cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
