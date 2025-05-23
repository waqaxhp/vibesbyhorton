import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type Message = {
  id: number;
  sender: "user" | "bot";
  content: string;
  timestamp: string;
};

const fetchBotReply = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE", // Replace this!
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // Or try mistralai/mixtral or anthropic/claude-2
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content;
    return botReply || "Sorry, I couldn't process that.";
  } catch (error) {
    console.error("Bot error:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageIdRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: ++messageIdRef.current,
      sender: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await fetchBotReply(trimmed);
    const botMessage: Message = {
      id: ++messageIdRef.current,
      sender: "bot",
      content: reply,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="bg-[#0B0D11] h-full  text-white p-4 md:p-6 mx-auto w-full flex flex-col">
      <div className="text-xl font-bold">🤖 ChatBot Assistant</div>
      <p className=" p-3 text-sm text-gray-400 ">
        By default, your AI Chat history is retained for{" "}
        <Link
          to="/dashboard/settings/history"
          className="text-blue-400 hover:underline font-medium inline-flex items-center space-x-1"
        >
          <span>30 days</span>
          <span>→</span>
        </Link>
        . You can adjust this retention period at any time by clicking the link
        above. All Chat logs are automatically deleted after their set duration.
      </p>
      <div
        className="flex-1 overflow-y-auto border border-gray-700 rounded p-4 space-y-4 bg-gray-900"
        role="log"
        aria-live="polite"
        tabIndex={0}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <div>{msg.content}</div>
              <div className="text-[10px] text-gray-400 text-right mt-1">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 italic">Thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 rounded-l bg-gray-800 text-white border border-gray-700 outline-none"
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
