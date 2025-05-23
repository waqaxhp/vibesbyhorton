import React, { useState } from "react";

const intervals = [
  { label: "30 Days", value: "30" },
  { label: "6 Months", value: "180" },
  { label: "1 Year", value: "365" },
];

const tabs = ["Live Call", "Live Chat", "Voice Chat"] as const;
type TabType = (typeof tabs)[number];

const HistorySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Live Call");
  const [settings, setSettings] = useState<Record<TabType, string>>({
    "Live Call": "30",
    "Live Chat": "30",
    "Voice Chat": "30",
  });

  const handleIntervalChange = (tab: TabType, value: string) => {
    setSettings((prev) => ({ ...prev, [tab]: value }));
  };

  const handleSave = () => {
    alert("History settings saved!");
  };

  return (
    <div className="p-6 mx-auto h-full w-full font-sans text-gray-100 bg-[#121212] rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        Set Up Your Interval to Store History
      </h1>

      <p className="text-center mb-6 text-gray-400">
        Choose how long your call, chat, and voice data should be stored. Your
        data will be maintained for the selected interval.
      </p>

      {/* Tabs */}
      <div
        className="flex justify-center space-x-6 mb-6 border-b border-gray-700"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-semibold rounded-t-md transition-colors ${
              activeTab === tab
                ? "bg-[#181c24] text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interval Options */}
      <div className="text-center mb-4">
        <label htmlFor="interval" className="block mb-2 text-lg font-medium">
          Select Interval for {activeTab}
        </label>
        <select
          id="interval"
          value={settings[activeTab]}
          onChange={(e) => handleIntervalChange(activeTab, e.target.value)}
          className="p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {intervals.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <p className="mt-4 text-sm text-gray-400">
          Your {activeTab.toLowerCase()} history will be maintained for{" "}
          {intervals.find((i) => i.value === settings[activeTab])?.label}.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default HistorySettings;
