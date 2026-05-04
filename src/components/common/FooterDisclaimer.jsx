function FooterDisclaimer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
      <p className="font-semibold text-gray-700">🎓 Demo Project – Crypto App by Munkailu</p>
      <p className="mt-1">
        This is a <strong>student demo project</strong> created for educational purposes only.
        It is not a real cryptocurrency exchange. Please{" "}
        <strong>do not enter real personal information, passwords, or financial data.</strong>
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Not affiliated with Coinbase, Inc. &bull; Built as part of a Full-Stack Integration
        assignment &bull; &copy; {new Date().getFullYear()} Munkailu
      </p>
    </footer>
  );
}

export default FooterDisclaimer;
