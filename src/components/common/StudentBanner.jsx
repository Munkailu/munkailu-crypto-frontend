function StudentBanner() {
  return (
    <div
      role="alert"
      className="w-full bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-amber-900"
    >
      ⚠️ This is a <strong>student project</strong> built by Munkailu. It is{" "}
      <strong>not affiliated with, endorsed by, or connected to Coinbase, Inc.</strong>{" "}
      in any way. Do not enter real personal or financial information.
    </div>
  );
}

export default StudentBanner;
