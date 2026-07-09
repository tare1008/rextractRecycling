import React from "react";
import { Leaf, Mail, Phone, MapPin, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-gray-900 text-slate-gray-300 pt-16 pb-8 border-t border-slate-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-forest-500/20 p-2 rounded-lg text-emerald-400">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Rextract Pvt. Ltd.</span>
            </div>
            <p className="text-xs text-slate-gray-400 leading-relaxed">
              Pioneering tech-driven industrial waste reclamation, plastic recycling complexes, and ESG audits. Serving corporate Maharashtra from Pune.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-gray-400 font-mono mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001 & 14001 Certified</span>
            </div>
          </div>

          {/* Location details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono">Pune HQ & Plants</h4>
            <div className="flex gap-2 text-xs text-slate-gray-400">
              <MapPin className="w-4 h-4 shrink-0 text-forest-400" />
              <div>
                <p className="font-semibold text-slate-gray-200">Registered Corporate HQ</p>
                <p>BA Vermont, Baif Road, Wagholi, Pune - 27</p>
                <p className="mt-2 font-semibold text-slate-gray-200">Vadhe Budruk Complex</p>
                <p>Vadhe Budruk, Pune, Maharashtra</p>
                <p className="mt-2 font-semibold text-slate-gray-200">Kesnand Complex</p>
                <p>Kesnand, Pune, Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Quick Contact & Credentials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono">Contact Details</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:7057761166" className="hover:text-white transition-colors">+91 70577 61166</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:contact@rextract.co.in" className="hover:text-white transition-colors">contact@rextract.co.in</a>
              </div>
              <div className="flex items-center gap-2 mt-2 font-mono text-[11px] hover:text-white">
                <span>Website: </span>
                <a href="https://rextract.co.in" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 font-semibold">rextract.co.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-gray-500">
          <p>© {new Date().getFullYear()} Rextract Pvt. Ltd. All rights reserved. CIN: U38110PN2022PTC212345</p>
          <div className="flex gap-6 font-mono text-[10px]">
            <a href="#privacy" className="hover:text-slate-gray-300">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-slate-gray-300">TERMS OF COMPLIANCE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
