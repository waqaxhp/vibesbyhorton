import { useRef, useState } from "react";
import { Play, Pause, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
// import { cn } from "@/lib/utils";

interface Voice {
  id: string;
  fileUrl: string;
  name: string;
  category: "Custom" | "Standard";
  accent: string;
  age: string;
  gender: string;
  isActive: boolean;
}

const dummyVoices: Voice[] = [
  {
    id: "1",
    fileUrl: "/audio/sample1.mp3",
    name: "Emma",
    category: "Standard",
    accent: "British",
    age: "30",
    gender: "Female",
    isActive: true,
  },
  {
    id: "2",
    fileUrl: "/audio/sample2.mp3",
    name: "Custom Voice 1",
    category: "Custom",
    accent: "American",
    age: "25",
    gender: "Male",
    isActive: false,
  },
];

function Voices() {
  const [voices, setVoices] = useState<Voice[]>(dummyVoices);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    accent: "",
    age: "",
  });
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  // const [chunks, setChunks] = useState<Blob[]>([]);
  const [newVoice, setNewVoice] = useState({ name: "", age: "", gender: "" });

  const filteredVoices = voices.filter((v) => {
    return (
      (!filters.name ||
        v.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.category || v.category === filters.category) &&
      (!filters.accent || v.accent === filters.accent) &&
      (!filters.age || v.age === filters.age)
    );
  });

  const paginatedVoices = filteredVoices.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(filteredVoices.length / perPage);

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

  const handleToggleActive = (id: string) => {
    setVoices((prev) =>
      prev.map((voice) => ({ ...voice, isActive: voice.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    setVoices((prev) => prev.filter((v) => v.id !== id));
  };

  const handleAddVoice = () => {
    if (
      !recordedAudioUrl ||
      !newVoice.name ||
      !newVoice.age ||
      !newVoice.gender
    )
      return;
    const newId = (voices.length + 1).toString();
    const newVoiceObj: Voice = {
      id: newId,
      fileUrl: recordedAudioUrl,
      name: newVoice.name,
      age: newVoice.age,
      gender: newVoice.gender,
      accent: "American",
      category: "Custom",
      isActive: false,
    };
    setVoices((prev) => [...prev, newVoiceObj]);
    setShowDialog(false);
    setRecordedAudioUrl(null);
    setNewVoice({ name: "", age: "", gender: "" });
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    mediaRecorder.start();
    const newChunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => newChunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(newChunks, { type: "audio/mp3" });
      setRecordedAudioUrl(URL.createObjectURL(blob));
      // setChunks([]);
    };
    // setChunks(newChunks);
  };

  const stopRecording = () => {
    recorder?.stop();
    setRecorder(null);
  };

  return (
    <Card className="bg-[#0B0D11] text-white border border-gray-700 p-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Voices</h2>

        <div className="flex flex-wrap gap-2 items-center mb-4">
          <Input
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="bg-[#0B0D11] text-white border-gray-700"
          />
          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, category: value })
            }
          >
            <SelectTrigger className="bg-[#0B0D11] text-white border-gray-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Custom">Custom</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Accent"
            value={filters.accent}
            onChange={(e) => setFilters({ ...filters, accent: e.target.value })}
            className="bg-[#0B0D11] text-white border-gray-700"
          />
          <Input
            placeholder="Age"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
            className="bg-[#0B0D11] text-white border-gray-700"
          />
          <Button
            className=" text-white bg-[#0B0D11] border-gray-700 "
            variant="outline"
            onClick={() =>
              setFilters({ name: "", category: "", accent: "", age: "" })
            }
          >
            Reset Filters
          </Button>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              {/* <Button className="ml-auto ">Add Voice</Button> */}
              <Button
                className="ml-auto text-white border border-white bg-transparent hover:bg-white hover:text-black transition-colors"
                variant="outline"
              >
                Add Voice
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0B0D11] text-white border border-gray-700">
              <h3 className="text-lg font-semibold mb-2">Add New Voice</h3>
              <Input
                placeholder="Name"
                value={newVoice.name}
                onChange={(e) =>
                  setNewVoice({ ...newVoice, name: e.target.value })
                }
                className="bg-[#0B0D11] text-white border-gray-700"
              />
              <Input
                placeholder="Age"
                value={newVoice.age}
                onChange={(e) =>
                  setNewVoice({ ...newVoice, age: e.target.value })
                }
                className="bg-[#0B0D11] text-white border-gray-700"
              />
              <Select
                onValueChange={(value) =>
                  setNewVoice({ ...newVoice, gender: value })
                }
              >
                <SelectTrigger className="bg-[#0B0D11] text-white border-gray-700">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 my-2">
                <Button
                  className="text-white bg-[#0B0D11] border-gray-700"
                  variant="outline"
                  onClick={startRecording}
                  disabled={!!recorder}
                >
                  Start Recording
                </Button>
                <Button
                  className="text-white bg-[#0B0D11] border-gray-700"
                  variant="outline"
                  onClick={stopRecording}
                  disabled={!recorder}
                >
                  Stop Recording
                </Button>
              </div>
              {recordedAudioUrl && (
                <audio controls src={recordedAudioUrl} className="w-full" />
              )}
              <Button onClick={handleAddVoice}>Save</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-2">File</th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Accent</th>
                <th className="p-2">Age</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-400">
                    No voices found.
                  </td>
                </tr>
              ) : (
                paginatedVoices.map((voice) => (
                  <tr
                    key={voice.id}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-2">
                      <button onClick={() => handlePlay(voice.id)}>
                        {playingId === voice.id ? (
                          <Pause size={18} color="white" />
                        ) : (
                          <Play size={18} color="white" />
                        )}
                      </button>
                      <audio
                        src={voice.fileUrl}
                        // ref={(el) => (audioRefs.current[voice.id] = el)}
                        onEnded={() => setPlayingId(null)}
                      />
                    </td>
                    <td className="p-2">{voice.name}</td>
                    <td className="p-2">{voice.category}</td>
                    <td className="p-2">{voice.accent}</td>
                    <td className="p-2">{voice.age}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Button
                        className={`text-white border-gray-700 ${
                          voice.isActive
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-[#0B0D11]"
                        }`}
                        size="sm"
                        variant={voice.isActive ? "default" : "outline"}
                        onClick={() => handleToggleActive(voice.id)}
                      >
                        {voice.isActive ? "Using" : "Use"}
                      </Button>

                      {voice.category === "Custom" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(voice.id)}
                        >
                          <Trash size={14} color="white" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <p>Total Rows: {filteredVoices.length}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Voices;
