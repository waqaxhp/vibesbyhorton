import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type Voice = SpeechSynthesisVoice;

type Person = {
  id: number;
  name: string;
  gender: string;
  accent: string;
  voice: Voice;
};

const fakeNames = [
  "Oliver Smith",
  "Amelia Jones",
  "Harry Brown",
  "Isla Taylor",
  "George Wilson",
  "Emily Davies",
  "Jack Evans",
  "Sophia Thomas",
  "Charlie Johnson",
  "Mia Roberts",
  "Thomas Walker",
  "Grace White",
  "James Green",
  "Evie Hall",
  "Leo Clark",
];

const TextToSpeech = () => {
  const [text, setText] = useState<string>("");
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [sampleData, setSampleData] = useState<Person[]>([]);
  const voicesLoaded = useRef<boolean>(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesLoaded.current = true;
        setAvailableVoices(voices);

        const mapped = fakeNames.map((name, index) => {
          const assignedVoice = voices[index % voices.length];
          return {
            id: index,
            name,
            gender: index % 2 === 0 ? "Male" : "Female",
            accent: assignedVoice.lang || "Unknown",
            voice: assignedVoice,
          };
        });

        setSampleData(mapped);
      }
    };

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = (voice: Voice) => {
    if (!voice || !voicesLoaded.current) {
      alert("Voice not available yet. Please wait a moment or reload.");
      return;
    }

    if (!text.trim()) {
      alert("Please enter some text to speak.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-[#0B0D11] text-white min-h-screen p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-4 rounded bg-gray-800 text-white resize-none"
            placeholder="Enter your text here..."
          />
          <button
            onClick={() =>
              setText(
                "Hello! This is a sample text spoken by a selected voice."
              )
            }
            className="mt-4 bg-gray-800 cursor-pointer text-white px-6 py-2 rounded"
          >
            Sample Text
          </button>
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-gray-900 p-4 rounded shadow-md h-80 flex flex-col">
            <h2 className="text-xl font-semibold mb-3">Voice List</h2>
            <div className="overflow-y-scroll flex-1">
              <table className="w-full text-left table-auto">
                <thead className="sticky top-0 bg-gray-900 z-10">
                  <tr>
                    <th className="p-2">Play</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Gender</th>
                    <th className="p-2">Accent</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-800">
                      <td className="p-2">
                        <button
                          className="text-blue-400 hover:text-blue-600"
                          onClick={() => speak(person.voice)}
                        >
                          <Play size={18} />
                        </button>
                      </td>
                      <td className="p-2">{person.name}</td>
                      <td className="p-2">{person.gender}</td>
                      <td className="p-2">{person.accent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {availableVoices.length === 0 && (
                <p className="text-sm text-red-400 mt-4">
                  No voices available yet. Try using a modern browser like
                  Chrome or Edge.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
