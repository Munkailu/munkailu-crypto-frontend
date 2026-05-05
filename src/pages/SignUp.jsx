import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import delegateIcon from "../assets/delegate-3.svg";
import developerIcon from "../assets/developerPlatformNavigation-2.svg";
import businessIcon from "../assets/holdingCoin-3.svg";

const API_BASE = "https://munkailu-crypto-backend.onrender.com";
const accountTypes = [
  { title: "Personal", description: "Trade crypto as an individual.", icon: delegateIcon, alt: "Personal account" },
  {
    title: "Business",
    description: "Manage teams and portfolios, accept crypto payments, access APIs, and more.",
    icon: businessIcon,
    alt: "Business account",
  },
  {
    title: "Developer",
    description: "Build onchain using developer tooling.",
    icon: developerIcon,
    alt: "Developer account",
  },
];

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("type"); // "type" | "details"
  const [accountType, setAccountType] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleTypeSelect(type) {
    setAccountType(type);
    setStep("details");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      navigate("/signin");
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

      {/* Lecturer requirement 5: demo note on register page */}
      <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
          🎓 Demo app – do not use your real password
        </span>
      </div>

      <div className="w-full max-w-[620px]">
        {step === "type" ? (
          <>
            <h1 className="mx-auto w-[65.6%] text-left text-2xl font-medium tracking-tight sm:text-3xl">
              What kind of account are you creating?
            </h1>

            <div className="mx-auto mt-8 w-[82%] space-y-4">
              {accountTypes.map((account) => (
                <button
                  key={account.title}
                  type="button"
                  onClick={() => handleTypeSelect(account.title)}
                  className="mx-auto flex w-[80%] items-start gap-4 rounded-lg border border-white/15 bg-[#181818] px-5 py-5 text-left transition-colors hover:bg-white/5"
                >
                  <img src={account.icon} alt={account.alt} className="mt-0.5 h-12 w-12 shrink-0" />
                  <span className="block">
                    <span className="block text-lg font-semibold text-white">{account.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-300">{account.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setStep("type")}
              className="mb-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Create your {accountType} account
            </h1>

            {error && (
              <p className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400">{error}</p>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              {[
                { id: "name", label: "Full Name", type: "text", value: name, setter: setName, placeholder: "Your full name" },
                { id: "email", label: "Email", type: "email", value: email, setter: setEmail, placeholder: "Your email address" },
                { id: "password", label: "Password", type: "password", value: password, setter: setPassword, placeholder: "Create a password" },
              ].map(({ id, label, type, value, setter, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-300">{label}</label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    className="block w-full rounded-xl border border-white/15 bg-[#181818] px-6 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-[#2f61e8]"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#273c75] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#22356a] disabled:opacity-60"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-base text-gray-300">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-[#2f61e8] hover:text-[#5f86f0]">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default SignUp;
