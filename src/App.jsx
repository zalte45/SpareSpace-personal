import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setLogin } from "./redux/features/Login/loginSlice";
import Dashboard from "./components/Landing-Page/Dashboard";
import Home from "./components/Authentication/Home";
import Forgot from "./components/Authentication/Forgot";
import Verify from "./components/Authentication/Verify";
import DashBoard from "./components/HostInterface/Home";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMe() {
      try {
        let res = await fetch("http://localhost:3000/api/getMe", {
          credentials: "include",
        });

        // Access token expired
        if (res.status === 401) {
          console.log("Rotating token...");

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
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    getMe();
  }, [dispatch]);

  function ProtectedRoute({ children }) {
    if (loading) return null;

    return isAuthenticated ? children : <Navigate to="/SignIn-Up" replace />;
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
        <Route path="/" element={<Dashboard />} />

        <Route path="/SignIn-Up" element={<Home />} />

        <Route path="/Forgot" element={<Forgot />} />

        <Route path="/Verify" element={<Verify />} />

        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;