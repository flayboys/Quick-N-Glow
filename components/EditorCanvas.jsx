"use client";

import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Stage,
  Layer,
  Rect,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/templates";

// Menghitung area crop (mirip CSS object-fit: cover) supaya foto yang
// diupload otomatis mengisi penuh slot template — dipotong & dipusatkan
// sesuai rasio slot, tanpa gepeng/melar dan tanpa perlu digeser manual.
function getCoverCrop(image, boxWidth, boxHeight) {
  if (!image) return null;

  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight || !boxWidth || !boxHeight) return null;

  const imageRatio = imageWidth / imageHeight;
  const boxRatio = boxWidth / boxHeight;

  let cropWidth = imageWidth;
  let cropHeight = imageHeight;

  if (imageRatio > boxRatio) {
    // Foto lebih lebar dari slot -> potong kiri-kanan
    cropHeight = imageHeight;
    cropWidth = imageHeight * boxRatio;
  } else {
    // Foto lebih tinggi dari slot -> potong atas-bawah
    cropWidth = imageWidth;
    cropHeight = imageWidth / boxRatio;
  }

  return {
    x: (imageWidth - cropWidth) / 2,
    y: (imageHeight - cropHeight) / 2,
    width: cropWidth,
    height: cropHeight,
  };
}

function EditableImage({
  src,
  defaultX,
  defaultY,
  width,
  height,
  zoom,
  rotation,
}) {
  const [image] = useImage(src);

  const [position, setPosition] = useState({
    x: defaultX,
    y: defaultY,
  });

  useEffect(() => {
    setPosition({
      x: defaultX,
      y: defaultY,
    });
  }, [src, defaultX, defaultY]);

  if (!image) return null;

  const crop = getCoverCrop(image, width, height);

  return (
    <KonvaImage
      image={image}
      crop={crop || undefined}
      x={position.x}
      y={position.y}
      width={width}
      height={height}
      draggable
      scaleX={zoom / 100}
      scaleY={zoom / 100}
      rotation={rotation}
      onDragEnd={(e) =>
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        })
      }
    />
  );
}

// Ukuran acuan kanvas = ukuran asli file template (1024x1536, potret).
// Posisi slot before/after di lib/templates.js didefinisikan dalam
// koordinat ukuran ini, lalu diskalakan sesuai lebar kanvas yang
// sebenarnya di layar (responsif).
const BASE_WIDTH = CANVAS_WIDTH;
const BASE_HEIGHT = CANVAS_HEIGHT;

const DEFAULT_SLOTS = {
  before: { x: 58, y: 626, width: 408, height: 614 },
  after: { x: 550, y: 626, width: 414, height: 614 },
};

const EditorCanvas = forwardRef(function EditorCanvas(
  {
    beforeImage,
    afterImage,
    template,
    zoom,
    rotation,
  },
  ref
) {
  // "frame" adalah versi template dengan area before/after dibuat
  // transparan (bolong persis mengikuti bentuk bingkai, termasuk sudut
  // melengkung). Ini dirender PALING ATAS, di depan foto, supaya foto
  // terlihat benar-benar "masuk" ke dalam bingkai.
  const [frameOverlay] = useImage(
    template?.frame || template?.image || "/templates/default.png"
  );

  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [stageSize, setStageSize] = useState({
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
  });

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;

      const width = Math.min(
        containerRef.current.offsetWidth,
        BASE_WIDTH
      );

      setStageSize({
        width,
        height: width * (BASE_HEIGHT / BASE_WIDTH),
      });
    };

    resize();

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  // Ekspos fungsi export lewat ref, memakai method bawaan Konva
  // (stage.toDataURL) alih-alih men-screenshot DOM dengan html-to-image.
  // Ini jauh lebih akurat karena preview memang dirender di <canvas>.
  useImperativeHandle(
    ref,
    () => ({
      toDataURL: (options) => stageRef.current?.toDataURL(options),
    }),
    []
  );

  const scale = stageSize.width / BASE_WIDTH;

  const beforeSlot = template?.before || DEFAULT_SLOTS.before;
  const afterSlot = template?.after || DEFAULT_SLOTS.after;

  return (
    <div
      ref={wrapperRef}
      className="rounded-3xl bg-white p-5 shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2E2E2E]">
          🖼 Live Preview
        </h2>

        <span className="rounded-full bg-[#8EA889] px-4 py-2 text-sm font-semibold text-white">
          Quick N Glow
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-2xl border bg-[#ECECEC]"
      >
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
        >
          <Layer>

            {/* Latar putih polos di belakang, jaga-jaga kalau foto
                belum diupload biar tidak transparan aneh */}
            <Rect
              x={0}
              y={0}
              width={stageSize.width}
              height={stageSize.height}
              fill="#ffffff"
            />

            {beforeImage && (
              <EditableImage
                src={beforeImage}
                defaultX={beforeSlot.x * scale}
                defaultY={beforeSlot.y * scale}
                width={beforeSlot.width * scale}
                height={beforeSlot.height * scale}
                zoom={zoom}
                rotation={rotation}
              />
            )}

            {afterImage && (
              <EditableImage
                src={afterImage}
                defaultX={afterSlot.x * scale}
                defaultY={afterSlot.y * scale}
                width={afterSlot.width * scale}
                height={afterSlot.height * scale}
                zoom={zoom}
                rotation={rotation}
              />
            )}

            {/* Bingkai template digambar PALING ATAS, menutupi semua
                bagian kecuali lubang before/after — jadi foto terlihat
                masuk pas ke dalam bingkai */}
            {frameOverlay && (
              <KonvaImage
                image={frameOverlay}
                width={stageSize.width}
                height={stageSize.height}
                listening={false}
              />
            )}

          </Layer>
        </Stage>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Geser foto untuk mengatur posisi sebelum di-download.
      </p>
    </div>
  );
});

export default EditorCanvas;
