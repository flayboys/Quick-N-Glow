"use client";

import { treatments } from "@/lib/templates";

export default function TreatmentSelector({
  selectedTreatment,
  setSelectedTreatment,
  setSelectedTemplate,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg">

      <h2 className="mb-4 text-lg font-bold">
        Treatment
      </h2>

      <div className="space-y-3">

        {treatments.map((item) => (

          <button
            key={item.id}
            onClick={() => {
              setSelectedTreatment(item.id);
              setSelectedTemplate(item.template);
            }}
            className={`w-full rounded-xl border p-3 text-left transition ${
              selectedTreatment === item.id
                ? "border-[#8EA889] bg-[#8EA889] text-white"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            {item.name}
          </button>

        ))}

      </div>

    </div>
  );
}
