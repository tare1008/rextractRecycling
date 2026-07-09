import React, { useState } from "react";
import { RecyclePlant } from "../types";
import { INITIAL_PLANTS } from "../mockData";
import { 
  Shield, 
  Activity, 
  Settings, 
  Wrench, 
  Database, 
  Zap, 
  ArrowRight, 
  Award,
  Sparkles,
  RefreshCw,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";
import WorkflowGallery from "./WorkflowGallery.tsx";

export default function PlantsTab() {
  const [plants, setPlants] = useState<RecyclePlant[]>(INITIAL_PLANTS);
  const [selectedPlantId, setSelectedPlantId] = useState<string>("plant-1");

  const selectedPlant = plants.find(p => p.id === selectedPlantId) || plants[0];

  // Simulated live stats trigger to demonstrate interactivity
  const togglePlantStatus = (id: string) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatusMap: Record<RecyclePlant["status"], RecyclePlant["status"]> = {
          "Operational": "Maintenance",
          "Maintenance": "Under Expansion",
          "Under Expansion": "Operational"
        };
        return {
          ...p,
          status: nextStatusMap[p.status],
          efficiencyRate: parseFloat((p.efficiencyRate + (Math.random() * 2 - 1)).toFixed(1))
        };
      }
      return p;
    }));
  };

  // Polyethylene / Polypropylene / PET recycle pathways data
  const pathways = [
    {
      step: "01",
      title: "Interception & Baling",
      desc: "Waste gathered from our 150+ Pune corporate pickup sites and IT parks is sorted at source, compressed into 350kg dense bales, and safely dispatched to our plants.",
      duration: "Day 1"
    },
    {
      step: "02",
      title: "Optical Sorting & De-labeling",
      desc: "Our automated near-infrared (NIR) optical sorting sensors separate PET, HDPE, and PP polymers in milliseconds by reading specific light spectrum signatures.",
      duration: "Instantaneous"
    },
    {
      step: "03",
      title: "Hot shred friction washing",
      desc: "Plastics are crushed into 12mm flakes and processed with safe thermal washing agents to strip adhesives, labels, organic residues, and metal elements completely.",
      duration: "45 Minutes"
    },
    {
      step: "04",
      title: "Devolatilizing & Compounding",
      desc: "Clean dry flakes are heated inside high-vacuum twin-screw extruders. High-temperature filtration removes gaseous or volatile impurities.",
      duration: "1.5 Hours"
    },
    {
      step: "05",
      title: "Pelletizing & Lab Audit",
      desc: "Molten polymers are extruded as cooling strands, cut into precise 3mm spherical pellets, and run through mechanical tests (Melt Flow Index, IV Testing) for EPR certification.",
      duration: "Continuous"
    },
  ];

  return (
    <div className="space-y-12">
      {/* Visual Header */}
      <div className="max-w-3xl">
        <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">State-of-the-Art Recovery</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-gray-800">
          Our Advanced Polymer Recycling Facilities (Maharashtra)
        </h2>
        <p className="text-xs md:text-sm text-slate-gray-500 mt-2 font-sans">
          Rextract operates Maharashtra's most technologically integrated polymer conversion assets. Our facilities turn post-consumer trash into food-contact safe, high-purity industrial grade resins.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Plant Cards / Toggle selectors */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-gray-400 font-mono mb-2">
            Active Processing Centers
          </h3>

          <div className="flex flex-col gap-4">
            {plants.map((plant) => {
              const isSelected = plant.id === selectedPlantId;
              return (
                <div
                  key={plant.id}
                  onClick={() => setSelectedPlantId(plant.id)}
                  className={`relative p-5 rounded-3xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white border-forest-500 shadow-md ring-1 ring-forest-500/20"
                      : "bg-slate-50/50 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-gray-800 text-sm sm:text-base">{plant.name}</h4>
                      <p className="text-[11px] text-slate-gray-400 font-mono">{plant.location}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      plant.status === "Operational" ? "bg-emerald-100 text-emerald-800" :
                      plant.status === "Under Expansion" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        plant.status === "Operational" ? "bg-emerald-500" :
                        plant.status === "Under Expansion" ? "bg-blue-500" : "bg-amber-500"
                      }`}></span>
                      {plant.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-gray-500 line-clamp-2 mt-2 leading-relaxed font-sans font-light">
                    {plant.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5 mt-3 text-center text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-gray-400 block uppercase">Cap</span>
                      <strong className="text-slate-gray-700 font-sans font-bold text-sm">{plant.dailyCapacity} t/d</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-gray-400 block uppercase">Efficiency</span>
                      <strong className="text-slate-gray-700 font-sans font-bold text-sm">{plant.efficiencyRate}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-gray-400 block uppercase">Launched</span>
                      <strong className="text-slate-gray-700 font-sans font-bold text-sm">{plant.launchedYear}</strong>
                    </div>
                  </div>

                  {/* Passive Telemetry Indicator */}
                  <div className="mt-4 flex justify-between items-center text-[10px] text-slate-gray-400 font-sans border-t border-slate-100 pt-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Continuous Telemetry Stream
                    </span>
                    <span className="text-slate-gray-500 font-semibold uppercase tracking-wider font-mono text-[9px]">
                      Node Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Deep Telemetry and Processes Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-wider font-bold text-forest-800 bg-forest-50 border border-forest-100 px-2.5 py-1 rounded-md uppercase">
                Active Telemetry Node
              </span>
              <span className="text-xs text-slate-gray-400 font-medium font-sans">Weighbridge & Sorting Systems Live</span>
            </div>
            <h3 className="text-xl font-bold text-slate-gray-800 tracking-tight">
              {selectedPlant.name}
            </h3>
            <p className="text-xs text-slate-gray-500 mt-1 font-mono">{selectedPlant.type}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex gap-3">
              <div className="bg-forest-100 p-2.5 rounded-xl text-forest-800 h-10 w-10 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-gray-400 font-mono uppercase block">Polymer Classifications</span>
                <p className="text-xs text-slate-gray-700 leading-normal font-medium mt-1 font-sans">
                  PET (Polyethylene Terephthalate), HDPE, LDPE, Polypropylene PP
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex gap-3">
              <div className="bg-forest-100 p-2.5 rounded-xl text-forest-800 h-10 w-10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-gray-400 font-mono uppercase block">Regulatory Accreditations</span>
                <p className="text-xs text-slate-gray-700 leading-normal font-medium mt-1 font-sans">
                  MPCB Approved, Central Pollution Control Board (CPCB) EPR Authorized
                </p>
              </div>
            </div>
          </div>

          {/* Plant Processes Bullets */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-gray-400 font-mono">
              In-facility Treatment Routines
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPlant.processes.map((proc, i) => (
                <span 
                  key={i} 
                  className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1 rounded-xl text-xs font-medium font-sans"
                >
                  ⚙️ {proc}
                </span>
              ))}
            </div>

            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 mt-6 flex gap-3">
              <Award className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-gray-600 leading-relaxed font-sans">
                <strong className="text-slate-gray-800 font-semibold block">EPR (Extended Producer Responsibility) Compliance</strong>
                Rextract generates fully traceable batch certificates for all recycled polymers processed at {selectedPlant.name}. This documentation satisfies Section 135 Indian ESG rules and MPCB audits.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polymer Recycle Pathway Flowchart */}
      <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200">
        <div className="max-w-2xl mb-8">
          <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">Traceable Loop</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-gray-800 tracking-tight">
            Our Closed-Loop Polyethylene & PET Recycling Initiatives
          </h3>
          <p className="text-xs text-slate-gray-500 font-sans mt-1">
            A step-by-step visual summary of how post-consumer plastics are fully de-polymerized and re-stabilized into commercial resin materials within Pune.
          </p>
        </div>

        {/* Horizontal Timeline steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {pathways.map((path, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between relative shadow-2xs hover:border-forest-400 transition-all">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-black text-forest-500/15 font-mono">{path.step}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono tracking-wider">
                    {path.duration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-gray-800 mb-1 leading-snug font-sans">
                  {path.title}
                </h4>
                <p className="text-[11px] text-slate-gray-500 leading-relaxed font-normal font-sans font-light">
                  {path.desc}
                </p>
              </div>

              {index < 4 && (
                <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Workflow Gallery */}
      <WorkflowGallery />
    </div>
  );
}
