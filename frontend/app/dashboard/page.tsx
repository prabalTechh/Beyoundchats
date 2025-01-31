'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Input from "@/components/Input";
import axios from "axios";
import Card from "@/components/Card";

type MessageOption = "Train Bot" | "Get Started";
const BASE_URL = "http://localhost:4000";

interface Message {
  text: string;
  type: "bot" | "user";
  options?: MessageOption[];
}

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [url, setUrl] = useState("");
  const [user, setUser] = useState<{ data: { name: string } } | null>(null);
  const [urlResponses, setUrlResponses] = useState<{ title: string, description: string, imgUrl: string }[]>([]);
  const [userRes, setUserRes] = useState<{ title: string, description: string, imgUrl: string | "/thumbnail.webp" }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function userData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    userData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function userData() {
      try {
        const response = await axios.get(`${BASE_URL}/scrape/user-data`, {
          headers: {
            Authorization: token,
          },
        });
        
        setUserRes(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    userData();
  }, []);


  useEffect(() => {
    if (!isOpen) return;

    setMessages([{ text: "Hello! 👋 I'm here to help.", type: "bot" }]);

    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Would you like to train the bot or get started?", type: "bot", options: ["Train Bot", "Get Started"] },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOptionClick = (option: MessageOption) => {
    setMessages((prev) => [...prev, { text: option, type: "user" }]);
  };

  const handleTrainBot = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    setMessages((prev) => [...prev, { text: `Training bot with: ${url}`, type: "user" }]);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/scrape`, { url }, {
        headers: {
          Authorization: token,
        },
      });



      const newCard = { title: response.data.addData.title, description: response.data.addData.description, imgUrl: response.data.addData.imgUrl };

      setUrlResponses((prev) => [...prev, newCard]);
      setMessages((prev) => [...prev, { text: `Bot training in progress... ✅`, type: "bot" }]);
    } catch (error) {
      console.error("Error training bot:", error);
      setMessages((prev) => [...prev, { text: "Failed to train the bot. ❌", type: "bot" }]);
    }
  };



  return (
    <div className="h-screen bg-PrimaryBackground text-white">
      <Navbar />
      <div className="h-full bg-PrimaryBackground overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-4 md:px-20 md:py-10">
        <button
          className="underline text-blue-400"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Sign Out
        </button>
        <div>
          <h1 className="text-xl">Welcome, <span className="text-xl font-bold">{user?.data.name}</span></h1>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {userRes.map((response, index) => (
            <Card key={index} title={response.title} description={response.description} imgUrl={response.imgUrl} />
          ))}
        </div>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0  backdrop-blur-sm z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          💬
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 w-72 h-96 bg-white m-2 text-black rounded-lg shadow-lg z-[9999] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.type === "bot" ? "text-left" : "text-right"}`}>
                  <div
                    className={`inline-block p-3 rounded-lg ${message.type === "bot" ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"}`}
                  >
                    {message.text}
                  </div>
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className="w-full p-2 text-sm text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-50 transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <Input
                title="URL"
                type="text"
                placeholder="Enter URL to train the bot..."
                value={url}
                onChange={(e) => {
                  e.preventDefault()
                  setUrl(e.target.value)
                }}
                className="w-full p-2 border rounded text-gray-800"
              />
              <button
                onClick={handleTrainBot}
                className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                Train Bot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
