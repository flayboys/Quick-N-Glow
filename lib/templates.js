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
      before: { x: 59, y: 627, width: 406, height: 611 },
      after: { x: 551, y: 627, width: 411, height: 611 },
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
      before: { x: 62, y: 619, width: 406, height: 606 },
      after: { x: 552, y: 619, width: 410, height: 606 },
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
      before: { x: 62, y: 643, width: 405, height: 589 },
      after: { x: 552, y: 643, width: 403, height: 589 },
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
