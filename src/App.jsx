import { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import StudentBanner from "./components/common/StudentBanner";
import FooterDisclaimer from "./components/common/FooterDisclaimer";
import Navbar from "./components/layout/Navbar";
import Advanced from "./pages/Advanced";
import AssetDetail from "./pages/AssetDetail";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddCrypto from "./pages/AddCrypto";

// ---------- Auth Context ----------
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" replace />;
}

// ---------- App ----------
function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isAdvancedPage = pathname === "/advanced";

  // Auth state – token stored in memory (set after login)
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <div
        className={`flex min-h-screen flex-col ${
          isAdvancedPage ? "bg-[#0A0A0A] text-white" : "bg-white text-black"
        }`}
      >
        {/* Lecturer requirement 3: warning banner */}
        <StudentBanner />

        {!isAuthPage && <Navbar isDark={isAdvancedPage} />}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/assets/:symbol" element={<AssetDetail />} />
            <Route path="/advanced" element={<Advanced />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/crypto/add"
              element={
                <ProtectedRoute>
                  <AddCrypto />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Lecturer requirement 4: footer disclaimer */}
        <FooterDisclaimer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
