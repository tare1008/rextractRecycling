import React, { useState, useMemo } from "react";
import { WasteLog, MHRegion } from "../types";
import { MH_REGIONS, WASTE_EMISSION_FACTORS } from "../mockData";
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  Trees, 
  Droplets, 
  CloudLightning,
  MapPin,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OverviewTabProps {
  logs: WasteLog[];
  onAddLog: (newLog: Omit<WasteLog, "id">) => void;
}

export default function OverviewTab({ logs, onAddLog }: OverviewTabProps) {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("reg-pune");
  
  // New Log Form State
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLogArea, setNewLogArea] = useState("Kothrud");
  const [newLogCategory, setNewLogCategory] = useState<WasteLog["category"]>("Plastic");
  const [newLogWeight, setNewLogWeight] = useState("");
  const [newLogOperator, setNewLogOperator] = useState("");
  const [formError, setFormError] = useState("");

  // Pune areas for quick selection in logger
  const PUNE_AREAS = [
    "Kothrud",
    "Hinjewadi Phase 1",
    "Hinjewadi Phase 2",
    "Hinjewadi Phase 3",
    "Viman Nagar IT Corridor",
    "Baner Highway Hub",
    "Wakad Sector 12",
    "Hadapsar Ward 4",
    "Chakan Industrial Zone",
    "Koregaon Park"
  ];

  // 1. Calculate environmental metrics based on active logs list
  const metrics = useMemo(() => {
    let totalTonnage = 0;
    let co2Saved = 0; // tonnes CO2
    let treesSaved = 0; // equivalent trees
    let waterSaved = 0; // Litres

    logs.forEach((log) => {
      totalTonnage += log.weight;
      const factor = WASTE_EMISSION_FACTORS[log.category];
      if (factor) {
        co2Saved += log.weight * factor.co2Multiplier;
        treesSaved += log.weight * factor.treesMultiplier;
        waterSaved += log.weight * factor.waterMultiplier;
      }
    });

    return {
      totalTonnage: parseFloat(totalTonnage.toFixed(1)),
      co2Saved: parseFloat(co2Saved.toFixed(1)),
      treesSaved: Math.round(treesSaved),
      waterSaved: Math.round(waterSaved)
    };
  }, [logs]);

  // 2. Filter logs for presentation
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = log.area.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            log.operator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || log.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [logs, searchTerm, categoryFilter]);

  // 3. Custom SVG Chart calculations (Weekly Tonnage diverted over last 5 weeks)
  const chartData = useMemo(() => {
    // Standardized weekly buckets to show weekly tonnage diverted
    const weeks = ["Wk 24", "Wk 25", "Wk 26", "Wk 27", "Wk 28"];
    // Map current log weights dynamically into the current week (Wk 28)
    const logsTonnage = logs.reduce((sum, log) => sum + log.weight, 0);
    const totals: Record<string, number> = {
      "Wk 24": 42.5,
      "Wk 25": 56.2,
      "Wk 26": 48.9,
      "Wk 27": 63.4,
      "Wk 28": parseFloat(logsTonnage.toFixed(1))
    };

    return weeks.map(wk => ({
      date: wk,
      tonnage: totals[wk]
    }));
  }, [logs]);

  // Max value for chart scaling
  const maxChartTonnage = useMemo(() => {
    if (chartData.length === 0) return 20;
    return Math.max(...chartData.map(d => d.tonnage)) * 1.25 || 20;
  }, [chartData]);

  // 4. Waste category distribution progress bar totals
  const categoryBreakdown = useMemo(() => {
    const totals: Record<string, number> = {
      Plastic: 0,
      Organic: 0,
      Paper: 0,
      Metal: 0,
      Glass: 0,
      "E-waste": 0
    };
    
    logs.forEach(log => {
      if (totals[log.category] !== undefined) {
        totals[log.category] += log.weight;
      }
    });

    const maxWeight = Math.max(...Object.values(totals)) || 1;

    return Object.keys(totals).map(cat => ({
      category: cat,
      weight: parseFloat(totals[cat].toFixed(1)),
      percentage: Math.round((totals[cat] / maxWeight) * 100),
      color: cat === "Plastic" ? "bg-emerald-600" :
             cat === "Organic" ? "bg-green-700" :
             cat === "Paper" ? "bg-amber-600" :
             cat === "Metal" ? "bg-slate-500" :
             cat === "Glass" ? "bg-teal-600" : "bg-purple-600"
    }));
  }, [logs]);

  // Handle Form Submission
  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const weightVal = parseFloat(newLogWeight);
    if (isNaN(weightVal) || weightVal <= 0) {
      setFormError("Please enter a valid weight in tonnes (greater than 0).");
      return;
    }

    onAddLog({
      date: new Date().toISOString().split('T')[0], // current date
      area: newLogArea,
      category: newLogCategory,
      weight: weightVal,
      status: newLogCategory === "Organic" ? "Composted" : 
              newLogCategory === "Plastic" ? "In Sorting" : "Diverted",
      operator: newLogOperator.trim() || "Field Team Beta"
    });

    // Reset fields & success feedback
    setNewLogWeight("");
    setNewLogOperator("");
    setFormError("");
    setShowLogForm(false);
  };

  const selectedRegionDetails = useMemo(() => {
    return MH_REGIONS.find(r => r.id === selectedRegion);
  }, [selectedRegion]);

  return (
    <div className="space-y-12">
      {/* Intro Section - Primary Bento Dark Card */}
      <div className="bento-card-dark flex flex-col justify-between md:p-12 border-4 border-forest-900/10">
        <div className="relative z-10">
          <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-md inline-flex items-center gap-1.5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            Environmental Infrastructure Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 leading-tight tracking-tight text-white max-w-3xl">
            Re-engineering Waste into Maharashtra's Next Resources
          </h1>
          <p className="text-emerald-100 mt-4 max-w-2xl text-sm md:text-base leading-relaxed font-light">
            Rextract Pvt. Ltd. delivers durable waste interception systems in Pune. We are actively scaling our polymer recovery operations and logistics corridors to offer closed-loop circularity for corporate giants across Maharashtra.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 md:gap-12 mt-8 relative z-10 border-t border-white/10 pt-6">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-white">84%</p>
            <p className="text-emerald-200 text-xs mt-0.5">Material Recovery Rate</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-white">12.5k</p>
            <p className="text-emerald-200 text-xs mt-0.5">Tons CO₂ Avoided</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-3xl md:text-4xl font-extrabold text-white">100%</p>
            <p className="text-emerald-200 text-xs mt-0.5">EPR & ESG Traceability</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/20 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      </div>

      {/* 1. Ecological Metrics Bento Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-gray-800 tracking-tight mb-1 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-forest-500 rounded-xs"></span>
          Pune Environmental Impact Dashboard
        </h2>
        <p className="text-xs text-slate-gray-500 mb-6 font-sans">
          Real-time aggregates calculated directly from Rextract's verified daily collection logs and process facility weighbridges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Diverted Tonnage */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-forest-400 hover:shadow-md transition-all">
            <div className="bg-forest-50 p-3.5 rounded-2xl text-forest-600 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase font-mono">Landfill Diverted</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-800 tracking-tight">{metrics.totalTonnage}</span>
                <span className="text-xs font-semibold text-slate-400 font-sans">Tons</span>
              </div>
              <span className="text-[10px] text-forest-600 font-bold block mt-1">↑ Real-time tracking</span>
            </div>
          </div>

          {/* Card 2: CO2 Avoided */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-forest-400 hover:shadow-md transition-all">
            <div className="bg-forest-50 p-3.5 rounded-2xl text-forest-600 shrink-0">
              <CloudLightning className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase font-mono">CO₂ Avoided</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-800 tracking-tight">{metrics.co2Saved}</span>
                <span className="text-xs font-semibold text-slate-400 font-sans">CO₂e t</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Based on EPA metrics</span>
            </div>
          </div>

          {/* Card 3: Trees Saved */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-forest-400 hover:shadow-md transition-all">
            <div className="bg-forest-50 p-3.5 rounded-2xl text-forest-600 shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase font-mono">Mature Trees</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-800 tracking-tight">{metrics.treesSaved.toLocaleString()}</span>
                <span className="text-xs font-semibold text-slate-400 font-sans">Trees</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Offset equivalence logs</span>
            </div>
          </div>

          {/* Card 4: Water Conserved */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-forest-400 hover:shadow-md transition-all">
            <div className="bg-forest-50 p-3.5 rounded-2xl text-forest-600 shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase font-mono">Water Saved</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight whitespace-nowrap">{metrics.waterSaved.toLocaleString()}</span>
                <span className="text-xs font-semibold text-slate-400 font-sans">L</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Paper & polymer savings</span>
            </div>
          </div>
        </div>
      </div>
            {/* 2. Interactive Tonnage Dashboard (Custom Charts Block) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart A: Weekly Diverted Tonnage Line Graph */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-forest-400 transition-all">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-gray-800 tracking-tight">Diverted Landfill Tonnage Trend</h3>
                <p className="text-xs text-slate-gray-500">Weekly aggregates from recent collections</p>
              </div>
              <div className="bg-forest-50 text-forest-800 text-[10px] font-bold font-mono py-1 px-2.5 rounded-md border border-forest-100">
                PUNE REGION
              </div>
            </div>

            {/* Custom SVG Line Area Graph */}
            <div className="relative h-48 w-full mt-6">
              {chartData.length > 0 ? (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#065f46" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#065f46" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Y-Axis lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={140 - r * 120}
                      x2="380"
                      y2={140 - r * 120}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Build SVG points */}
                  {(() => {
                    const paddingX = 40;
                    const chartWidth = 300;
                    const spacing = chartWidth / Math.max(1, chartData.length - 1);
                    const points = chartData.map((d, index) => {
                      const x = paddingX + index * spacing;
                      const y = 140 - (d.tonnage / maxChartTonnage) * 120;
                      return { x, y, label: d.date, tonnage: d.tonnage };
                    });

                    const pathD = points.reduce((acc, p, idx) => {
                      return acc + `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`;
                    }, "");

                    const areaD = pathD + ` L ${points[points.length - 1].x} 140 L ${points[0].x} 140 Z`;

                    return (
                      <>
                        {/* Gradient Area */}
                        <path d={areaD} fill="url(#chartGrad)" />

                        {/* Line */}
                        <path d={pathD} fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Data Points */}
                        {points.map((p, index) => (
                          <g key={index} className="group cursor-pointer">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="4.5"
                              fill="#ffffff"
                              stroke="#065f46"
                              strokeWidth="2.5"
                            />
                            {/* Hover tooltip outline */}
                            <rect
                              x={p.x - 22}
                              y={p.y - 28}
                              width="44"
                              height="20"
                              rx="4"
                              fill="#1e293b"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            />
                            <text
                              x={p.x}
                              y={p.y - 14}
                              fill="#ffffff"
                              fontSize="9"
                              fontWeight="bold"
                              textAnchor="middle"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-sans"
                            >
                              {p.tonnage}t
                            </text>

                            {/* X Axis Labels */}
                            <text
                              x={p.x}
                              y="155"
                              fill="#64748b"
                              fontSize="10"
                              textAnchor="middle"
                              fontWeight="medium"
                              className="font-mono"
                            >
                              {p.label}
                            </text>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-slate-gray-400">
                  Not enough log entries to generate trend.
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500 font-sans mt-4">
            <span>Diverting approx. {parseFloat((metrics.totalTonnage / logs.length || 0).toFixed(1))} tonnes average per pickup.</span>
            <span className="font-semibold text-forest-700">Live Weighbridge Feed</span>
          </div>
        </div>

        {/* Chart B: Category Tonnage Distribution (Progress Bars) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-forest-400 transition-all">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-gray-800 tracking-tight">Diverted Tonnage by Waste Type</h3>
                <p className="text-xs text-slate-gray-500">Distribution analysis for current logged volume</p>
              </div>
              <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold py-1 px-2.5 rounded-md border border-emerald-100">
                AUDITED MASS
              </div>
            </div>

            <div className="space-y-3.5 mt-4">
              {categoryBreakdown.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.category} Recovery</span>
                    <span className="text-slate-500 font-mono font-medium">{item.weight} Tonnes</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.color.includes("emerald") || item.color.includes("forest")
                          ? "bg-forest-600"
                          : item.color.includes("slate")
                          ? "bg-slate-500"
                          : item.color.includes("teal")
                          ? "bg-teal-600"
                          : item.color.includes("amber")
                          ? "bg-amber-500"
                          : item.color
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center gap-1.5 text-slate-500 text-[11px] leading-tight font-sans mt-4">
            <Info className="w-3.5 h-3.5 text-forest-700 shrink-0" />
            <span>Highest tonnage diverted is processed into secondary compounds at Rextract complexes.</span>
          </div>
        </div>
      </div>

      {/* 3. Maharashtra Geographic Expansion & Pune Hubs Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="max-w-2xl mb-8">
          <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">Statewide Integration</span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-gray-800">
            Active Pune Hubs & Maharashtra Expansion Plan
          </h3>
          <p className="text-xs md:text-sm text-slate-gray-500 mt-1 font-sans">
            Rextract Pvt. Ltd. operates two primary industrial-grade polymer recovery centers in Pune. Explore our active hubs and our strategic plan to expand into Maharashtra's top waste-producing centers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Two Pune Locations (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-mono mb-1">
              Active Pune Operations
            </h4>

            {/* Hub 1: Vadhe Budruk */}
            <div className="bg-forest-50/40 border border-forest-500/20 rounded-2xl p-5 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shrink-0"></div>
                    <span className="font-bold text-slate-gray-800 text-sm sm:text-base">Vadhe Budruk Complex</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                    Operational
                  </span>
                </div>
                <p className="text-xs text-slate-gray-500 mt-2 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-forest-700" />
                  <span>South-West Corridor, Pune</span>
                </p>
                <p className="text-xs text-slate-gray-600 mt-2.5 leading-relaxed font-sans">
                  Our flagship 45 tonnes-per-day PET Flakes & HDPE complex. Features automated hot-friction washing systems and de-labeling loops supplying certified packaging grades.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-forest-500/10 flex justify-between text-[11px] font-mono text-forest-800">
                <span>Daily Capacity: 45t</span>
                <span>Active Lines: 3</span>
              </div>
            </div>

            {/* Hub 2: Kesnand */}
            <div className="bg-blue-50/30 border border-blue-500/20 rounded-2xl p-5 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shrink-0"></div>
                    <span className="font-bold text-slate-gray-800 text-sm sm:text-base">Kesnand Complex</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase">
                    Under Expansion
                  </span>
                </div>
                <p className="text-xs text-slate-gray-500 mt-2 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <span>East Corridor, Pune</span>
                </p>
                <p className="text-xs text-slate-gray-600 mt-2.5 leading-relaxed font-sans">
                  Our specialized polyolefin reprocessing center managing flexible film, LDPE packaging wrap, and PP industrial scrap compounding. Currently setting up a high-output melt filtration extruder.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-500/10 flex justify-between text-[11px] font-mono text-blue-800">
                <span>Capacity: 30t → 50t</span>
                <span>Est. Completion: Q3 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Maharashtra Top 5 Waste-Generating Cities and Proposed Plants (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="absolute inset-0 bg-radial-gradient from-forest-500/10 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Statewide Waste Assessment</span>
                <span className="text-xs font-semibold text-slate-400 font-mono">Roadmap 2026-2028</span>
              </div>
              <h4 className="text-base font-bold text-white tracking-tight mb-2">
                Top 5 Plastic & Solid Waste Hubs in Maharashtra
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                Maharashtra is one of India's largest municipal waste generators. Here is how Rextract plans to deploy advanced, containerized polymer recovery complexes inside high-density industrial zones to capture this resource:
              </p>

              {/* List of 5 Cities with Progress Bars and Solutions */}
              <div className="space-y-4">
                {[
                  {
                    city: "Mumbai Metropolitan Region (MMR)",
                    waste: "~11,000 Tons/Day Solid Waste",
                    plasticEst: "Heavy packaging & single-use film waste",
                    percentage: 100,
                    strategy: "Establish a 150 TPD (Tonnes Per Day) automated washing & flake complex in Taloja MIDC.",
                    color: "bg-emerald-500"
                  },
                  {
                    city: "Thane / Kalyan-Dombivli",
                    waste: "~2,500 Tons/Day Solid Waste",
                    plasticEst: "High industrial stretch wrap, pallets, & drums",
                    percentage: 45,
                    strategy: "Set up an 80 TPD heavy compounding plant in Rabale MIDC for engineering polymers.",
                    color: "bg-teal-500"
                  },
                  {
                    city: "Nagpur Logistics Corridor",
                    waste: "~1,200 Tons/Day Solid Waste",
                    plasticEst: "E-waste casing, logistic bags & wraps",
                    percentage: 28,
                    strategy: "Deploy a 50 TPD logistics-focused LDPE wrap & pallet compounding center.",
                    color: "bg-emerald-600"
                  },
                  {
                    city: "Chhatrapati Sambhajinagar (Aurangabad)",
                    waste: "~750 Tons/Day Solid Waste",
                    plasticEst: "Automotive molding and polyolefin scrap",
                    percentage: 18,
                    strategy: "Integrate a 40 TPD co-polymer melt compounding & pelletizing system.",
                    color: "bg-blue-500"
                  },
                  {
                    city: "Nashik Region",
                    waste: "~650 Tons/Day Solid Waste",
                    plasticEst: "Agricultural LDPE drip lines & PET bottles",
                    percentage: 15,
                    strategy: "Install a 40 TPD agricultural drip-line re-extrusion plant.",
                    color: "bg-amber-500"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-100">{idx + 1}. {item.city}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.waste}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 italic">
                      <span>Dominant Plastic: {item.plasticEst}</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden my-1.5">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                    <p className="text-[11px] text-emerald-300 leading-normal font-sans">
                      <strong className="text-slate-300 font-medium font-mono">Planned Plant: </strong> {item.strategy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Daily Waste Collection Logs Console */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-gray-800 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-forest-500" />
              Verified Daily Collection Logs (Pune)
            </h3>
            <p className="text-xs text-slate-gray-500">
              EPR-compliant daily landfill diversion logs tracked via Rextract weighbridges.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search area/operator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs w-full sm:w-48 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 focus:border-forest-500 font-sans"
              />
            </div>

            {/* Filter by Category */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-slate-600 focus:outline-none py-2 pr-4 font-medium font-sans cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Plastic">Plastic Only</option>
                <option value="Organic">Organic Only</option>
                <option value="Paper">Paper Only</option>
                <option value="Metal">Metal Only</option>
                <option value="Glass">Glass Only</option>
                <option value="E-waste">E-waste Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Logs Table Area */}
          <div className={`xl:col-span-8 overflow-x-auto border border-slate-200 rounded-3xl bg-white ${showLogForm ? "xl:col-span-7" : "xl:col-span-12"}`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[10px] font-mono tracking-wider uppercase">
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Pune Area</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Weight (Tons)</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Operator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                <AnimatePresence initial={false}>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <motion.tr 
                        key={log.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-slate-500">{log.date}</td>
                        <td className="py-3 px-4 font-medium text-slate-gray-800">{log.area}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            log.category === "Plastic" ? "bg-emerald-100 text-emerald-800" :
                            log.category === "Organic" ? "bg-green-100 text-green-800" :
                            log.category === "Paper" ? "bg-amber-100 text-amber-800" :
                            log.category === "Metal" ? "bg-slate-100 text-slate-800" :
                            log.category === "Glass" ? "bg-teal-100 text-teal-800" : "bg-purple-100 text-purple-800"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              log.category === "Plastic" ? "bg-emerald-500" :
                              log.category === "Organic" ? "bg-green-600" :
                              log.category === "Paper" ? "bg-amber-500" :
                              log.category === "Metal" ? "bg-slate-500" :
                              log.category === "Glass" ? "bg-teal-500" : "bg-purple-500"
                            }`}></span>
                            {log.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold font-mono text-slate-gray-900">{log.weight} t</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                            log.status === "Recycled" || log.status === "Composted" || log.status === "Diverted"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}>
                            <CheckCircle className="w-3.5 h-3.5" />
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-medium">{log.operator}</td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400 font-mono">
                        No logs matched your criteria.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Slide-out / Collapsible Log Entry Form */}
          {showLogForm && (
            <div className="xl:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold font-mono tracking-wider text-slate-500 uppercase">
                  Add Real-Time Weighbridge Log
                </h4>
                <button 
                  onClick={() => setShowLogForm(false)} 
                  className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-[11px] p-2.5 rounded-lg leading-tight font-medium">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmitLog} className="space-y-4 text-xs font-sans">
                {/* Area Dropdown */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Collection Area (Pune)</label>
                  <select
                    value={newLogArea}
                    onChange={(e) => setNewLogArea(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer"
                  >
                    {PUNE_AREAS.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Waste Stream Category</label>
                  <select
                    value={newLogCategory}
                    onChange={(e) => setNewLogCategory(e.target.value as WasteLog["category"])}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer"
                  >
                    <option value="Plastic">Plastic Polymers (PET/HDPE/PP)</option>
                    <option value="Organic">Organic & Food Waste</option>
                    <option value="Paper">Paper & Cardboard pulp</option>
                    <option value="Metal">Metals & Heavy Industrial scrap</option>
                    <option value="Glass">Glass Cullet</option>
                    <option value="E-waste">Corporate E-waste & Metals</option>
                  </select>
                </div>

                {/* Weight Input */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Scale Weight (Metric Tonnes)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5.8"
                    value={newLogWeight}
                    onChange={(e) => setNewLogWeight(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    required
                  />
                </div>

                {/* Operator Signature */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Weighbridge Operator ID</label>
                  <input
                    type="text"
                    placeholder="e.g. Operator Amit S."
                    value={newLogOperator}
                    onChange={(e) => setNewLogOperator(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest-800 hover:bg-forest-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wide transition-colors mt-2 shadow-xs cursor-pointer"
                >
                  Confirm & Write Log
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
