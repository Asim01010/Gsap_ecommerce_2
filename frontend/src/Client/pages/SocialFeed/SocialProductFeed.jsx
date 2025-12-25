import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AddPost from "./components/AddPost";
import GetPost from "./components/GetPost";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../features/Post/postSlice";

gsap.registerPlugin(ScrollTrigger);

const SocialProductFeed = () => {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const postRefs = useRef([]);
  const commentRefs = useRef([]);
  const hasAnimated = useRef(false);


  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const addToPostRefs = (el) => {
    if (el && !postRefs.current.includes(el)) postRefs.current.push(el);
  };

  const addToCommentRefs = (el) => {
    if (el && !commentRefs.current.includes(el)) commentRefs.current.push(el);
  };

  // Fetch posts from backend
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Wait until posts are loaded
  useEffect(() => {
    if (!posts) return;
    setLoading(false);
  }, [posts]);

  // GSAP Animations
useEffect(() => {
  if (loading) return;
  if (hasAnimated.current) return;

  hasAnimated.current = true;

  const masterTl = gsap.timeline();

  masterTl.fromTo(
    headerRef.current,
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
  );

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
}, [loading]);



  // Comment handler (frontend only)
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Product Feed
          </h1>
          <p className="text-xl text-gray-600">
            Discover new products and share your thoughts with the community
          </p>
        </div>

        {/* Admin AddPost */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20">
            <AddPost />
          </div>
        </div>

        {/* Posts */}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <GetPost
              key={post._id}
              post={post}
              addToPostRefs={addToPostRefs}
              addToCommentRefs={addToCommentRefs}
              comments={comments}
             
              handleAddComment={handleAddComment}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default SocialProductFeed;
