import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function Profile() {
  const { token, user, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) return;
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load profile");
        setProfile(data.user || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token, user]);

  function handleLogout() {
    setToken(null);
    setUser(null);
    navigate("/signin");
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate("/signin")} className="rounded-full bg-[#1652f0] px-6 py-2 text-sm font-semibold text-white">
          Sign in again
        </button>
      </div>
    );
  }

  const initial = profile?.name?.[0]?.toUpperCase() || "U";

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1652f0] text-2xl font-bold text-white">
            {initial}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{profile?.name || "Unknown"}</p>
            <p className="text-sm text-gray-500">{profile?.email || "No email"}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Full Name", value: profile?.name },
            { label: "Email Address", value: profile?.email },
            { label: "Account Type", value: profile?.role || "Personal" },
            { label: "Member Since", value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
              <p className="mt-1 text-base font-medium text-gray-800">{value || "—"}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/crypto/add")}
            className="rounded-full bg-[#1652f0] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0c46df]"
          >
            + Add Cryptocurrency
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
