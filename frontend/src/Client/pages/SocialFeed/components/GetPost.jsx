import React, { useState } from "react";
import { User } from "lucide-react";
import moment from "moment";
import LikePost from "./LikePost";

const GetPost = ({
  post,
  addToPostRefs,
  addToCommentRefs,
  comments,
  handleLike,
  handleAddComment,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    handleAddComment(post._id, commentText);
    setCommentText("");
  };

  return (
    <div
      ref={(el) => addToPostRefs(el)}
      className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 interactive group mb-8"
    >
      {/* Post Header */}
      <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl">
          <User />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-gray-800">
            {post.user?.firstName} {post.user?.lastName}
          </h4>
          <p className="text-sm text-gray-500">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Post Content */}

      <div className="w-full rounded-2xl overflow-hidden bg-white shadow-md">
        {/* CASE 1 & 2 & 5 → BACKGROUND */}
        {post.background &&
          (post.background.backgroundImage ||
            (post.background.startColor !== "#ffffff" &&
              post.background.endColor !== "#ffffff")) && (
            <div
              className={`relative w-full flex items-center justify-center text-center ${
                post.image ? "py-6" : "min-h-[280px]"
              }`}
              style={{
                background: post.background.backgroundImage
                  ? `url(${post.background.backgroundImage}) center/cover no-repeat`
                  : `linear-gradient(135deg, ${post.background.startColor}, ${post.background.endColor})`,
              }}
            >
              {post.text && (
                <p className="text-white text-2xl md:text-3xl font-bold px-6">
                  {post.text}
                </p>
              )}
            </div>
          )}

        {/* CASE 1 & 4 → TEXT ONLY (NO BACKGROUND) */}
        {post.text &&
          (!post.background ||
            (post.background.startColor === "#ffffff" &&
              !post.background.backgroundImage)) && (
            <p className="px-4 py-3 text-lg text-gray-900 font-medium">
              {post.text}
            </p>
          )}

        {/* CASE 3 & 4 & 5 → IMAGE */}
        {post.image && (
          <img
            src={post.image}
            alt="Post media"
            className="w-full max-h-[650px] object-cover"
          />
        )}
      </div>

      <LikePost
        addToCommentRefs={addToCommentRefs}
        comments={comments}
        handleLike={handleLike}
        handleCommentSubmit={handleCommentSubmit}
        setShowComments={setShowComments}
        showComments={showComments}
        post={post}
        setCommentText={setCommentText}
        commentText={commentText}
        // handleLike={handleLike}
        // posts={posts}
      />
    </div>
  );
};

export default GetPost;
