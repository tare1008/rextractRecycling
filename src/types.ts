export interface WasteLog {
  id: string;
  date: string;
  area: string;
  category: "Plastic" | "Organic" | "Paper" | "Metal" | "Glass" | "E-waste";
  weight: number; // in metric tonnes
  status: "Collected" | "In Sorting" | "Recycled" | "Composted" | "Diverted";
  operator: string;
}

export interface RecyclePlant {
  id: string;
  name: string;
  location: string;
  type: string;
  dailyCapacity: number; // tonnes per day
  efficiencyRate: number; // percentage
  status: "Operational" | "Maintenance" | "Under Expansion";
  launchedYear: number;
  processes: string[];
  description: string;
}

export interface CollectionSchedule {
  id: string;
  companyName: string;
  area: string;
  address: string;
  wasteType: "Dry Waste" | "Wet Waste" | "Recyclables" | "E-waste" | "Mixed Industrial";
  preferredDay: string;
  frequency: "Daily" | "Bi-weekly" | "Weekly" | "On-demand";
  estimatedVolume: number; // in kg
  status: "Active" | "Pending" | "Scheduled";
}

export interface MHRegion {
  id: string;
  name: string;
  status: "Active Operations" | "Active Expansion" | "Feasibility Study" | "Proposed Expansion";
  divertedTarget: number; // Tonnes per month potential
  corporateInterestCount: number;
  description: string;
  latitude: number;
  longitude: number;
}
