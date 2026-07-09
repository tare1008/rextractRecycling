import React from "react";
import { Leaf, MapPin, Sparkles, TrendingUp } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: "overview", label: "Live Dashboard & Logs", icon: TrendingUp },
    { id: "plants", label: "Recycling Plants", icon: Leaf },
    { id: "schedules", label: "Corporate Pickups", icon: MapPin },
    { id: "reporting", label: "ESG Offset Calculator", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner indicating Expansion */}
      <div className="bg-forest-800 text-white text-[11px] py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center justify-center bg-white/20 px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase">Notice</span>
          <span>Rextract is expanding operations across Maharastra, Contact us for corporate programs now!</span>
        </div>
        <div className="flex items-center gap-3 opacity-90 font-mono">
          <span>Pune HQ: +91 70577 61166</span>
          <span className="hidden md:inline">|</span>
          <span>Email: contact@rextract.co.in</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-800 rounded-lg flex items-center justify-center text-white shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-forest-800">
                REXTRACT <span className="text-slate-500 font-light">Pvt. Ltd.</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono">Advanced Waste Intelligence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 py-2 px-2.5 transition-all duration-200 hover:text-forest-800 cursor-pointer ${
                    isActive
                      ? "text-forest-800 font-bold border-b-2 border-forest-800"
                      : "text-slate-500 font-medium"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-forest-800" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Status Header Details / Bento badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-forest-100 px-3.5 py-1.5 rounded-full border border-forest-200/50">
              <div className="w-2 h-2 bg-forest-600 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-forest-800 whitespace-nowrap">Operating in Pune, MH</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto pb-3 gap-1.5 scrollbar-none scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-forest-800 text-white"
                    : "text-slate-600 bg-slate-100 border border-slate-200/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
