import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronLeft, Smile, User, X } from "lucide-react";
import { colorData } from "../data/color-data";
import gsap from "gsap";
import { imageExpo } from "../data/decorative";
import { useSelector, useDispatch } from "react-redux";
import { createPost, postReset } from "../../../../features/Post/postSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";
const AddPostBox = ({ handleClose }) => {
  const [openColor, setOpenColor] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    startColor: "#ffffff",
    endColor: "#ffffff",
    backgroundImage: "",
  });

  const [changeRow, setChangeRow] = useState(false);

  const { startColor, endColor } = selectedColor;
  const [text, setText] = useState("");
  const [show, setShow] = useState(true);

  const colorBoxRef = useRef(null);
  const backgroundModalRef = useRef(null);
  const postBoxRef = useRef(null);

  // Animation for color box
  useEffect(() => {
    if (openColor) {
      gsap.to(colorBoxRef.current, {
        duration: 0.4,
        opacity: 1,
        x: 0,
        ease: "power3.out",
        display: "flex",
      });
    } else {
      gsap.to(colorBoxRef.current, {
        duration: 0.3,
        opacity: 0,
        x: -40,
        ease: "power3.in",
        display: "none",
      });
    }
  }, [openColor]);

  // Animation for background modal show/hide
  useEffect(() => {
    if (showBackgroundModal) {
      gsap.to(postBoxRef.current, {
        duration: 0.3,
        opacity: 0,
        scale: 0.95,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(postBoxRef.current, { display: "none" });
          gsap.set(backgroundModalRef.current, { display: "block" });
          gsap.fromTo(
            backgroundModalRef.current,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.2)",
            }
          );
        },
      });
    } else if (backgroundModalRef.current) {
      gsap.to(backgroundModalRef.current, {
        duration: 0.3,
        opacity: 0,
        scale: 0.9,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(backgroundModalRef.current, { display: "none" });
          gsap.set(postBoxRef.current, { display: "block" });
          gsap.fromTo(
            postBoxRef.current,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.2)",
            }
          );
        },
      });
    }
  }, [showBackgroundModal]);

  // useEffect(() => {});
  // Handle color selection
  const handleColorSelect = (item, index) => {
    // If it's the last button (index 9), open background modal
    if (index === 9) {
      setShowBackgroundModal(true);
    } else {
      // For all other colors (index 0-8)
      const newColor = {
        startColor: item?.startColor || "#ffffff",
        endColor: item?.endColor || "#ffffff",
        backgroundImage: item?.backgroundImage || "",
      };

      // Index 0 is white, so keep textarea small
      // Other colors make textarea bigger
      setChangeRow(index !== 0);

      setSelectedColor(newColor);
    }
  };

  // Handle background selection from modal
  const handleBackgroundSelect = (item) => {
    let newColor = {
      startColor: "",
      endColor: "",
      backgroundImage: "",
    };

    if (item.type === "gradient") {
      const colors = item.gradient.match(/#[0-9a-f]{6}/gi);
      if (colors && colors.length >= 2) {
        newColor.startColor = colors[0];
        newColor.endColor = colors[1];
      }
    } else if (item.type === "solid") {
      newColor.startColor = item.color;
      newColor.endColor = item.color;
    } else if (item.type === "dummy") {
      newColor.backgroundImage = item.url;
    }

    // All backgrounds from modal make textarea bigger
    setChangeRow(true);
    setSelectedColor(newColor);
    setShowBackgroundModal(false);
    setOpenColor(false);
  };
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.register);
  const { posts, postLoading, postError, postSuccess, postMessage } =
    useSelector((state) => state.post);
  const dispatch = useDispatch();
  const handlePostUpload = (e) => {
    e.preventDefault();

    const postData = {
      text: text,
      background: {
        startColor: selectedColor.startColor,
        endColor: selectedColor.endColor,
        backgroundImage: selectedColor.backgroundImage,
      },
      user_id: user?._id,
    };

    dispatch(createPost(postData));
    console.log("POST DATA:", postData);

    // Example: send to backend (Node/MongoDB)
    // axios.post("/api/post/create", postData)
    //   .then(res => console.log("Post saved"))
    //   .catch(err => console.log(err));
  };
  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }
    if (postSuccess) {
      toast.success("Post created successfully!");
      setText("");
      setSelectedColor({
        startColor: "#ffffff",
        endColor: "#ffffff",
        backgroundImage: "",
      });
      setChangeRow(false);
      handleClose();
    }

    return () => {
      dispatch(postReset());
    };
  }, [postError, postSuccess, postMessage, dispatch]);

  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
        {/* Post Box */}
        <div
          ref={postBoxRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h4 className="text-lg md:text-xl font-bold text-gray-900">
              Create Post
            </h4>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4 md:p-6">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full shadow-sm">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Muhammad Asim</span>
              <div className="flex gap-1 mt-1">
                <div className="px-3 py-1 text-xs rounded-full border border-gray-300 bg-white text-gray-700">
                  Friends
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => {
              const value = e.target.value;
              setText(value);

              if (value.length > 0) {
                setShow(false); // hide placeholder message
              } else {
                setShow(true); // show placeholder message
              }
            }}
            style={{
              resize: "none",
              width: "100%",
              background: selectedColor.backgroundImage
                ? `url(${selectedColor.backgroundImage}) center/cover no-repeat`
                : startColor === "#ffffff" && endColor === "#ffffff"
                ? "white"
                : `linear-gradient(135deg, ${startColor}, ${endColor})`,
              transition: "all 0.3s ease",
            }}
            className={`w-full px-4 md:px-6 py-4 border-none outline-none text-base md:text-lg placeholder-gray-500 ${
              (startColor !== "#ffffff" && endColor !== "#ffffff") ||
              selectedColor.backgroundImage
                ? "text-white placeholder:text-white/90 font-semibold"
                : "text-gray-900"
            } ${
              changeRow
                ? "min-h-[250px] md:min-h-[320px]"
                : "min-h-[150px] md:min-h-[180px]"
            } transition-all duration-300`}
          />

          {show && (
            <p
              className=" absolute font-bold text-3xl pointer-events-none bg-clip-text text-transparent"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
                backgroundImage: `linear-gradient(135deg, purple, blue)`,
              }}
            >
              What's on your mind {user?.lastName || "User"}?
            </p>
          )}

          {/* Footer */}
          <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-4">
              {/* Top row: Color picker */}
              <div className="flex items-center justify-between">
                {/* Left side */}
                {!openColor ? (
                  <button
                    onClick={() => setOpenColor(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <img
                      src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                      alt="Background"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      Background
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenColor(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                )}

                {/* Animated Color Box */}
                <div
                  ref={colorBoxRef}
                  className="flex-1 flex items-center justify-center gap-1 md:gap-2 mx-2 overflow-x-auto gradient-scrollbar overflow-y-hidden opacity-0 -translate-x-10"
                  style={{ display: "none", minHeight: "44px" }}
                >
                  {colorData.map((item, index) => (
                    <button
                      onClick={() => handleColorSelect(item, index)}
                      key={item.id}
                      className="flex-shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-lg cursor-pointer border-2   hover:border-blue-500 hover:scale-105 active:scale-95 transition-all"
                      style={{
                        background:
                          index === 9
                            ? `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                            : index === 8
                            ? `url(${item.backgroundImage}) center/cover no-repeat`
                            : `linear-gradient(135deg, ${item.startColor}, ${item.endColor})`,
                        borderColor:
                          startColor === item.startColor &&
                          endColor === item.endColor
                            ? "#3b82f6"
                            : "#e5e7eb",
                        borderWidth: "2px",
                      }}
                    >
                      {index === 9 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            +
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Right side - Emoji */}
                <div className="flex items-center">
                  <Smile className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Bottom row: Post button */}

              <button
                onClick={handlePostUpload}
                disabled={text.length === 0}
                className={`w-full block md:w-auto px-6 py-3 font-semibold rounded-xl shadow-lg active:scale-95 transition-all duration-200
    ${
      text.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
    }
  `}
              >
                {postLoading ? (
                  <>
                    <svg width={0} height={0}>
                      <defs>
                        <linearGradient
                          id="myGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#e01cd5" />
                          <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <CircularProgress
                      size={40}
                      thickness={4}
                      sx={{ "svg circle": { stroke: "url(#myGradient)" } }}
                    />
                  </>
                ) : (
                  <>POST HERE</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Background Modal */}
        <div
          ref={backgroundModalRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[90vh] md:h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ display: "none", opacity: 0 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowBackgroundModal(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Back
                </span>
              </button>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                Choose Background
              </h1>
              <div className="w-12 md:w-14"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 h-[calc(90vh-80px)] md:h-[calc(85vh-80px)] overflow-y-auto gradient-scrollbar">
            {imageExpo?.map((category) => (
              <div key={category.id} className="mb-8 last:mb-0">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div
                    className={`h-7 w-1.5 rounded-full ${
                      category.id === 1
                        ? "bg-blue-500"
                        : category.id === 2
                        ? "bg-purple-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {category.list.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleBackgroundSelect(item)}
                      className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
                    >
                      <div className="aspect-square">
                        {item.type === "dummy" ? (
                          <img
                            src={item.url}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : item.type === "gradient" ? (
                          <div
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                            style={{ background: item.gradient }}
                          ></div>
                        ) : (
                          <div
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                            style={{ backgroundColor: item.color }}
                          >
                            <span className="text-white text-xs px-2 py-1 bg-black/40 rounded-full">
                              Solid
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium px-3 py-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Select
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostBox;
