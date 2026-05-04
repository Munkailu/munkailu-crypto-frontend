import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function AddCrypto() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    price: "",
    change24h: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/crypto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          symbol: form.symbol.toUpperCase(),
          price: parseFloat(form.price),
          change24h: parseFloat(form.change24h),
          image: form.image,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add cryptocurrency");
      setSuccess(`"${form.name}" added successfully!`);
      setForm({ name: "", symbol: "", price: "", change24h: "", image: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "name", label: "Coin Name", placeholder: "e.g. Bitcoin", type: "text" },
    { name: "symbol", label: "Symbol", placeholder: "e.g. BTC", type: "text" },
    { name: "price", label: "Price (USD)", placeholder: "e.g. 62000", type: "number" },
    { name: "change24h", label: "24h Change (%)", placeholder: "e.g. 2.5 or -1.3", type: "number" },
    { name: "image", label: "Image URL", placeholder: "https://...", type: "url" },
  ];

  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <button
        onClick={() => navigate("/profile")}
        className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        ← Back to Profile
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Add New Cryptocurrency</h1>
      <p className="mt-1 text-sm text-gray-500">Submits to POST /crypto on the backend API.</p>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        {fields.map(({ name, label, placeholder, type }) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              step={type === "number" ? "any" : undefined}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-gray-300 px-5 py-3 text-base text-gray-800 outline-none transition-colors focus:border-[#1652f0] focus:ring-1 focus:ring-[#1652f0]"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#1652f0] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0c46df] disabled:opacity-60"
        >
          {loading ? "Adding…" : "Add Cryptocurrency"}
        </button>
      </form>
    </section>
  );
}

export default AddCrypto;
