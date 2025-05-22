import React, { useRef, useState } from "react";
import { Mic, UserCircle, Bot } from "lucide-react";

const VoiceBotChat: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState<
    {
      from: "user" | "bot";
      audioUrl?: string;
      duration?: number;
      status?: "listening" | "thinking" | "done";
    }[]
  >([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;

    mediaRecorderRef.current = mediaRecorder;
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        if (audio.duration === Infinity) {
          audio.currentTime = Number.MAX_SAFE_INTEGER;
          audio.ontimeupdate = () => {
            audio.ontimeupdate = null;
            audio.currentTime = 0;
            finalizeAudio(audio.duration);
          };
        } else {
          finalizeAudio(audio.duration);
        }
      };
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    drawWaveform(analyser);
    detectSilence(analyser, 1500);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setRecordingTime(0);

    clearInterval(recordingIntervalRef.current!);
    silenceTimeoutRef.current && clearTimeout(silenceTimeoutRef.current);
    audioContextRef.current?.close();
  };

  const detectSilence = (
    analyser: AnalyserNode,
    skipMs = 1500,
    threshold = 10,
    timeout = 1500
  ) => {
    const data = new Uint8Array(analyser.fftSize);
    const start = Date.now();

    const check = () => {
      if (!isRecording) return;
      analyser.getByteTimeDomainData(data);
      const maxVolume = Math.max(...data.map((v) => Math.abs(v - 128)));
      const recordingTime = Date.now() - start;

      if (maxVolume < threshold && recordingTime > skipMs) {
        silenceTimeoutRef.current = setTimeout(stopRecording, timeout);
      } else {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      }

      requestAnimationFrame(check);
    };

    check();
  };

  const drawWaveform = (analyser: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !isRecording) return;

      analyser.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      for (let i = 0; i < bufferLength; i++) {
        const x = (i / bufferLength) * canvas.width;
        const y = (dataArray[i] / 128.0) * (canvas.height / 2);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(draw);
    };

    draw();
  };

  const finalizeAudio = (duration: number) => {
    const userVoice = {
      from: "user" as const,
      audioUrl: URL.createObjectURL(
        new Blob(audioChunksRef.current, { type: "audio/webm" })
      ),
      duration: parseFloat(duration.toFixed(1)),
    };

    setMessages((prev) => [...prev, userVoice]);

    // Start listening phase
    setMessages((prev) => [...prev, { from: "bot", status: "listening" }]);

    // Show "Listening..." for 3 seconds
    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", status: "thinking" },
      ]);

      // Simulate thinking time = user duration + 3s
      const thinkingTimeMs = (duration + 3) * 1000;

      setTimeout(() => {
        const replyDuration = 2.5;

        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            from: "bot",
            audioUrl: "/sample-reply.mp3",
            duration: parseFloat(replyDuration.toFixed(1)),
            status: "done",
          },
        ]);

        new Audio("/sample-reply.mp3").play();
      }, thinkingTimeMs);
    }, 3000); // 3 seconds of listening
  };

  // const sendVoiceToAPI = async (blob: Blob, userDuration: number) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("voice", blob, "voice.webm");

  //     const delay = (userDuration + 3) * 1000;

  //     setTimeout(() => {
  //       const replyDuration = 2.5;

  //       setMessages((prev) => [
  //         ...prev.slice(0, -1),
  //         {
  //           from: "bot",
  //           audioUrl: "/sample-reply.mp3",
  //           duration: parseFloat(replyDuration.toFixed(1)),
  //           status: "done",
  //         },
  //       ]);

  //       new Audio("/sample-reply.mp3").play();
  //     }, delay);
  //   } catch (err) {
  //     console.error("API error", err);
  //     setMessages((prev) => [...prev.slice(0, -1)]);
  //   }
  // };

  return (
    <div className="flex flex-col h-full min-h-full bg-gray-950 text-white">
      <div className="p-3 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-base font-semibold">🎤 VoiceBot Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start max-w-[75%] space-x-3 ${
              msg.from === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Profile Icon */}
            <div className="shrink-0">
              {msg.from === "user" ? (
                <UserCircle className="w-7 h-7 text-zinc-800 dark:text-zinc-200" />
              ) : (
                <Bot className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`p-3 rounded-2xl text-sm flex flex-col shadow-md ${
                msg.from === "user"
                  ? "bg-gradient-to-tr from-gray-800 to-gray-100 text-white"
                  : "bg-gradient-to-tr from-zinc-500 to-zinc-100 text-zinc-800 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                {msg.audioUrl && msg.duration !== undefined && (
                  <>
                    <audio
                      controls
                      src={msg.audioUrl}
                      className="w-48 h-8 rounded-md"
                    />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {msg.duration.toFixed(1)}s
                    </span>
                  </>
                )}

                {msg.status === "listening" && (
                  <span className="text-xs text-zinc-500 animate-pulse">
                    👂 Listening...
                  </span>
                )}
                {msg.status === "thinking" && (
                  <span className="text-xs text-zinc-500 animate-pulse">
                    🤖 Thinking...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-800">
        {isRecording && (
          <canvas
            ref={canvasRef}
            width={300}
            height={50}
            className="w-full mb-2 rounded bg-black"
          />
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={handleRecord}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
              isRecording
                ? "bg-green-600 animate-pulse"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Mic size={24} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-1">
          {isRecording ? `Recording... (${recordingTime}s)` : "Tap to record"}
        </p>
      </div>
    </div>
  );
};

export default VoiceBotChat;
