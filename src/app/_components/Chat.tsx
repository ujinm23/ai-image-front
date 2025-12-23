"use client";

import { useState, useRef, useEffect } from "react";
import { MessageIcon } from "@/app/_icons/MessageIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/app/_icons/CloseIcon";
import { Input } from "@/components/ui/input";
import { SendIcon } from "@/app/_icons/SendIcon";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:168/chat", {
        message: input,
      });

      const aiMessage: Message = { role: "assistant", content: response.data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = { role: "assistant", content: "Failed to get response." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

 const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") await sendMessage();
};


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex h-12 w-12 items-center justify-center bg-black rounded-full">
          <MessageIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-95 h-118 flex flex-col p-0">
        <div className="h-12 flex justify-between items-center px-4 border-b border-[#E4E4E7]">
          <p className="font-medium text-[16px]">Chat Assistant</p>
          <div className="w-8 h-8 flex justify-center items-center cursor-pointer">
            <CloseIcon />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 w-full overflow-y-auto px-4 py-2 space-y-2"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${
                msg.role === "user"
                  ? "bg-gray-200 self-end"
                  : "bg-black text-white self-start"
              } max-w-[80%]`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 italic text-sm">Chatbot is thinking...</div>
          )}
        </div>

        <div className="flex px-4 py-2 gap-2 items-center border-t border-[#E4E4E7]">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button
            className="w-10 h-10 bg-black flex items-center justify-center rounded-full"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            <SendIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
