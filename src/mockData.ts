import { WasteLog, RecyclePlant, CollectionSchedule, MHRegion } from "./types";

export const INITIAL_PLANTS: RecyclePlant[] = [
  {
    id: "plant-1",
    name: "Vadhe Budruk PET-Flakes & HDPE Complex",
    location: "Vadhe Budruk, Pune",
    type: "Polyethylene & PET Bottle Recycling Plant",
    dailyCapacity: 45,
    efficiencyRate: 94.5,
    status: "Operational",
    launchedYear: 2022,
    processes: ["Optical Sorting", "Hot Washing", "De-labeling", "Extrusion", "Pelletizing"],
    description: "Our flagship plastic recycling facility in East Pune. Processes up to 45 tonnes of post-consumer PET bottles and high-density polyethylene daily, supplying premium recycled-grade resin (rPET) to major packaging clients in Maharashtra."
  },
  {
    id: "plant-2",
    name: "Kesnand Polyolefin Processing Center",
    location: "Kesnand, Pune",
    type: "LDPE, PP & Industrial Plastic Recycling Plant",
    dailyCapacity: 30,
    efficiencyRate: 91.2,
    status: "Under Expansion",
    launchedYear: 2024,
    processes: ["Industrial Shredding", "Melt Filtration", "Color Sorting", "Compounding"],
    description: "Specialized facility focused on flexible polyolefins, low-density plastics (LDPE bags, wraps), and polypropylene (PP) industrial scrap. Currently installing a new extrusion line to boost capacity to 50 tonnes per day."
  }
];

export const INITIAL_LOGS: WasteLog[] = [
  {
    id: "log-1",
    date: "2026-07-06",
    area: "Hinjewadi Phase 1",
    category: "Plastic",
    weight: 8.4,
    status: "Recycled",
    operator: "Operator Sachin K."
  },
  {
    id: "log-2",
    date: "2026-07-06",
    area: "Kothrud",
    category: "Organic",
    weight: 12.5,
    status: "Composted",
    operator: "Operator Amit S."
  },
  {
    id: "log-3",
    date: "2026-07-06",
    area: "Viman Nagar IT Corridor",
    category: "Paper",
    weight: 6.2,
    status: "Diverted",
    operator: "Operator Pooja M."
  },
  {
    id: "log-4",
    date: "2026-07-05",
    area: "Chakan Industrial Zone",
    category: "Metal",
    weight: 14.8,
    status: "Recycled",
    operator: "Operator Rahul P."
  },
  {
    id: "log-5",
    date: "2026-07-05",
    area: "Hadapsar Ward 4",
    category: "Plastic",
    weight: 9.1,
    status: "In Sorting",
    operator: "Operator Sachin K."
  },
  {
    id: "log-6",
    date: "2026-07-05",
    area: "Baner Highway Hub",
    category: "Glass",
    weight: 3.5,
    status: "Diverted",
    operator: "Operator Deepali G."
  },
  {
    id: "log-7",
    date: "2026-07-04",
    area: "Wakad Sector 12",
    category: "E-waste",
    weight: 2.1,
    status: "In Sorting",
    operator: "Operator Pooja M."
  },
  {
    id: "log-8",
    date: "2026-07-04",
    area: "Hinjewadi Phase 3",
    category: "Plastic",
    weight: 7.8,
    status: "Recycled",
    operator: "Operator Sachin K."
  },
  {
    id: "log-9",
    date: "2026-07-04",
    area: "Kothrud",
    category: "Organic",
    weight: 11.3,
    status: "Composted",
    operator: "Operator Amit S."
  },
  {
    id: "log-10",
    date: "2026-07-03",
    area: "Viman Nagar IT Corridor",
    category: "Paper",
    weight: 5.9,
    status: "Recycled",
    operator: "Operator Pooja M."
  }
];

