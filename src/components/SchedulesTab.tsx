import React, { useState, useMemo } from "react";
import { CollectionSchedule } from "../types";
import { INITIAL_SCHEDULES, WASTE_EMISSION_FACTORS } from "../mockData";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Truck, 
  CheckCircle, 
  Building, 
  Scale, 
  Info,
  ChevronRight,
  ShieldAlert,
  Leaf
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SchedulesTab() {
  const [schedules, setSchedules] = useState<CollectionSchedule[]>(INITIAL_SCHEDULES);
  
  // Form State
  const [companyName, setCompanyName] = useState("");
  const [area, setArea] = useState("Hinjewadi");
  const [address, setAddress] = useState("");
  const [wasteType, setWasteType] = useState<CollectionSchedule["wasteType"]>("Recyclables");
  const [preferredDay, setPreferredDay] = useState("Monday");
  const [frequency, setFrequency] = useState<CollectionSchedule["frequency"]>("Weekly");
  const [estimatedVolume, setEstimatedVolume] = useState("");
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const PUNE_SECTORS = [
    "Hinjewadi Phase 1",
    "Hinjewadi Phase 2",
    "Hinjewadi Phase 3",
    "Chakan MIDC Phase II",
    "Hadapsar Industrial Estate",
    "Viman Nagar IT Parks",
    "Kalyani Nagar Commerce Zone",
    "Kothrud Office Hub",
    "Wakad Commercial Block",
    "Talawade IT Park"
  ];

  // Live Carbon Savings projection inside Scheduler form as they fill out
  const liveCarbonSavings = useMemo(() => {
    const volKg = parseFloat(estimatedVolume);
    if (isNaN(volKg) || volKg <= 0) return 0;
    
    // Convert to Tonnes
    const volTons = volKg / 1000;
    
    // Find emission factor
    let mappedCategory = "Plastic";
    if (wasteType === "Dry Waste" || wasteType === "Mixed Industrial") mappedCategory = "Plastic";
    else if (wasteType === "Wet Waste") mappedCategory = "Organic";
    else if (wasteType === "Recyclables") mappedCategory = "Paper";
    else if (wasteType === "E-waste") mappedCategory = "E-waste";

    const factor = WASTE_EMISSION_FACTORS[mappedCategory];
    if (factor) {
      return parseFloat((volTons * factor.co2Multiplier).toFixed(2));
    }
    return 0;
  }, [estimatedVolume, wasteType]);

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!companyName.trim()) {
      setFormError("Please provide your Registered Corporate Name.");
      return;
    }
    if (!address.trim()) {
      setFormError("Please provide the full collection loading dock address.");
      return;
    }
    const volNum = parseFloat(estimatedVolume);
    if (isNaN(volNum) || volNum <= 0) {
      setFormError("Please enter a realistic estimated volume in kilograms.");
      return;
    }

    const newSchedule: CollectionSchedule = {
      id: `sched-${Date.now()}`,
      companyName: companyName.trim(),
      area,
      address: address.trim(),
      wasteType,
      preferredDay,
      frequency,
      estimatedVolume: volNum,
      status: "Pending"
    };

    setSchedules(prev => [newSchedule, ...prev]);
    setFormSuccess(true);

    // Reset fields
    setCompanyName("");
    setAddress("");
    setEstimatedVolume("");
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <span className="text-forest-700 text-xs font-bold tracking-widest uppercase font-mono block mb-1">Logistical Efficiency</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-gray-800">
          Corporate Collection Logistics & Scheduler
        </h2>
        <p className="text-xs md:text-sm text-slate-gray-500 mt-2 font-sans">
          Rextract operates heavy compaction vehicles, GPS-tracked routes, and zero-leakage containerized trucks in Pune. Manage schedules and book new pickups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Grid: Pickup Schedules List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-gray-700 tracking-tight font-sans flex items-center gap-2">
              <Truck className="w-5 h-5 text-forest-700" />
              Active Dispatch Logistics
            </h3>
            <span className="text-[10px] font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-500 font-bold uppercase">
              Pune Corridors
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {schedules.map((sched) => (
                <motion.div
                  key={sched.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-forest-400 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2.5 items-center">
                      <div className="bg-slate-50 p-2 rounded-xl text-slate-600 border border-slate-200 shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-gray-800 text-xs sm:text-sm font-sans">{sched.companyName}</h4>
                        <span className="text-[10px] text-slate-gray-400 font-mono tracking-wide">{sched.area}</span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      sched.status === "Active" ? "bg-emerald-100 text-emerald-800" :
                      sched.status === "Scheduled" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {sched.status === "Active" ? "● ROUTE ACTIVE" : 
                       sched.status === "Scheduled" ? "● DISPATCHED" : "● AUDIT PENDING"}
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-xs text-slate-500 border-t border-slate-100 pt-3 font-sans">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">Stream Type</span>
                      <strong className="text-slate-700 font-semibold">{sched.wasteType}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">Day / Slot</span>
                      <strong className="text-slate-700 font-semibold">{sched.preferredDay}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">Frequency</span>
                      <strong className="text-slate-700 font-semibold">{sched.frequency}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">Volume est.</span>
                      <strong className="text-slate-700 font-semibold font-mono">{sched.estimatedVolume} kg</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono mt-3 truncate flex items-center gap-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>Loading Dock: {sched.address}</span>
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Grid: Form to Book Pickup */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 hover:border-forest-400 transition-all">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-base font-bold text-slate-gray-800 tracking-tight flex items-center gap-2 font-sans">
              <Calendar className="w-5 h-5 text-forest-700" />
              Corporate Dispatch Request
            </h3>
            <p className="text-xs text-slate-gray-500 mt-1">
              Submit your corporate profile details to schedule an initial MPCB-certified waste collection audit.
            </p>
          </div>

          {formSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl leading-relaxed flex items-start gap-2.5 font-sans">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-emerald-900 block">Corporate Dispatch Scheduled!</strong>
                Your request has been filed in the Rextract logs. An environmental logistics supervisor from Pune will audit your dock credentials within 24 business hours.
              </div>
            </div>
          )}

          {formError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs p-3.5 rounded-xl leading-relaxed font-sans font-medium">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmitSchedule} className="space-y-4 text-xs font-sans">
            {/* Registered Company */}
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Corporate Entity Name</label>
              <input
                type="text"
                placeholder="e.g. Wipro Hinjewadi Campus B"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 font-sans"
                required
              />
            </div>

            {/* Area Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Corporate Node</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer font-sans"
                >
                  {PUNE_SECTORS.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Preferred Slot</label>
                <select
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer font-sans"
                >
                  <option value="Monday">Monday Mornings</option>
                  <option value="Wednesday">Wednesday Middays</option>
                  <option value="Friday">Friday Afternoons</option>
                  <option value="Daily">Daily Pickup Routes</option>
                  <option value="On-Demand">On-Demand (Special)</option>
                </select>
              </div>
            </div>

            {/* Waste Stream & Frequency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Primary Waste Stream</label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value as CollectionSchedule["wasteType"])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer font-sans"
                >
                  <option value="Recyclables">Recyclable Polymers/Paper</option>
                  <option value="Dry Waste">General Dry Corporate Waste</option>
                  <option value="Wet Waste">Organic Pantry/Cafeteria</option>
                  <option value="E-waste">Corporate IT E-waste</option>
                  <option value="Mixed Industrial">MIDC Industrial Scrap</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as CollectionSchedule["frequency"])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 cursor-pointer font-sans"
                >
                  <option value="Weekly">Weekly Routing</option>
                  <option value="Bi-weekly">Bi-weekly Routing</option>
                  <option value="Daily">Daily Clearance</option>
                  <option value="On-demand">On-demand Collection</option>
                </select>
              </div>
            </div>

            {/* Loading Dock Address */}
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Loading Dock / Dispatch Address</label>
              <textarea
                rows={2}
                placeholder="Plot Number, MIDC, Phase Info, Landmark..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 font-sans"
                required
              />
            </div>

            {/* Expected Weight volume */}
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Est. Monthly Volume (kg)</label>
              <div className="relative font-sans">
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={estimatedVolume}
                  onChange={(e) => setEstimatedVolume(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-12 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-500"
                  required
                />
                <span className="absolute right-3.5 top-2.5 text-slate-400 font-bold font-mono">KG</span>
              </div>
            </div>

            {/* Live Carbon Offset Display */}
            {liveCarbonSavings > 0 && (
              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-4 flex gap-2.5 items-center">
                <Leaf className="w-5 h-5 text-forest-700 shrink-0" />
                <div className="font-sans">
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">Estimated Climate Offset</span>
                  <p className="text-slate-700 leading-normal font-medium mt-0.5">
                    This single request offsets approximately <strong className="text-forest-800 font-bold">{liveCarbonSavings} Tons</strong> of CO₂ emissions monthly once recycled.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-forest-800 hover:bg-forest-900 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition-all shadow-xs cursor-pointer font-sans"
            >
              Confirm Corporate Route Setup
            </button>
          </form>
        </div>
      </div>

      {/* Safety and logistics specifications */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
        <h4 className="text-sm font-bold text-slate-gray-800 tracking-tight flex items-center gap-2 mb-4 font-sans">
          <ShieldAlert className="w-5 h-5 text-forest-700" />
          Rextract Industrial Logistical Standards
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500 leading-relaxed font-sans">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-forest-300 hover:shadow-xs transition-all">
            <h5 className="font-bold text-slate-gray-700 mb-1.5 font-mono text-[10px] uppercase tracking-wide">GPS Weighing Integration</h5>
            All compactor dispatch fleets are equipped with cellular-linked on-vehicle loadcells. Total weight readings are auto-submitted to Rextract cloud nodes at point-of-collection for zero data loss.
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-forest-300 hover:shadow-xs transition-all">
            <h5 className="font-bold text-slate-gray-700 mb-1.5 font-mono text-[10px] uppercase tracking-wide">EPR Certificate Generation</h5>
            Monthly summaries are issued to corporate clients via our reporting suite. These records fulfill Form II/IV specifications of Maharashtra Pollution Control Board (MPCB) audits.
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-forest-300 hover:shadow-xs transition-all">
            <h5 className="font-bold text-slate-gray-700 mb-1.5 font-mono text-[10px] uppercase tracking-wide">Zero Landfill Philosophy</h5>
            100% of organic waste is composted at our decentralized partner bio-composters in Chakan. Polymer materials are exclusively processed into secondary compounds at Rextract complexes.
          </div>
        </div>
      </div>
    </div>
  );
}
