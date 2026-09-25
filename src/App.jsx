import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, clearLogin } from "./redux/features/Login/loginSlice";
import { setIsLoggedIn } from "./redux/features/User/user";

// Existing Components
import Dashboard from "./components/Landing-Page/Dashboard";
import Home from "./components/Authentication/Home";
import Forgot from "./components/Authentication/Forgot";
import Verify from "./components/Authentication/Verify";
import DashBoard_Host from "./components/HostInterface/Home";
import NotFound from "./components/NotFound";

// Renter Components & Layout
import RenterLayout from "./components/RenterInterFace/RenterLayout";
import RenterDashboard from "./components/RenterInterFace/Dashboard/RenterDashboard";
import BrowseSpaces from "./components/RenterInterFace/BrowseSpaces/BrowseSpaces";
import SpaceDetails from "./components/RenterInterFace/SpaceDetails/SpaceDetails";
import Favorites from "./components/RenterInterFace/Favorites/Favorites";
import MyBookings from "./components/RenterInterFace/Bookings/MyBookings";
import BookingDetails from "./components/RenterInterFace/Bookings/BookingDetails";
import Checkout from "./components/RenterInterFace/Checkout/Checkout";
import Transactions from "./components/RenterInterFace/Payments/Transactions";
import Messages from "./components/RenterInterFace/Messages/Messages";
import Notifications from "./components/RenterInterFace/Notifications/Notifications";
import RenterProfile from "./components/RenterInterFace/Profile/RenterProfile";
import Reviews from "./components/RenterInterFace/Reviews/Reviews";
import HelpSupport from "./components/RenterInterFace/Help/HelpSupport";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMe() {
      try {
        let res = await fetch("http://localhost:3000/api/getMe", {
          credentials: "include",
        });

        // Access token expired
        if (res.status === 401) {
          const refreshRes = await fetch(
            "http://localhost:3000/api/refreshToken",
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (refreshRes.ok) {
            res = await fetch("http://localhost:3000/api/getMe", {
              credentials: "include",
            });
          }
        }

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          dispatch(setLogin(data.user));
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(clearLogin());
          dispatch(setIsLoggedIn(false));
        }
      } catch (error) {
        console.error(error);
        dispatch(clearLogin());
        dispatch(setIsLoggedIn(false));
      } finally {
        setLoading(false);
      }
    }
    getMe();
  }, [dispatch]);

  function ProtectedRoute({ children }) {
    if (loading) return null;
    return isLoggedIn ? children : <Navigate to="/SignIn-Up" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Audio
          height={80}
          width={80}
          radius={9}
          color="#2563EB"
          ariaLabel="loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/RenterInterface" element={<Dashboard />} /> */}
        

        {/* Authentication Routes */}
        <Route path="/SignIn-Up" element={<Home />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route
          path="/Verify"
          element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          }
        />

        {/* Existing Host Interface Route */}
        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard_Host />
            </ProtectedRoute>
          }
        />

        {/* Renter Side Routes (Wrapped in RenterLayout) */}
        <Route element={<RenterLayout />}>
          <Route path="/spaces" element={<BrowseSpaces />} />
          <Route path="/spaces/:listingId" element={<SpaceDetails />} />
          <Route path="/help" element={<HelpSupport />} />

          {/* Protected Renter Routes */}
          <Route
            path="/renter/dashboard"
            element={
              <ProtectedRoute>
                <RenterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/:bookingId"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/:bookingId"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <RenterProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;