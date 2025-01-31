'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


type MessageOption = 'Login' | 'Sign Up';

interface Message {
  text: string;
  type: 'bot' | 'user';
  options?: MessageOption[];
  functions?: () => void;
}

type ChatStep = 'initial' | 'login' | 'sign up';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages update

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsOpen(false);
      setMessages([{
        text: 'Hello! 👋',
        type: 'bot'
      }]);

      const messageTimer: NodeJS.Timeout = setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Would you like to login or sign up to get started?',
          type: 'bot',
          options: ['Login', 'Sign Up']
        }]);

      }, 2000);



      return () => clearTimeout(messageTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  const handleOptionClick = (option: MessageOption): void => {
    setMessages(prev => [...prev, {
      text: option,
      type: 'user'

    }]);
    setCurrentStep(option.toLowerCase() as ChatStep);
    router.push(option === 'Login' ? '/login' : '/signup');
  };



  return (
    <>
      {/* Blur overlay */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[9998]"
          onClick={() => setIsOpen(true)}
        />
      )}

      <div className="fixed bottom-4 right-4 z-[9999]">
        <div className="relative">
          {/* Chat toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[9999] flex items-center justify-center p-4 rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:inset-0 focus:ring-2 focus:ring-purple-800 transition-colors"
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
          >
            💬
          </button>

          {/* Chat window with floating bubble */}
          {!isOpen && (
            <div className="relative">
              {/* Floating circle */}
              <div className="absolute bottom-[3.7rem] right-7 p-4 rounded-full bg-gradient-to-b from-gray-400 to-bg-pink-800 shadow-md z-[9999]" />
    
              {/* Main chat window */}
              <div className="absolute bottom-24 right-12 w-72 h-80 bg-white rounded-lg shadow-slate-500 shadow z-[9999]">
               
                <div className="h-full w-full flex flex-col p-5">

                  <div className="flex-1 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${message.type === 'bot' ? 'text-left' : 'text-right'}`}
                      >
                        <div className={`inline-block p-3 rounded-lg ${message.type === 'bot'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-500 text-white'
                          }`}>
                          {message.text}
                        </div>
                        {message.options && (
                          <div className="mt-2 space-y-2">
                            {message.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="w-full p-2 text-sm text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-50 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Invisible div for scrolling reference */}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}