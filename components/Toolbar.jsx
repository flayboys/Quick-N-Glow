"use client";

export default function Toolbar({
  zoom,
  setZoom,
  rotation,
  setRotation,
}) {
  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold text-[#2E2E2E]">
        🎛 Editor Tools
      </h2>

      {/* Zoom */}

      <div className="mb-6">

        <div className="mb-2 flex justify-between">

          <span className="font-medium">
            Zoom
          </span>

          <span className="text-[#8EA889] font-bold">
            {zoom}%
          </span>

        </div>

        <input
          type="range"
          min="50"
          max="200"
          value={zoom}
          onChange={(e)=>setZoom(Number(e.target.value))}
          className="w-full accent-[#8EA889]"
        />

      </div>

      {/* Rotation */}

      <div className="mb-6">

        <div className="mb-2 flex justify-between">

          <span className="font-medium">
            Rotate
          </span>

          <span className="text-[#8EA889] font-bold">
            {rotation}°
          </span>

        </div>

        <input
          type="range"
          min="-180"
          max="180"
          value={rotation}
          onChange={(e)=>setRotation(Number(e.target.value))}
          className="w-full accent-[#8EA889]"
        />

      </div>

      <button
        onClick={()=>{
          setZoom(100);
          setRotation(0);
        }}
        className="w-full rounded-xl bg-[#8EA889] py-3 font-semibold text-white transition hover:opacity-90"
      >
        Reset
      </button>

    </div>
  );
}