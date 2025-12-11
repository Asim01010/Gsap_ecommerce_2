import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/Register/registerSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
const LoginForm = ({ addToInputRefs, buttonRef }) => {
  const [userLogin, SetUserLogin] = React.useState({});

  const { email, password } = userLogin;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetUserLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userError, userSuccess, userMessage } = useSelector(
    (state) => state.register
  );

  const userClick = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }
    if (userSuccess) {
      navigate("/home");
      toast.success(userMessage);
    }
  }, [userError, userSuccess]);

  return (
    <div>
      <form className="space-y-6">
        {/* Email Field */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Email Address
          </label>
          <input
            ref={addToInputRefs}
            value={email}
            type="email"
            name="email"
            onChange={handleInputChange}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/70 backdrop-blur-sm placeholder-gray-400 text-gray-700 font-medium"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Password
            </label>
            <a
              href="#"
              className="text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
            >
              Forgot Password?
            </a>
          </div>
          <input
            ref={addToInputRefs}
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/70 backdrop-blur-sm placeholder-gray-400 text-gray-700 font-medium"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember Me & Extra Options */}
        <div className="flex items-center justify-between extra-element">
          <div className="flex items-center space-x-3">
            <input
              ref={addToInputRefs}
              type="checkbox"
              className="w-5 h-5 text-purple-600 bg-gray-100 border-2 border-gray-300 rounded-lg focus:ring-3 focus:ring-purple-300 focus:ring-offset-0 transition-all duration-200"
            />
            <label className="text-sm font-medium text-gray-700">
              Remember me
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          ref={buttonRef}
          type="submit"
          onClick={userClick}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform relative overflow-hidden group"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
