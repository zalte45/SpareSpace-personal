import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./redux/features/Login/loginSlice";

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

function ProtectedRoute({ children, isLoggedIn, loading }) {
  if (loading) return null;
  return isLoggedIn ? children : <Navigate to="/SignIn-Up" replace />;
}

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on application startup through centralized architecture
    dispatch(restoreSession())
      .unwrap()
      .catch(() => {
        // Unauthenticated visitor on startup - settled safely
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

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

        {/* Authentication Routes */}
        <Route path="/SignIn-Up" element={<Home />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route
          path="/Verify"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
              <Verify />
            </ProtectedRoute>
          }
        />

        {/* Host Interface Route */}
        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
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
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <RenterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/:bookingId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <BookingDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/:bookingId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <RenterProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
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
