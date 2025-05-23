import React, { useState, useMemo } from "react";

interface VoiceEntry {
  id: string;
  type: "chat" | "call";
  audioUrl: string;
  timestamp: string;
}

// Extended dummy data with more entries
const dummyData: VoiceEntry[] = [
  {
    id: "1",
    type: "chat",
    audioUrl: "/audio/voice1.mp3",
    timestamp: "2025-05-22T09:15:00Z",
  },
  {
    id: "2",
    type: "call",
    audioUrl: "/audio/voice2.mp3",
    timestamp: "2025-05-21T16:45:00Z",
  },
  {
    id: "3",
    type: "chat",
    audioUrl: "/audio/voice3.mp3",
    timestamp: "2025-05-20T11:30:00Z",
  },
  {
    id: "4",
    type: "call",
    audioUrl: "/audio/voice4.mp3",
    timestamp: "2025-05-19T20:00:00Z",
  },
  {
    id: "5",
    type: "chat",
    audioUrl: "/audio/voice5.mp3",
    timestamp: "2025-05-18T14:10:00Z",
  },
  {
    id: "6",
    type: "call",
    audioUrl: "/audio/voice6.mp3",
    timestamp: "2025-05-17T18:25:00Z",
  },
  {
    id: "7",
    type: "chat",
    audioUrl: "/audio/voice7.mp3",
    timestamp: "2025-05-16T07:45:00Z",
  },
  {
    id: "8",
    type: "call",
    audioUrl: "/audio/voice8.mp3",
    timestamp: "2025-05-15T13:00:00Z",
  },
  {
    id: "9",
    type: "chat",
    audioUrl: "/audio/voice9.mp3",
    timestamp: "2025-05-14T22:30:00Z",
  },
  {
    id: "10",
    type: "call",
    audioUrl: "/audio/voice10.mp3",
    timestamp: "2025-05-13T10:00:00Z",
  },
];

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const PAGE_SIZE = 5;

const History: React.FC = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState<VoiceEntry[]>(dummyData);
  const [activeTab, setActiveTab] = useState<"chat" | "call">("chat");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter entries by active tab and search
  const filteredEntries = useMemo(() => {
    return entries
      .filter((e) => e.type === activeTab)
      .filter((e) =>
        formatDate(e.timestamp).toLowerCase().includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [entries, search, activeTab]);

  // Pagination controls
  const totalPages = Math.ceil(filteredEntries.length / PAGE_SIZE);
  const pagedEntries = filteredEntries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    // Reset to page 1 if current page becomes invalid after deletion
    if (filteredEntries.length - 1 <= (currentPage - 1) * PAGE_SIZE) {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
  };

  // Handle tab switch & reset pagination
  const onTabClick = (tab: "chat" | "call") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 mx-auto h-full w-full font-sans text-gray-100 bg-[#121212] rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Voice History
      </h1>

      {/* Tabs */}
      {/* Tabs */}
      <div
        className="flex justify-center space-x-6 mb-6 border-b border-gray-700"
        role="tablist"
      >
        {["chat", "call"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-semibold rounded-t-md transition-colors
              ${
                activeTab === tab
                  ? "bg-[#181c24] text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            onClick={() => onTabClick(tab as "chat" | "call")}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab === "chat" ? "Voice Chat" : "Voice Call"}
          </button>
        ))}
      </div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search by date/time..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-6 p-3 w-full rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search history by date or time"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded">
        <table className="min-w-full border border-gray-700 bg-[#1a1a2e] rounded">
          <thead>
            <tr className="text-left bg-gray-900 text-gray-300">
              <th className="py-3 px-6 border-b border-gray-700">Timestamp</th>
              <th className="py-3 px-6 border-b border-gray-700">Audio</th>
              <th className="py-3 px-6 border-b border-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedEntries.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No history found.
                </td>
              </tr>
            ) : (
              pagedEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-[#374151] transition-colors"
                >
                  <td className="py-4 px-6 border-b border-gray-700 whitespace-nowrap">
                    {formatDate(entry.timestamp)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700">
                    <audio
                      controls
                      className="w-60"
                      preload="none"
                      aria-label={`Play audio from ${formatDate(
                        entry.timestamp
                      )}`}
                    >
                      <source src={entry.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-700 text-center space-x-4">
                    <a
                      href={entry.audioUrl}
                      download
                      className="text-blue-400 hover:text-blue-600 font-semibold"
                      aria-label={`Download audio from ${formatDate(
                        entry.timestamp
                      )}`}
                    >
                      Download
                    </a>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                      aria-label={`Delete audio from ${formatDate(
                        entry.timestamp
                      )}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Page navigation"
          className="flex justify-center mt-6 space-x-3 select-none"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border border-gray-600 ${
              currentPage === 1
                ? "text-gray-600 cursor-not-allowed"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`px-4 py-1 rounded-md border border-gray-600 ${
                  currentPage === page
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border border-gray-600 ${
              currentPage === totalPages
                ? "text-gray-600 cursor-not-allowed"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            aria-disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export default History;
