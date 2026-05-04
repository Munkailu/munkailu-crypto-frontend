import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function CryptoCard({ coin }) {
  const positive = parseFloat(coin.change24h) >= 0;
  return (
    <Link
      to={`/assets/${coin.symbol}`}
      className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        {coin.image ? (
          <img src={coin.image} alt={coin.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1652f0] text-xs font-bold text-white">
            {coin.symbol?.slice(0, 2)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{coin.name}</p>
          <p className="text-xs text-gray-400">{coin.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          ${parseFloat(coin.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-sm font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
          {positive ? "+" : ""}{parseFloat(coin.change24h).toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-[#1652f0] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function Explore() {
  const [tab, setTab] = useState("all"); // "all" | "gainers" | "new"
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const endpoints = {
    all: `${API_BASE}/crypto`,
    gainers: `${API_BASE}/crypto/gainers`,
    new: `${API_BASE}/crypto/new`,
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(endpoints[tab])
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch crypto data");
        return r.json();
      })
      .then((data) => {
        // Backend may return { cryptos: [...] } or directly an array
        setCoins(Array.isArray(data) ? data : data.cryptos || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <section className="mx-auto w-full max-w-[1220px] px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-gray-900">Explore</h1>
      <p className="mt-2 text-lg text-gray-500">Browse tradable crypto assets and market data.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <TabButton label="All Crypto" active={tab === "all"} onClick={() => setTab("all")} />
        <TabButton label="Top Gainers" active={tab === "gainers"} onClick={() => setTab("gainers")} />
        <TabButton label="New Listings" active={tab === "new"} onClick={() => setTab("new")} />
      </div>

      <div className="mt-8">
        {loading && <p className="text-center text-gray-400 py-12">Loading…</p>}
        {error && <p className="text-center text-red-500 py-12">{error}</p>}
        {!loading && !error && coins.length === 0 && (
          <p className="text-center text-gray-400 py-12">No cryptocurrencies found.</p>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coins.map((coin) => (
            <CryptoCard key={coin._id || coin.symbol} coin={coin} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Explore;
