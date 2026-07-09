import React, { useState, useMemo } from "react";
import { WASTE_EMISSION_FACTORS } from "../mockData";
import { 
  Leaf, 
  Droplets, 
  Trees, 
  Scale
} from "lucide-react";

export default function ReportingTab() {
  // 1. ESG Calculator State
  const [calcPlastic, setCalcPlastic] = useState("450");
  const [calcOrganic, setCalcOrganic] = useState("200");
  const [calcPaper, setCalcPaper] = useState("350");
  const [calcMetal, setCalcMetal] = useState("100");
  const [calcGlass, setCalcGlass] = useState("50");
  const [calcEWaste, setCalcEWaste] = useState("40");

  // Live impact calculations based on input factors
  const computedImpacts = useMemo(() => {
    const weights: Record<string, number> = {
      Plastic: (parseFloat(calcPlastic) || 0) / 1000, // convert kg to tonnes
      Organic: (parseFloat(calcOrganic) || 0) / 1000,
      Paper: (parseFloat(calcPaper) || 0) / 1000,
      Metal: (parseFloat(calcMetal) || 0) / 1000,
      Glass: (parseFloat(calcGlass) || 0) / 1000,
      "E-waste": (parseFloat(calcEWaste) || 0) / 1000,
    };

    let totalCO2 = 0;
    let totalTrees = 0;
    let totalWater = 0;
    let totalTons = 0;

    Object.keys(weights).forEach((cat) => {
      const weightTons = weights[cat];
      totalTons += weightTons;
      const factor = WASTE_EMISSION_FACTORS[cat];
      if (factor) {
        totalCO2 += weightTons * factor.co2Multiplier;
        totalTrees += weightTons * factor.treesMultiplier;
        totalWater += weightTons * factor.waterMultiplier;
      }
    });

    return {
      co2: parseFloat(totalCO2.toFixed(2)),
      trees: Math.round(totalTrees),
      water: Math.round(totalWater),
      tons: parseFloat(totalTons.toFixed(2)),
    };
  }, [calcPlastic, calcOrganic, calcPaper, calcMetal, calcGlass, calcEWaste]);

  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">ESG Impact Suite</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-gray-800">
          Corporate ESG Carbon Offset Calculator
        </h2>
        <p className="text-xs md:text-sm text-slate-gray-500 mt-2 font-sans">
          Calculate your climate offset metrics instantly. Monitor plastic, paper, and metal recycling to fulfill Extended Producer Responsibility (EPR) reporting quotas and minimize your company's carbon footprint.
        </p>
      </div>

      {/* Main Container: ESG Tonnage Carbon Calculator (Full width, centered) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 hover:border-forest-400 transition-all">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-base font-bold text-slate-gray-800 tracking-tight flex items-center gap-2 font-sans">
            <Scale className="w-5 h-5 text-forest-700" />
            ESG Carbon Offset Calculator
          </h3>
          <p className="text-xs text-slate-gray-500 mt-1">
            Enter your monthly waste profiles in kilograms to view simulated environmental savings based on EPA standards.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-xs font-sans">
          <div>
            <label className="block font-semibold text-slate-500 mb-1">Plastic (kg)</label>
            <input
              type="number"
              value={calcPlastic}
              onChange={(e) => setCalcPlastic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Organic (kg)</label>
            <input
              type="number"
              value={calcOrganic}
              onChange={(e) => setCalcOrganic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Paper & Pulp (kg)</label>
            <input
              type="number"
              value={calcPaper}
              onChange={(e) => setCalcPaper(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Metal Scrap (kg)</label>
            <input
              type="number"
              value={calcMetal}
              onChange={(e) => setCalcMetal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Glass Cullet (kg)</label>
            <input
              type="number"
              value={calcGlass}
              onChange={(e) => setCalcGlass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">E-waste (kg)</label>
            <input
              type="number"
              value={calcEWaste}
              onChange={(e) => setCalcEWaste(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
            />
          </div>
        </div>

        {/* Results Bento Box */}
        <div className="bg-forest-50 rounded-2xl p-5 border border-forest-100 space-y-4">
          <div className="flex justify-between items-center border-b border-forest-100 pb-3">
            <span className="text-xs font-bold font-mono tracking-wider text-forest-800 uppercase">Simulated Monthly Savings</span>
            <span className="text-xs font-bold text-forest-700 bg-white border border-forest-100 py-0.5 px-2.5 rounded font-mono">
              {computedImpacts.tons} Tons Total
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="bg-white rounded-2xl p-3 shadow-2xs border border-forest-100 flex flex-col items-center justify-center">
                <Leaf className="w-5 h-5 text-forest-700 mb-1" />
                <span className="text-[10px] text-slate-gray-400 font-mono uppercase">CO₂ Saved</span>
                <strong className="text-slate-gray-800 text-sm md:text-base font-bold font-mono">{computedImpacts.co2} t</strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="bg-white rounded-2xl p-3 shadow-2xs border border-forest-100 flex flex-col items-center justify-center">
                <Trees className="w-5 h-5 text-forest-700 mb-1" />
                <span className="text-[10px] text-slate-gray-400 font-mono uppercase">Trees Offset</span>
                <strong className="text-slate-gray-800 text-sm md:text-base font-bold font-mono">{computedImpacts.trees}</strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="bg-white rounded-2xl p-3 shadow-2xs border border-forest-100 flex flex-col items-center justify-center">
                <Droplets className="w-5 h-5 text-forest-700 mb-1" />
                <span className="text-[10px] text-slate-gray-400 font-mono uppercase">Water saved</span>
                <strong className="text-slate-gray-800 text-xs font-bold font-mono leading-none mt-1">{computedImpacts.water.toLocaleString()} L</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Consult Rextract section */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-xs">
          <div className="bg-forest-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-xs">
            <div className="absolute inset-0 bg-radial-gradient from-forest-700/50 via-transparent to-transparent opacity-60"></div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">Corporate Sustainability</span>
                <h4 className="text-base font-bold font-sans tracking-tight text-white">Consult Rextract for your company</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed font-sans max-w-md">
                  Get a certified, audit-ready EPR and waste diversion report tailored to your industrial MIDC or IT park campus. Speak directly with our environmental compliance officers.
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-2 font-sans font-medium text-[11px] text-emerald-100">
                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                  Email: <a href="mailto:contact@rextract.co.in" className="underline hover:text-white font-bold">contact@rextract.co.in</a>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                  Phone: <a href="tel:7057761166" className="underline hover:text-white font-bold">+91 70577 61166</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
