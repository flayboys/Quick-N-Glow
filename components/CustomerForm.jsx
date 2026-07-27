"use client";

export default function CustomerForm({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">

      <h2 className="mb-4 text-lg font-bold">
        👤 Data Customer
      </h2>

      <div className="space-y-4">

        <div>

          <label className="mb-1 block text-sm font-medium">
            Nama Customer
          </label>

          <input
            type="text"
            placeholder="Contoh : Siti Aisyah"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#8EA889]"
          />

        </div>

        <div>

          <label className="mb-1 block text-sm font-medium">
            Nomor WhatsApp
          </label>

          <input
            type="tel"
            placeholder="62812xxxxxxxx"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#8EA889]"
          />

          <p className="mt-2 text-xs text-gray-500">
            Gunakan format 628xxxxxxxx tanpa tanda +
          </p>

        </div>

      </div>

    </div>
  );
}