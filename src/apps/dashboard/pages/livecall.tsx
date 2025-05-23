import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Mic,
  MicOff,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Circle,
  PhoneCall,
  PhoneOff,
  Bot,
  Download,
  Trash2,
} from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type CallStatus =
  | "idle"
  | "countdown"
  | "connecting"
  | "active"
  | "paused"
  | "disconnected"
  | "error";

interface CallLogEntry {
  id: string;
  aiName: string;
  status: "success" | "missed";
  timestamp: Date;
  audioUrl: string;
}

const AiCallInterface: React.FC = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [countdown, setCountdown] = useState(3);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(50);
  const [aiConnected, setAiConnected] = useState(false);
  const [callLogs, setCallLogs] = useState<CallLogEntry[]>([]);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (callStatus === "countdown") {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownRef.current!);
            setCallStatus("connecting");
            simulateConnection();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [callStatus]);

  const simulateConnection = () => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        setCallStatus("active");
        setAiConnected(true);
      } else {
        setCallStatus("error");
        setAiConnected(false);
        logCall("missed");
      }
    }, 2000);
  };

  const handleStartCall = () => {
    if (callStatus === "idle") {
      setCallStatus("countdown");
      setCountdown(3);
    }
  };

  const handleToggleMute = () => setMuted((prev) => !prev);
  const handleTogglePause = () => {
    setPaused((prev) => !prev);
    setCallStatus((prev) => (prev === "active" ? "paused" : "active"));
  };

  const handleVolumeChange = ([val]: number[]) => setVolume(val);

  const handleEndCall = () => {
    if (["active", "paused", "connecting"].includes(callStatus)) {
      setCallStatus("disconnected");
      setAiConnected(false);
      logCall("success");
    }
  };

  const logCall = (status: "success" | "missed") => {
    const timestamp = new Date();
    const audioUrl = `/dummy-recordings/audio-${Math.floor(
      Math.random() * 100
    )}.mp3`;
    setCallLogs((prev) => [
      {
        id: crypto.randomUUID(),
        aiName: "VoiceAI",
        status,
        timestamp,
        audioUrl,
      },
      ...prev,
    ]);
  };

  const deleteLog = (id: string) => {
    setCallLogs((logs) => logs.filter((log) => log.id !== id));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

  const callStatusLabel = {
    idle: "Idle",
    countdown: `Starting in ${countdown}...`,
    connecting: "Connecting...",
    active: "Live with AI",
    paused: "Paused",
    disconnected: "Call Ended",
    error: "Connection Failed",
  };

  return (
    <div className="w-full h-full  mx-auto p-4 rounded-2xl shadow-xl bg-gray-700 dark:bg-zinc-900 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">AI Voice Call </h2>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mt-2">
          <Bot
            className={clsx(
              "w-5 h-5",
              aiConnected ? "text-green-500" : "text-zinc-400"
            )}
          />
          AI {aiConnected ? "Connected" : "Disconnected"}
          <Circle
            className={clsx("w-3 h-3", {
              "text-green-500 animate-pulse": callStatus === "active",
              "text-yellow-500 animate-pulse": callStatus === "connecting",
              "text-zinc-400":
                callStatus === "idle" || callStatus === "disconnected",
              "text-red-500": callStatus === "error",
            })}
          />
          {callStatusLabel[callStatus]}
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex justify-center gap-6 flex-wrap">
        {callStatus === "idle" && (
          <Button onClick={handleStartCall} className="text-lg px-8 py-4">
            <PhoneCall className="mr-2" /> Start Call
          </Button>
        )}

        {callStatus === "connecting" && (
          <Button variant="destructive" onClick={handleEndCall}>
            <PhoneOff className="mr-2" /> Cancel
          </Button>
        )}

        {(callStatus === "active" || callStatus === "paused") && (
          <>
            <Button variant="ghost" onClick={handleToggleMute}>
              {muted ? <MicOff className="text-red-500" /> : <Mic />}
            </Button>
            <Button variant="ghost" onClick={handleTogglePause}>
              {paused ? <Play /> : <Pause />}
            </Button>
            <Button variant="destructive" onClick={handleEndCall}>
              <PhoneOff />
            </Button>
          </>
        )}
      </div>

      {/* Volume Slider */}
      {(callStatus === "active" || callStatus === "paused") && (
        <div className="flex items-center gap-4 max-w-sm mx-auto">
          <VolumeX />
          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
          />
          <Volume2 />
        </div>
      )}

      {/* Error State */}
      {callStatus === "error" && (
        <div className="text-red-500 text-center font-medium">
          AI failed to connect. Please try again.
        </div>
      )}

      {/* Call Logs */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Call History</h3>
        <p className="text-sm text-gray-400">
          By default, your AI call history is retained for{" "}
          <Link
            to="/dashboard/settings/history"
            className="text-blue-400 hover:underline font-medium inline-flex items-center space-x-1"
          >
            <span>30 days</span>
            <span>→</span>
          </Link>
          . You can change this retention period anytime by clicking the link
          above. All call logs are automatically deleted after their retention
          period.
        </p>
        {callLogs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No call history yet.</p>
        ) : (
          <ul className="space-y-4">
            {callLogs.map((log) => (
              <li
                key={log.id}
                className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex flex-col gap-1 text-sm">
                  <div>
                    <strong>AI:</strong> {log.aiName}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    {log.status === "success" ? "Success" : "Missed"}
                  </div>
                  <div>
                    <strong>Date:</strong> {formatDate(log.timestamp)}
                  </div>
                  <div>
                    <strong>Time:</strong> {formatTime(log.timestamp)}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <audio controls src={log.audioUrl} className="w-64" />
                  <div className="flex gap-2">
                    <a href={log.audioUrl} download>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4 text-green-400" />
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteLog(log.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AiCallInterface;
