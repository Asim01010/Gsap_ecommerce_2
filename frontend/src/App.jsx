import React from "react";
import Login from "./Client/auth/Login";
import Register from "./Client/auth/Register";
import OTPVerification from "./Client/auth/OTPVerification";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import EcommerceHomepage from "./Client/pages/Home/EcommerceHomepage";
import SingleProduct from "./Client/pages/SingleProduct/SingleProduct";
import AllProducts from "./Client/pages/AllProducts/AllProducts";
import Cart from "./Client/pages/Cart/Cart";
import Blog from "./Client/pages/Blog/Blog";
import UserProfile from "./Client/pages/UserProfile/UserProfile";
import SocialProductFeed from "./Client/pages/SocialFeed/SocialProductFeed";
import Categories from "./Client/pages/Categories/Categories";
import Deals from "./Client/pages/Deals/Deals";
import Trending from "./Client/pages/Trending/Trending";

import Navbar from "./Client/components/Navbar";
import Footer from "./Client/components/Footer";

import { Toaster } from "react-hot-toast";

// 🔹 Hide Navbar & Footer on specific pages
const HideLayoutRoutes = ["/login", "/register", "/otpVerify"];

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideLayout = HideLayoutRoutes.some((r) =>
    location.pathname.startsWith(r)
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div>
      <Toaster position="bottom-left" />

      <Router>
        <AppLayout>
          <Routes>
            {/* Default route → open /home first */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Auth Routes (No Navbar / Footer) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otpVerify/:id" element={<OTPVerification />} />

            {/* Normal Pages */}
            <Route path="/home" element={<EcommerceHomepage />} />
            <Route path="/single" element={<SingleProduct />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/product-feed" element={<SocialProductFeed />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
};

export default App;
