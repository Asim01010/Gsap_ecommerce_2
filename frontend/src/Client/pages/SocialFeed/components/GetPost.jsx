import React, { useState } from "react";
import { User } from "lucide-react";
import moment from "moment";

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

    

      {/* Engagement */}
      <div className="px-6 py-3 border-t border-b border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{post.likes || 0} likes</span>
          <span>{comments[post._id]?.length || 0} comments</span>
          <span>{post.shares || 0} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 grid grid-cols-3 gap-2">
        <button
          onClick={() => handleLike(post._id)}
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

        <button className="flex items-center justify-center space-x-2 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 interactive">
          <span className="text-xl">🔄</span>
          <span className="font-semibold">Share</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleCommentSubmit} className="mb-6 flex space-x-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Post
            </button>
          </form>

          <div id={`comments-${post._id}`} className="space-y-4">
            {(comments[post._id] || []).map((comment) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPost;
