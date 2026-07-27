"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#2E2E2E] lg:text-3xl">
            Quick N Glow
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Before & After Generator
          </p>
        </div>

        <div className="rounded-full bg-[#8EA889] px-4 py-2 text-sm font-semibold text-white shadow">
          dr. Yulia Beauty Center
        </div>

      </div>
    </header>
  );
}