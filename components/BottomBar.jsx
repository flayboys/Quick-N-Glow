"use client";

export default function BottomBar({
  onDownload,
  onReset,
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">

      <button
        onClick={onDownload}
        className="flex-1 rounded-2xl bg-[#8EA889] py-4 text-lg font-bold text-white transition hover:opacity-90"
      >
        📥 Download PNG
      </button>

      <button
        onClick={onReset}
        className="flex-1 rounded-2xl border border-red-300 bg-white py-4 text-lg font-bold text-red-600 transition hover:bg-red-50"
      >
        🗑 Reset
      </button>

    </div>
  );
}