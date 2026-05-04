import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App";

// Base URL for backend – update this to your deployed Render URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function SignIn() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // "email" | "password"

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (step === "email") {
      if (!email) { setError("Please enter your email."); return; }
      setStep("password");
      return;
    }

    // Password step – call backend
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setToken(data.token);
      setUser(data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#141414] px-4 py-10 text-white">
      <Link to="/" aria-label="Home" className="absolute left-6 top-6 text-white sm:left-8 sm:top-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="h-10 w-10" fill="currentColor">
          <path d="M20.032 28.5c-4.705 0-8.516-3.804-8.516-8.5s3.81-8.5 8.516-8.5a8.51 8.51 0 0 1 8.388 7.083H37C36.276 9.857 28.96 3 20.032 3 10.629 3 3 10.615 3 20s7.629 17 17.032 17C28.959 37 36.276 30.143 37 21.417h-8.58a8.51 8.51 0 0 1-8.388 7.083" />
        </svg>
      </Link>

      <div className="w-full max-w-[500px]">
        {/* Lecturer requirement 5: demo note on login page */}
        <div className="mx-auto mb-4 w-[82%] rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-center text-sm text-amber-300">
          🎓 Demo app – do not use your real password
        </div>

        <h1 className="mx-auto w-[82%] text-center text-3xl font-medium tracking-tight sm:text-4xl">
          Sign in to Crypto App
        </h1>

        {error && (
          <p className="mx-auto mt-4 w-[82%] rounded-lg bg-red-500/20 px-4 py-2 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block w-[82%] mx-auto text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-[82%] rounded-xl border border-white/15 bg-[#181818] px-6 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-[#2f61e8] mx-auto"
            required
          />

          {step === "password" && (
            <>
              <label htmlFor="password" className="block w-[82%] mx-auto text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-[82%] rounded-xl border border-white/15 bg-[#181818] px-6 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-[#2f61e8] mx-auto"
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block w-[82%] rounded-full bg-[#273c75] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#22356a] disabled:opacity-60 mx-auto"
          >
            {loading ? "Signing in…" : step === "email" ? "Continue" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#2f61e8] hover:text-[#5f86f0]">
            Sign up
          </Link>
        </p>

        <p className="mt-5 text-center text-sm leading-relaxed text-gray-500">
          Not your device? Use a private window.
        </p>
      </div>
    </section>
  );
}

export default SignIn;
