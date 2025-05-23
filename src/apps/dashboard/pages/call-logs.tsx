import { useRef, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Download, Play, Pause } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CallLog = {
  id: string;
  fileUrl: string;
  member: string;
  duration: string;
  status: "Missed" | "Connected";
  date: string;
  type: "Call" | "Voice Chat";
};

const dummyData: CallLog[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  fileUrl: "/audio/sample.mp3",
  member: i % 2 === 0 ? "Richel" : "Alex",
  duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")}`,
  status: i % 3 === 0 ? "Missed" : "Connected",
  date: `2025-05-${(i % 28) + 1}`.padStart(10, "0"),
  type: i % 2 === 0 ? "Call" : "Voice Chat",
}));

const fetchCallLogs = async (): Promise<CallLog[]> => {
  return dummyData;
};

const queryClient = new QueryClient();

function CallLogsComponent() {
  const { data = [] } = useQuery<CallLog[]>({
    queryKey: ["callLogs"],
    queryFn: fetchCallLogs,
  });

  const [filters, setFilters] = useState({
    member: "",
    status: "",
    date: "",
    type: "",
  });

  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const handlePlay = (id: string) => {
    const currentAudio = audioRefs.current[id];
    if (!currentAudio) return;

    if (playingId && playingId !== id) {
      const prevAudio = audioRefs.current[playingId];
      prevAudio?.pause();
    }

    if (currentAudio.paused) {
      currentAudio.play();
      setPlayingId(id);
    } else {
      currentAudio.pause();
      setPlayingId(null);
    }
  };

  const handleResetFilters = () =>
    setFilters({ member: "", status: "", date: "", type: "" });

  const filteredLogs = data.filter((log) => {
    return (
      (!filters.member ||
        log.member.toLowerCase().includes(filters.member.toLowerCase())) &&
      (!filters.status || log.status === filters.status) &&
      (!filters.date || log.date === filters.date) &&
      (!filters.type || log.type === filters.type)
    );
  });

  // Pagination logic
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card className="bg-[#0B0D11] border border-gray-700 text-white p-4">
      <CardContent>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Call Logs</h2>
          {/* <p className="text-sm text-gray-400">
            Browse your recent voice activities. Call logs are retained for 30
            days and automatically deleted afterward.
          </p> */}
          <p className="text-sm text-gray-400">
            Browse your recent voice activities. Call logs are retained for{" "}
            <Link
              to="/dashboard/settings/history"
              className="text-blue-400 hover:underline font-medium inline-flex items-center space-x-1"
            >
              <span>30 days</span>
              <span>→</span>
            </Link>{" "}
            and automatically deleted afterward.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={filters.type === "Call" ? "default" : "outline"}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                type: prev.type === "Call" ? "" : "Call",
              }))
            }
            className="text-white bg-[#0B0D11] border-gray-700"
          >
            Call
          </Button>
          <Button
            variant={filters.type === "Voice Chat" ? "default" : "outline"}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                type: prev.type === "Voice Chat" ? "" : "Voice Chat",
              }))
            }
            className="text-white bg-[#0B0D11] border-gray-700"
          >
            Voice Chat
          </Button>
          <Button
            variant="outline"
            className="ml-auto bg-[#0B0D11] text-white border-gray-700"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </div>

        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <Input
            placeholder="Search by name"
            value={filters.member}
            onChange={(e) => setFilters({ ...filters, member: e.target.value })}
            className="bg-[#0B0D11] border-gray-700 text-white placeholder-white"
          />
          <Select
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger className="bg-[#0B0D11] border-gray-700 text-white">
              <SelectValue placeholder="Status" className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Connected">Connected</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full md:w-auto">
            <Input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="bg-[#0B0D11] border-gray-700 text-white placeholder-white pr-10"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="M7 10h5v5H7z" fill="none" />
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14c0 1.11.89 2 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-2">File</th>
                <th className="p-2">Member</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-4">
                    No call logs found.
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-2 flex items-center gap-2">
                      <button onClick={() => handlePlay(log.id)}>
                        {playingId === log.id ? (
                          <Pause size={18} color="white" />
                        ) : (
                          <Play size={18} color="white" />
                        )}
                      </button>
                      <audio
                        // ref={(el) => (audioRefs.current[log.id] = el)}
                        src={log.fileUrl}
                        onEnded={() => setPlayingId(null)}
                      />
                    </td>
                    <td className="p-2">{log.member}</td>
                    <td className="p-2">{log.duration}</td>
                    <td
                      className={cn(
                        "p-2",
                        log.status === "Missed"
                          ? "text-red-400"
                          : "text-green-400"
                      )}
                    >
                      {log.status}
                    </td>
                    <td className="p-2">{log.date}</td>
                    <td className="p-2 flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="destructive" size="sm">
                            <Trash size={14} color="white" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0B0D11] text-white border-gray-700">
                          <p>Are you sure you want to delete this log?</p>
                        </DialogContent>
                      </Dialog>
                      <a href={log.fileUrl} download>
                        <Button size="sm">
                          <Download size={14} color="white" />
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLogs.length > pageSize && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              className="border-gray-700 bg-[#0B0D11] text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 bg-[#0B0D11] text-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-400 mt-4">
          Call logs are retained for 30 days and automatically deleted
          afterward.
        </div>
      </CardContent>
    </Card>
  );
}

export default function CallLogs() {
  return (
    <QueryClientProvider client={queryClient}>
      <CallLogsComponent />
    </QueryClientProvider>
  );
}
