"use client";

import { getTemplatesForTreatment } from "@/lib/templates";

export default function TemplateManager({
  selectedTreatment,
  selectedTemplate,
  setSelectedTemplate,
}) {
  const data = getTemplatesForTreatment(selectedTreatment);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg">

      <h2 className="mb-5 text-xl font-bold">
        🎨 Pilih Template
      </h2>

      <div className="space-y-4">

        {data.map((item) => (

          <div
            key={item.id}
            onClick={() => setSelectedTemplate(item)}
            className={`cursor-pointer overflow-hidden rounded-2xl border transition-all hover:shadow-lg ${
              selectedTemplate?.id === item.id
                ? "border-[#8EA889] ring-2 ring-[#8EA889]"
                : "border-gray-200"
            }`}
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full object-cover"
            />

            <div className="p-3">

              <h3 className="font-semibold">
                {item.name}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
