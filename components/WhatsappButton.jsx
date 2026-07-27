"use client";

import { treatmentLabels } from "@/lib/templates";

// Mengubah format nomor lokal (mis. 0812xxxx) ke format internasional
// yang dibutuhkan wa.me (62812xxxx), supaya tetap terkirim walau staff
// mengetik dengan awalan 0.
function formatPhoneForWhatsapp(phone) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

export default function WhatsappButton({
  customerName,
  customerPhone,
  selectedTreatment,
}) {
  const sendWhatsapp = () => {
    if (!customerPhone) {
      alert("Nomor WhatsApp belum diisi");
      return;
    }

    const treatmentName = treatmentLabels[selectedTreatment] || "";

    const message = `Halo Kak ${customerName || ""} 😊

Terima kasih telah melakukan treatment *${treatmentName}* di Quick N Glow.

Berikut hasil Before & After treatment Kakak.

Semoga hasilnya memuaskan ❤️`;

    window.open(
      `https://wa.me/${formatPhoneForWhatsapp(customerPhone)}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={sendWhatsapp}
      className="w-full rounded-xl bg-green-600 py-4 text-white font-semibold hover:bg-green-700 transition"
    >
      📲 Kirim WhatsApp
    </button>
  );
}
