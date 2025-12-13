import { User } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";
const GetPost = ({
  post,
  showComments,
  //   setShowComments,
  commentText,
  setCommentText,
  handleCommentSubmit,
  addToPostRefs,
  //   handleLike,
  //   handleShare,
  comments,
  addToCommentRefs,
  background,
  // _id,
  text,
  // user,
  createdAt,
}) => {
  const { user } = useSelector((state) => state.register);

  return (
    <div
      ref={addToPostRefs}
      className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 interactive group mb-8"
    >
      {/* Post Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl">
            <User />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h4>
              {post.user.verified && (
                <span className="text-blue-500" title="Verified">
                  ✓
                </span>
              )}
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                admin
              </span>
            </div>
            <p className="text-sm text-gray-500">{moment(createdAt).fromNow()}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <p className="text-gray-800 mb-4 text-lg">{text}</p>

        {/* Product Card */}
        <div className="bg-gradient-to-br from-purple-50 h-[500px] to-blue-50 rounded-2xl p-4 mb-4 interactive">
          <div
            className="flex items-center space-x-4 h-full w-full"
            style={{
              backgroundImage: background?.backgroundImage
                ? `url(${background.backgroundImage})`
                : `linear-gradient(${background.startColor}, ${background.endColor})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

      {/* Engagement Stats */}
      {/* <div className="px-6 py-3 border-t border-b border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div> */}

      {/* Action Buttons */}
      {/* <div className="p-4 grid grid-cols-3 gap-2">
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
      </div> */}

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
            {(comments[post.id] || []).map((comment) => (
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

export default GetPost;
