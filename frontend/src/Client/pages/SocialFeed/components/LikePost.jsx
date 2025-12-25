import React, { useState, useRef, useEffect } from "react";
import { Smile, ThumbsUp, MessageCircle, Share2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addReaction } from "../../../../features/Post/postSlice"; // adjust path as needed


// Emoji reaction options
const EMOJI_REACTIONS = [
  { id: "like", emoji: "👍", label: "Like", color: "text-blue-500" },
  { id: "love", emoji: "❤️", label: "Love", color: "text-red-500" },
  { id: "haha", emoji: "😂", label: "Haha", color: "text-yellow-500" },
  { id: "wow", emoji: "😮", label: "Wow", color: "text-yellow-500" },
  { id: "sad", emoji: "😢", label: "Sad", color: "text-yellow-500" },
  { id: "angry", emoji: "😠", label: "Angry", color: "text-red-600" },
];

const LikePost = ({
  addToCommentRefs,
  comments,
  handleCommentSubmit,
  setShowComments,
  showComments,
  post,
  setCommentText,
  commentText,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [showShareOptions, setShowShareOptions] = useState(false);
  const [userReaction, setUserReaction] = useState(post.userReaction || null);
  const [reactionCounts, setReactionCounts] = useState(
    post.reactionCounts || {}
  );
  const [commentEmojiPicker, setCommentEmojiPicker] = useState(null);
  const emojiPickerRef = useRef(null);
  const shareOptionsRef = useRef(null);

  // Initialize reaction counts from post data
  useEffect(() => {
    if (post.reactions) {
      const counts = EMOJI_REACTIONS.reduce((acc, reaction) => {
        acc[reaction.id] = post.reactions[reaction.id] || 0;
        return acc;
      }, {});
      setReactionCounts(counts);
    }
  }, [post.reactions]);

  // Set user reaction from post data
  useEffect(() => {
    if (post.userReaction) {
      setUserReaction(post.userReaction);
    }
  }, [post.userReaction]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        shareOptionsRef.current &&
        !shareOptionsRef.current.contains(event.target)
      ) {
        // setShowShareOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiReaction = (reactionId) => {
    const newReaction = userReaction === reactionId ? null : reactionId;

    // Update local state
    setUserReaction(newReaction);

    // Update reaction counts
    setReactionCounts((prev) => {
      const newCounts = { ...prev };

      // Remove previous reaction if exists
      if (userReaction && userReaction !== reactionId) {
        newCounts[userReaction] = Math.max(0, newCounts[userReaction] - 1);
      }

      // Add or remove current reaction
      if (newReaction) {
        newCounts[reactionId] =
          (newCounts[reactionId] || 0) + (userReaction === reactionId ? -1 : 1);
      } else if (userReaction === reactionId) {
        newCounts[reactionId] = Math.max(0, newCounts[reactionId] - 1);
      }

      return newCounts;
    });

    // Call the original handleLike with the reaction type
    handleLike(post._id, newReaction);

    // Close the emoji picker
    setShowEmojiPicker(false);
  };

  // const handleShare = (platform) => {
  //   const postUrl = `${window.location.origin}/post/${post._id}`;
  //   const shareText = `Check out this post!`;

  //   const shareUrls = {
  //     twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  //       shareText
  //     )}&url=${encodeURIComponent(postUrl)}`,
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //       postUrl
  //     )}`,
  //     copy: postUrl,
  //   };

  //   if (platform === "copy") {
  //     navigator.clipboard.writeText(postUrl);
  //     alert("Link copied to clipboard!");
  //   } else {
  //     window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  //   }

  //   setShowShareOptions(false);
  // };

  const handleCommentEmoji = (emoji, commentId = null) => {
    if (commentId) {
      // Handle comment emoji reaction
      console.log(`Adding ${emoji} to comment ${commentId}`);
    } else {
      // Add emoji to comment text
      setCommentText((prev) => prev + emoji);
    }
    setCommentEmojiPicker(null);
  };

  const totalReactions = Object.values(reactionCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const currentReaction = userReaction
    ? EMOJI_REACTIONS.find((r) => r.id === userReaction)
    : null;

const dispatch = useDispatch();
const handleLike = (postId, reaction) => {
  // Dispatch the addReaction thunk
  dispatch(addReaction({ postId, reaction }));
};




  return (
    <div>
      {/* Engagement Stats */}
      <div className="px-6 py-3 border-t border-b border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {totalReactions > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {EMOJI_REACTIONS.filter((r) => reactionCounts[r.id] > 0)
                  .slice(0, 3)
                  .map((reaction, idx) => (
                    <div
                      key={reaction.id}
                      className="w-5 h-5 bg-white border border-white rounded-full flex items-center justify-center text-xs shadow-sm"
                      style={{ zIndex: 3 - idx }}
                      title={`${reactionCounts[reaction.id]} ${reaction.label}`}
                    >
                      {reaction.emoji}
                    </div>
                  ))}
              </div>
              <span className="ml-2">{totalReactions}</span>
            </div>
          )}
          <span>{comments[post._id]?.length || 0} comments</span>
          <span>{post.shares || 0} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 grid grid-cols-3 gap-2 relative">
        {/* Like Button with Emoji Picker */}
        <div className="relative" ref={emojiPickerRef}>
          <button
            onMouseEnter={() => setShowEmojiPicker(true)}
            onMouseLeave={() => {
              // Small delay to allow moving cursor to emoji picker
              setTimeout(() => {
                if (!emojiPickerRef.current?.matches(":hover")) {
                  setShowEmojiPicker(false);
                }
              }, 200);
            }}
            onClick={() => !userReaction && handleEmojiReaction("like")}
            className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-200 interactive w-full ${
              userReaction
                ? `${currentReaction?.color || "text-red-600"} bg-gray-50`
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-xl">
              {userReaction ? currentReaction?.emoji : "🤍"}
            </span>
            <span className="font-semibold">
              {userReaction ? currentReaction?.label : "Like"}
            </span>
          </button>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50"
              onMouseEnter={() => setShowEmojiPicker(true)}
              onMouseLeave={() => setShowEmojiPicker(false)}
            >
              <div className="flex items-center space-x-1">
                {EMOJI_REACTIONS.map((reaction) => (
                  <button
                    key={reaction.id}
                    onClick={() => handleEmojiReaction(reaction.id)}
                    className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-125 active:scale-95 ${
                      userReaction === reaction.id
                        ? "bg-blue-50 ring-2 ring-blue-100"
                        : ""
                    }`}
                    title={reaction.label}
                  >
                    <span className="text-xl">{reaction.emoji}</span>
                  </button>
                ))}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
            </div>
          )}
        </div>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-200 interactive ${
            showComments
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <span className="text-xl">💬</span>
          <span className="font-semibold">Comment</span>
        </button>

        {/* Share Button with Dropdown */}
        {/* <div className="relative" ref={shareOptionsRef}>
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="flex items-center justify-center space-x-2 py-3  w-full rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 interactive"
          >
            <span className="text-xl">
              <Share2 />
            </span>
            <span className="font-semibold">Share</span>
          </button>

          {
          // showShareOptions && 
          // (
          //   <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-50 min-w-[200px]">
          //     <div className="space-y-2">
          //       <button
          //         onClick={() => handleShare("facebook")}
          //         className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
          //       >
          //         <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          //           <span className="text-blue-700 font-bold">f</span>
          //         </div>
          //         <span className="font-medium">Share on Facebook</span>
          //       </button>
          //       <button
          //         onClick={() => handleShare("twitter")}
          //         className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
          //       >
          //         <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          //           <span className="text-white">𝕏</span>
          //         </div>
          //         <span className="font-medium">Share on X</span>
          //       </button>
          //       <button
          //         onClick={() => handleShare("copy")}
          //         className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
          //       >
          //         <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          //           <Share2 className="w-4 h-4 text-gray-600" />
          //         </div>
          //         <span className="font-medium">Copy Link</span>
          //       </button>
          //     </div>
          //     <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
          //   </div>
          // )
          
          }
        </div> */}
      </div>

      {/* Comments Section */}
      {
      showComments && 
      (
        <div className="border-t border-gray-200 p-6 animate-fadeIn">
          {/* Comment Input with Emoji Picker */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex space-x-3">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 pr-12"
                  placeholder="Write a comment..."
                />
                <button
                  type="button"
                  onClick={() =>
                    setCommentEmojiPicker(commentEmojiPicker ? null : "input")
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg"
                >
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>

                {/* Comment Input Emoji Picker */}
                {commentEmojiPicker === "input" && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
                    <div className="grid grid-cols-6 gap-1">
                      {EMOJI_REACTIONS.map((reaction) => (
                        <button
                          key={reaction.id}
                          type="button"
                          onClick={() => handleCommentEmoji(reaction.emoji)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-xl"
                        >
                          {reaction.emoji}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleCommentEmoji("😊")}
                        className="p-2 hover:bg-gray-100 rounded-lg text-xl"
                      >
                        😊
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCommentEmoji("🙏")}
                        className="p-2 hover:bg-gray-100 rounded-lg text-xl"
                      >
                        🙏
                      </button>
                    </div>
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-200 ${
                  commentText.trim()
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div
            id={`comments-${post._id}`}
            className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
          >
            {(comments[post._id] || []).map((comment) => (
              <div
                key={comment.id}
                ref={addToCommentRefs}
                className="flex space-x-3 group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                  {comment.user.avatar || comment.user.name.charAt(0)}
                </div>

                <div className="flex-grow">
                  <div className="bg-gray-50 rounded-2xl p-4 group-hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() =>
                            setCommentEmojiPicker(
                              commentEmojiPicker === comment.id
                                ? null
                                : comment.id
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Add reaction"
                        >
                          <Smile className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>

                    {/* Comment Emoji Picker */}
                    {commentEmojiPicker === comment.id && (
                      <div className="mt-2 ml-[-4px]">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 inline-block">
                          <div className="flex space-x-1">
                            {EMOJI_REACTIONS.slice(0, 6).map((reaction) => (
                              <button
                                key={reaction.id}
                                type="button"
                                onClick={() =>
                                  handleCommentEmoji(reaction.emoji, comment.id)
                                }
                                className="p-1 hover:bg-gray-100 rounded text-lg transform hover:scale-125 transition-transform"
                              >
                                {reaction.emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comment Reactions */}
                    {comment.reactions &&
                      Object.keys(comment.reactions).length > 0 && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            {Object.entries(comment.reactions)
                              .filter(([_, count]) => count > 0)
                              .slice(0, 3)
                              .map(([emojiId, count], idx) => {
                                const reaction = EMOJI_REACTIONS.find(
                                  (r) => r.id === emojiId
                                );
                                return reaction ? (
                                  <div
                                    key={reaction.id}
                                    className="w-5 h-5 bg-white border border-white rounded-full flex items-center justify-center text-xs shadow-sm"
                                    style={{ zIndex: 3 - idx }}
                                  >
                                    {reaction.emoji}
                                  </div>
                                ) : null;
                              })}
                          </div>
                          <span className="text-xs text-gray-500">
                            {Object.values(comment.reactions).reduce(
                              (a, b) => a + b,
                              0
                            )}
                          </span>
                        </div>
                      )}

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-200">
                      <button className="text-xs text-gray-500 hover:text-blue-600">
                        Like
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-600">
                        Reply
                      </button>
                      <span className="text-xs text-gray-400">
                        {comment.replies?.length || 0} replies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      }

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default LikePost;