export const INITIAL_SCHEDULES: CollectionSchedule[] = [
  {
    id: "sched-1",
    companyName: "TechMahindra Hinjewadi Campus",
    area: "Hinjewadi Phase 3",
    address: "Plot No. 1, Phase 3, Rajiv Gandhi Infotech Park, Hinjewadi, Pune 411057",
    wasteType: "Recyclables",
    preferredDay: "Monday, Thursday",
    frequency: "Bi-weekly",
    estimatedVolume: 450,
    status: "Active"
  },
  {
    id: "sched-2",
    companyName: "Infosys Ltd. SEZ",
    area: "Hinjewadi Phase 2",
    address: "Plot No. 12, Phase 2, Hinjewadi Infotech Park, Pune 411057",
    wasteType: "E-waste",
    preferredDay: "Last Friday of Month",
    frequency: "On-demand",
    estimatedVolume: 800,
    status: "Scheduled"
  },
  {
    id: "sched-3",
    companyName: "Serum Institute Office Complex",
    area: "Vadhe Budruk",
    address: "212/2, Vadhe Budruk, Off Solapur Road, Pune 411028",
    wasteType: "Mixed Industrial",
    preferredDay: "Daily",
    frequency: "Daily",
    estimatedVolume: 1200,
    status: "Active"
  },
  {
    id: "sched-4",
    companyName: "Gera Commerzone Offices",
    area: "Viman Nagar",
    address: "Survey No. 65, Samrat Ashok Path, Viman Nagar, Pune 411014",
    wasteType: "Dry Waste",
    preferredDay: "Wednesday",
    frequency: "Weekly",
    estimatedVolume: 650,
    status: "Active"
  }
];

export const MH_REGIONS: MHRegion[] = [
  {
    id: "reg-pune",
    name: "Pune & PCMC (Active HQ)",
    status: "Active Operations",
    divertedTarget: 1450,
    corporateInterestCount: 42,
    description: "Current base of operations with 2 functional plastic recycling complexes and weekly custom logistical routes coverage for over 150 corporate clients and 12 IT parks.",
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: "reg-mumbai",
    name: "Mumbai Metropolitan Region",
    status: "Active Expansion",
    divertedTarget: 3200,
    corporateInterestCount: 110,
    description: "Highly requested expansion sector. Currently setting up a high-throughput marine plastic reclamation center in Navi Mumbai to service coastal shipping corporate logistics.",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: "reg-thane",
    name: "Thane & Kalyan MIDC",
    status: "Active Expansion",
    divertedTarget: 1800,
    corporateInterestCount: 65,
    description: "Industrial plastic compounding expansion. Under active discussions with the Maharashtra Industrial Development Corporation (MIDC) for a 3-acre chemical recycling zone.",
    latitude: 19.2183,
    longitude: 72.9781
  },
  {
    id: "reg-nashik",
    name: "Nashik (Ambad & Satpur MIDC)",
    status: "Proposed Expansion",
    divertedTarget: 950,
    corporateInterestCount: 28,
    description: "Targeted expansion for recycling agricultural plastics, greenhouse polymer covers, and pharmaceutical packaging cardboard waste loops.",
    latitude: 19.9975,
    longitude: 73.7898
  },
  {
    id: "reg-nagpur",
    name: "Nagpur Logistics & Tech Hub",
    status: "Feasibility Study",
    divertedTarget: 1100,
    corporateInterestCount: 18,
    description: "Central India logistics waste hub study. Evaluating feasibility of establishing a solar-powered paper pulp conversion facility to handle logistics e-commerce packaging waste.",
    latitude: 21.1458,
    longitude: 79.0882
  },
  {
    id: "reg-sambhajinagar",
    name: "Chhatrapati Sambhajinagar (Aurangabad)",
    status: "Proposed Expansion",
    divertedTarget: 800,
    corporateInterestCount: 15,
    description: "Focusing on heavy industrial scrap metals and high-temperature polymer industrial parts for the automotive component manufacturing clusters.",
    latitude: 19.8762,
    longitude: 75.3433
  }
];

export const WASTE_EMISSION_FACTORS: Record<string, { co2Multiplier: number; treesMultiplier: number; waterMultiplier: number }> = {
  Plastic: { co2Multiplier: 1.6, treesMultiplier: 0.12, waterMultiplier: 24.5 },
  Organic: { co2Multiplier: 0.8, treesMultiplier: 0.05, waterMultiplier: 12.0 },
  Paper: { co2Multiplier: 2.2, treesMultiplier: 17.0, waterMultiplier: 26000.0 }, // 17 trees saved per tonne of paper, 26000L water
  Metal: { co2Multiplier: 4.5, treesMultiplier: 0.25, waterMultiplier: 450.0 },
  Glass: { co2Multiplier: 0.3, treesMultiplier: 0.02, waterMultiplier: 15.0 },
  "E-waste": { co2Multiplier: 3.2, treesMultiplier: 0.45, waterMultiplier: 820.0 }
};
