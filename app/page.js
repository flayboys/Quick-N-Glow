"use client";

import { useRef, useState } from "react";

import Header from "@/components/Header";
import CustomerForm from "@/components/CustomerForm";
import TreatmentSelector from "@/components/TreatmentSelector";
import UploadPanel from "@/components/UploadPanel";
import EditorCanvas from "@/components/EditorCanvas";
import Toolbar from "@/components/Toolbar";
import TemplateManager from "@/components/TemplateManager";
import BottomBar from "@/components/BottomBar";
import WhatsappButton from "@/components/WhatsappButton";

import { exportImage } from "@/lib/exportImage";
import { getDefaultTemplate } from "@/lib/templates";

export default function Home() {
  const editorRef = useRef(null);

  // Customer
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Treatment
  const [selectedTreatment, setSelectedTreatment] = useState("bright");

  // Upload
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  // Editor
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Template
  const [selectedTemplate, setSelectedTemplate] = useState(
    getDefaultTemplate()
  );

  const handleReset = () => {
    setCustomerName("");
    setCustomerPhone("");

    setBeforeImage(null);
    setAfterImage(null);

    setZoom(100);
    setRotation(0);

    setSelectedTreatment("bright");
    setSelectedTemplate(getDefaultTemplate());
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Header />

      <div className="mx-auto max-w-7xl p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* LEFT */}
          <div className="space-y-5 lg:col-span-3">

            <CustomerForm
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
            />

            <TreatmentSelector
              selectedTreatment={selectedTreatment}
              setSelectedTreatment={setSelectedTreatment}
              setSelectedTemplate={setSelectedTemplate}
            />

            <UploadPanel
              beforeImage={beforeImage}
              setBeforeImage={setBeforeImage}
              afterImage={afterImage}
              setAfterImage={setAfterImage}
            />

          </div>

          {/* CENTER */}
          <div className="space-y-5 lg:col-span-6">

            <EditorCanvas
              ref={editorRef}
              beforeImage={beforeImage}
              afterImage={afterImage}
              template={selectedTemplate}
              zoom={zoom}
              rotation={rotation}
            />

            <Toolbar
              zoom={zoom}
              setZoom={setZoom}
              rotation={rotation}
              setRotation={setRotation}
            />

            <BottomBar
              onDownload={() => exportImage(editorRef.current)}
              onReset={handleReset}
            />

            <WhatsappButton
              customerName={customerName}
              customerPhone={customerPhone}
              selectedTreatment={selectedTreatment}
            />

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3">

            <TemplateManager
              selectedTreatment={selectedTreatment}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />

          </div>

        </div>
      </div>
    </main>
  );
}