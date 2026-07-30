// Satu-satunya sumber data treatment & template.
// Sebelumnya data ini didefinisikan dobel di TemplateManager.jsx dan
// TreatmentSelector.jsx — rawan tidak sinkron kalau salah satu diedit.

// Ukuran asli file template & koordinat bingkai putih (placeholder foto)
// di dalam desainnya, dideteksi langsung dari pixel PNG masing-masing
// (bukan tebakan). Kiri = before, kanan = after.
export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 1536;

export const treatments = [
  {
    id: "bright",
    name: "✨ Bright Boost",
    template: {
      id: 1,
      name: "Bright Template",
      image: "/templates/bright/bright1.webp",
      frame: "/templates/bright/bright1-frame.webp",
      before: { x: 59, y: 627, width: 407, height: 612 },
      after: { x: 551, y: 627, width: 412, height: 612 },
    },
  },
  {
    id: "clear",
    name: "🌿 Clear Boost",
    template: {
      id: 2,
      name: "Clear Template",
      image: "/templates/clear/clear1.webp",
      frame: "/templates/clear/clear1-frame.webp",
      before: { x: 63, y: 620, width: 404, height: 604 },
      after: { x: 553, y: 620, width: 409, height: 604 },
    },
  },
  {
    id: "prime",
    name: "💎 Prime Boost",
    template: {
      id: 3,
      name: "Prime Template",
      image: "/templates/prime/prime1.webp",
      frame: "/templates/prime/prime1-frame.webp",
      before: { x: 64, y: 616, width: 401, height: 614 },
      after: { x: 553, y: 616, width: 401, height: 614 },
    },
  },
];

// Label nama treatment, dipakai di pesan WhatsApp
export const treatmentLabels = treatments.reduce((acc, item) => {
  acc[item.id] = item.name.replace(/^\p{Extended_Pictographic}\s*/u, "");
  return acc;
}, {});

export function getTemplatesForTreatment(treatmentId) {
  const treatment = treatments.find((item) => item.id === treatmentId);
  return treatment ? [treatment.template] : [];
}

export function getDefaultTemplate() {
  return treatments[0]?.template;
}
