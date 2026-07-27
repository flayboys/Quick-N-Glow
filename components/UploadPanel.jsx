"use client";

import ImageUpload from "./ImageUpload";

export default function UploadPanel({
  beforeImage,
  setBeforeImage,
  afterImage,
  setAfterImage,
}) {
  return (
    <div className="space-y-5">

      <ImageUpload
        title="📷 BEFORE"
        image={beforeImage}
        setImage={setBeforeImage}
      />

      <ImageUpload
        title="✨ AFTER"
        image={afterImage}
        setImage={setAfterImage}
      />

    </div>
  );
}