"use client";

import { useRef } from "react";
import { FaCamera, FaTrash, FaSyncAlt } from "react-icons/fa";

export default function ImageUpload({
  title,
  image,
  setImage,
}) {
  const inputRef = useRef(null);

  const openFile = () => {
    inputRef.current?.click();
  };

  const changeFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

      <div className="border-b bg-[#8EA889] px-5 py-4">

        <h2 className="font-bold text-white">
          {title}
        </h2>

      </div>

      <div className="p-5">

        <button
          type="button"
          onClick={openFile}
          className="group flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#8EA889] bg-[#F8F6F2] transition hover:bg-[#EFE8DE]"
        >

          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-center">

              <FaCamera
                size={45}
                className="mx-auto mb-4 text-[#8EA889]"
              />

              <p className="text-lg font-semibold text-[#2E2E2E]">
                Upload Foto
              </p>

              <p className="mt-1 text-sm text-gray-500">
                JPG, PNG atau WEBP
              </p>

            </div>
          )}

        </button>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={changeFile}
        />

        {image && (
          <div className="mt-4 flex gap-3">

            <button
              onClick={openFile}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8EA889] py-3 font-semibold text-white transition hover:opacity-90"
            >
              <FaSyncAlt />
              Ganti Foto
            </button>

            <button
              onClick={removeImage}
              className="flex items-center justify-center rounded-xl bg-red-500 px-5 text-white transition hover:bg-red-600"
            >
              <FaTrash />
            </button>

          </div>
        )}

      </div>

    </div>
  );
}