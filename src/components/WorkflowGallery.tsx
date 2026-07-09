import React, { useState } from "react";
import { 
  Play, 
  Image as ImageIcon, 
  Video, 
  X, 
  Maximize2, 
  Eye, 
  Settings, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  Gauge
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id: string;
  title: string;
  category: "machinery" | "collection" | "quality";
  type: "image" | "video";
  description: string;
  duration?: string; // for videos
  resolution?: string; // for images
  telemetry: {
    label: string;
    value: string;
  };
  details: string[];
  gradient: string;
  icon: React.ElementType;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "item-1",
    title: "Continuous Hot Friction Washer",
    category: "machinery",
    type: "video",
    duration: "2:15 Min Video",
    description: "High-temperature washing system stripping labels and residual adhesives from crushed PET flakes.",
    telemetry: { label: "Water Temp", value: "88°C" },
    gradient: "from-amber-500/10 via-orange-500/5 to-slate-950",
    icon: Settings,
    details: [
      "Operates with safe biodegradable surfactants",
      "99.4% efficacy in glue residue extraction",
      "Closed-loop water filtration and heating"
    ]
  },
  {
    id: "item-2",
    title: "Near-Infrared (NIR) Optical Sorter",
    category: "machinery",
    type: "image",
    resolution: "4K Ultra-Res Schematic",
    description: "Spectroscopic sorting node that identifies and separates distinct polymer streams in milliseconds.",
    telemetry: { label: "Scan Speed", value: "320 flakes/sec" },
    gradient: "from-blue-600/10 via-indigo-500/5 to-slate-950",
    icon: Gauge,
    details: [
      "High-speed air nozzle physical ejection",
      "Sorts PET, HDPE, PP and non-plastics",
      "Real-time spectral analysis dashboard"
    ]
  },
  {
    id: "item-3",
    title: "Smart Corporate Pickup Dispatch",
    category: "collection",
    type: "video",
    duration: "1:45 Min Video",
    description: "Collection vehicles equipped with automated weighing scales and direct API integration.",
    telemetry: { label: "Active Fleet", value: "14 Trucks" },
    gradient: "from-emerald-500/10 via-teal-500/5 to-slate-950",
    icon: Truck,
    details: [
      "Dynamic multi-tenant route planning",
      "Digital weighbridge invoice generation",
      "CO2 emissions offset tracking per pickup"
    ]
  },
  {
    id: "item-4",
    title: "Twin-Screw Devolatilizing Extruder",
    category: "machinery",
    type: "image",
    resolution: "High-Res Plant Photo",
    description: "Melt compounding machine converting dry flakes into premium pellets under high vacuum.",
    telemetry: { label: "Vacuum Level", value: "0.08 mbar" },
    gradient: "from-rose-500/10 via-purple-500/5 to-slate-950",
    icon: Settings,
    details: [
      "Triple degasification ventilation zones",
      "Continuous melt pressure monitoring",
      "Fitted with 40-micron screen changers"
    ]
  },
  {
    id: "item-5",
    title: "Dense Polymer Baling Press",
    category: "collection",
    type: "image",
    resolution: "High-Res Logistics Photo",
    description: "Heavy compression hydraulics processing incoming loose wrappers and packaging into dense bales.",
    telemetry: { label: "Press Force", value: "120 Tonnes" },
    gradient: "from-cyan-500/10 via-blue-500/5 to-slate-950",
    icon: Truck,
    details: [
      "Reduces loose waste volume by up to 90%",
      "Generates uniform 350kg bundles",
      "Facilitates efficient storage and transport"
    ]
  },
  {
    id: "item-6",
    title: "Analytical Quality & Melt Flow Audit",
    category: "quality",
    type: "video",
    duration: "3:10 Min Walkthrough",
    description: "In-house lab audit confirming compliance, Melt Flow Index (MFI), and food-contact certification.",
    telemetry: { label: "Testing Acc.", value: "99.98%" },
    gradient: "from-purple-500/10 via-indigo-500/5 to-slate-950",
    icon: ShieldCheck,
    details: [
      "Melt Flow Index (MFI) standardized tracking",
      "FDA/EPR packaging audit logs",
      "Traceability record tied to batch QR code"
    ]
  }
];

export default function WorkflowGallery() {
  const [activeTab, setActiveTab] = useState<"all" | "machinery" | "collection" | "quality">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">
            Visual Proof
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-gray-800 tracking-tight">
            Plant Machinery & Workflow Gallery
          </h3>
          <p className="text-xs text-slate-gray-500 font-sans mt-1">
            Explore active high-definition snapshots and video placeholders of our recovery setups. From optical grading systems to corporate fleets.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-2xl text-[11px] font-mono font-medium text-slate-600 shrink-0 self-start md:self-auto">
          {[
            { id: "all", label: "ALL VIEWS" },
            { id: "machinery", label: "MACHINERY" },
            { id: "collection", label: "WORKFLOWS" },
            { id: "quality", label: "QA LAB" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-forest-900 shadow-2xs font-bold"
                  : "hover:text-slate-800 hover:bg-white/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-72"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

              {/* Decorative Tech Grid Lines inside Card */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

              {/* Card Header & Badges */}
              <div className="relative z-10 p-5 flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-xl text-white">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {item.category === "machinery" ? "Machinery" : item.category === "collection" ? "Workflow" : "QA Lab"}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    {item.type === "video" ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                    {item.type === "video" ? "VIDEO" : "PHOTO"}
                  </span>
                </div>
              </div>

              {/* Center Play Button Overlay for Videos */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center relative z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-emerald-500/80 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Card Footer (Title, description, metrics) */}
              <div className="relative z-10 p-5 pt-0 mt-auto bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 block uppercase mb-0.5">
                  {item.telemetry.label}: {item.telemetry.value}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Hover CTA Indicator */}
                <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-mono font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{item.type === "video" ? "PLAY DEMO" : "VIEW DETAILED SPEC"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Video Player Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                    {selectedItem.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedItem.type === "video" ? selectedItem.duration : selectedItem.resolution}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Media Visualizer Box */}
              <div className="bg-black aspect-video relative flex items-center justify-center overflow-hidden border-b border-slate-800">
                {/* Custom Styled Visual Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedItem.gradient} opacity-50`} />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Big Visual Indicator */}
                <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                  {selectedItem.type === "video" ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
                        <Play className="w-7 h-7 fill-emerald-400 ml-1" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-100 uppercase tracking-widest font-mono">Simulated Video Stream</p>
                        <p className="text-xs text-slate-400 mt-1">Footage from {selectedItem.title} active line</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-100 uppercase tracking-widest font-mono">Analytical Photo Capture</p>
                        <p className="text-xs text-slate-400 mt-1">High-resolution audit documentation</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Corner Telemetry Overlay in Viewer */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5 backdrop-blur-md text-xs font-mono">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">{selectedItem.telemetry.label}</span>
                    <span className="font-bold text-emerald-400">{selectedItem.telemetry.value}</span>
                  </div>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{selectedItem.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans font-light">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] font-mono">
                    Specifications & Key Features
                  </h5>
                  <ul className="space-y-2">
                    {selectedItem.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-slate-300 font-sans">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
