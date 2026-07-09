/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OverviewTab from "./components/OverviewTab";
import PlantsTab from "./components/PlantsTab";
import SchedulesTab from "./components/SchedulesTab";
import ReportingTab from "./components/ReportingTab";
import { INITIAL_LOGS } from "./mockData";
import { WasteLog } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [logs, setLogs] = useState<WasteLog[]>(INITIAL_LOGS);

  // Add new log callback (re-calculates totals dynamically)
  const handleAddLog = (newLog: Omit<WasteLog, "id">) => {
    const formattedLog: WasteLog = {
      ...newLog,
      id: `log-${Date.now()}`
    };
    setLogs((prev) => [formattedLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-gray-50/30 flex flex-col justify-between selection:bg-forest-500 selection:text-white">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {activeTab === "overview" && (
              <OverviewTab logs={logs} onAddLog={handleAddLog} />
            )}

            {activeTab === "plants" && (
              <PlantsTab />
            )}

            {activeTab === "schedules" && (
              <SchedulesTab />
            )}

            {activeTab === "reporting" && (
              <ReportingTab />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
