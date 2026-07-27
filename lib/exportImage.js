// Sebelumnya export dilakukan dengan html-to-image (screenshot DOM),
// padahal preview-nya adalah <canvas> dari Konva. Kombinasi itu sering
// menghasilkan gambar kosong/blur. Sekarang export langsung memakai
// method bawaan Konva (stage.toDataURL) yang diekspos lewat ref
// EditorCanvas.
export async function exportImage(editorHandle) {
  if (!editorHandle || typeof editorHandle.toDataURL !== "function") {
    alert("Editor belum siap.");
    return;
  }

  try {
    const dataUrl = editorHandle.toDataURL({
      pixelRatio: 3,
      mimeType: "image/png",
    });

    const link = document.createElement("a");

    const now = new Date();

    const fileName = `Quick-N-Glow-${now
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.png`;

    link.download = fileName;
    link.href = dataUrl;
    link.click();

  } catch (err) {
    console.error(err);
    alert("Gagal mengunduh gambar.");
  }
}
