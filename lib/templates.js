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
      image: "/templates/bright/bright1.png",
      frame: "/templates/bright/bright1-frame.png",
      before: { x: 58, y: 626, width: 408, height: 614 },
      after: { x: 550, y: 626, width: 414, height: 614 },
    },
  },
  {
    id: "clear",
    name: "🌿 Clear Boost",
    template: {
      id: 2,
      name: "Clear Template",
      image: "/templates/clear/clear1.png",
      frame: "/templates/clear/clear1-frame.png",
      before: { x: 62, y: 600, width: 399, height: 585 },
      after: { x: 546, y: 601, width: 405, height: 584 },
    },
  },
  {
    id: "prime",
    name: "💎 Prime Boost",
    template: {
      id: 3,
      name: "Prime Template",
      image: "/templates/prime/prime1.png",
      frame: "/templates/prime/prime1-frame.png",
      before: { x: 64, y: 602, width: 421, height: 612 },
      after: { x: 537, y: 602, width: 421, height: 612 },
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
