import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/coinbaseLogoNavigation-4.svg";
import { topNavLinks } from "../../data/homeData";
import { useAuth } from "../../App";

const languageOptions = [
  { language: "English", region: "United States" },
  { language: "English", region: "United Kingdom" },
  { language: "French", region: "France" },
  { language: "Spanish", region: "Spain" },
  { language: "German", region: "Germany" },
  { language: "Italian", region: "Italy" },
  { language: "Portuguese", region: "Brazil" },
  { language: "Dutch", region: "Netherlands" },
  { language: "Japanese", region: "Japan" },
  { language: "Korean", region: "South Korea" },
  { language: "Chinese", region: "Singapore" },
  { language: "Arabic", region: "United Arab Emirates" },
];

function Navbar({ isDark = false }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { token, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    setUser(null);
    navigate("/");
  }
  const headerClass = isDark
    ? "sticky top-0 z-50 border-b border-[#1f2937] bg-[#0A0A0A]"
    : "sticky top-0 z-50 border-b border-[#e9edf3] bg-white/95 backdrop-blur";
  const navTextClass = isDark
    ? "text-0.75lg font-bold text-white transition-colors hover:text-[#8fb0ff]"
    : "text-0.75lg font-bold text-black transition-colors hover:text-blue-600";
  const iconButtonClass = isDark
    ? "grid h-10 w-10 place-items-center rounded-full border border-[#334155] bg-[#111827] text-white transition-colors hover:bg-[#1f2937]"
    : "grid h-10 w-10 place-items-center rounded-full border border-[#e2e8f0] bg-gray-200 text-[#596273] transition-colors hover:bg-gray-300";
  const signInClass = isDark
    ? "hidden rounded-full border border-[#334155] bg-[#111827] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#1f2937] sm:inline-flex"
    : "hidden rounded-full bg-gray-200 px-4 py-2 text-[14px] font-semibold text-[#101114] transition-colors hover:bg-gray-300 sm:inline-flex";
  const signUpClass = isDark
    ? "rounded-full bg-[#3b82f6] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#2563eb] sm:px-5"
    : "rounded-full bg-[#1652f0] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#0c46df] sm:px-5";
  const searchInputClass = isDark
    ? "h-10 w-full rounded-full border border-[#3b82f6] bg-[#0b1220] px-4 text-[14px] text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)] outline-none"
    : "h-10 w-full rounded-full border border-[#1652f0] bg-white px-4 text-[14px] text-[#111827] shadow-[0_4px_14px_rgba(22,82,240,0.25)] outline-none";

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-[72px] w-full max-w-[1220px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-9">
          <Link to="/" aria-label="Coinbase home" className="shrink-0">
            <img src={logo} alt="Coinbase" className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {topNavLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={navTextClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={isSearchOpen}
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className={iconButtonClass}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className={`hidden overflow-hidden transition-all duration-300 lg:block ${
              isSearchOpen ? "w-[360px] xl:w-[500px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="search"
              placeholder="Search"
              className={searchInputClass}
            />
          </div>

          <div className="group relative hidden sm:block">
            <button
              type="button"
              aria-label="Language"
              className={iconButtonClass}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="white" stroke="#111111" strokeWidth="1.5" />
                <path d="M7.1 8.3c.8-.8 1.8-.7 2.6-.2.5.3 1 .4 1.4.1.6-.4 1.3-.2 1.6.5.3.6 0 1.2-.4 1.7-.4.5-.4 1.1 0 1.5.4.4.9.7.9 1.4 0 .9-.7 1.5-1.5 1.5-.7 0-1.1.5-1.6.9-.7.6-1.5.9-2.4.5-.8-.3-1.2-1.1-1.1-2 .1-.9-.2-1.6-.8-2.3-.8-.9-.9-2.6.3-3.6Z" fill="#111111" />
                <path d="M15.7 8.1c.4-.3.9-.2 1.2.2.4.4.9.5 1.4.6.4.1.7.4.7.8 0 .5-.3.8-.8.9-.4.1-.8.4-1 .8-.2.4-.5.7-.9.6-.4 0-.7-.3-.8-.7-.2-.7-.6-1.3-.5-2 0-.5.3-.9.7-1.2Z" fill="#111111" />
              </svg>
            </button>

            <div className="pointer-events-none absolute right-0 top-12 z-40 w-[320px] translate-y-1 rounded-xl border border-[#e6ebf3] bg-white p-4 opacity-0 shadow-[0_18px_36px_rgba(15,23,42,0.16)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-[15px] font-semibold text-[#111827]">Language and region</h3>

              <div className="relative mt-3">
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b95a7]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Search language"
                  className="h-10 w-full rounded-lg border border-[#d7deea] bg-white pl-10 pr-3 text-[14px] text-[#111827] outline-none focus:border-[#1652f0]"
                />
              </div>

              <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-1">
                {languageOptions.map((item) => (
                  <li key={`${item.language}-${item.region}`}>
                    <button
                      type="button"
                      className="w-full rounded-md px-2 py-2 text-left transition-colors hover:bg-[#f4f7fc]"
                    >
                      <span className="block text-[14px] font-medium text-[#111827]">{item.language}</span>
                      <span className="block text-[12px] text-[#6b7280]">{item.region}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {token ? (
            <>
              <Link to="/profile" className={signInClass}>My Profile</Link>
              <button onClick={handleLogout} className={signUpClass}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className={signInClass}>Sign in</Link>
              <Link to="/signup" className={signUpClass}>Sign up</Link>
            </>
          )}

          <button
            type="button"
            aria-label="Open menu"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
              isDark ? "text-white hover:bg-[#1f2937]" : "text-[#596273] hover:bg-[#f4f7fc]"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t transition-all duration-300 lg:hidden ${
          isDark ? "border-[#1f2937]" : "border-[#e9edf3]"
        } ${
          isSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-[1220px] px-4 py-4 sm:px-6">
          <div className={`origin-left transition-transform duration-300 ${isSearchOpen ? "scale-x-100" : "scale-x-0"}`}>
            <input
              type="search"
              placeholder="Search"
              className={`h-10 w-[48%] rounded-full border px-4 text-[14px] shadow-[0_4px_14px_rgba(22,82,240,0.25)] outline-none ${
                isDark
                  ? "border-[#3b82f6] bg-[#0b1220] text-white"
                  : "border-[#1652f0] bg-white text-[#111827]"
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;