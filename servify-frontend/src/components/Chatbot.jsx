import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import ServiceCard from "./ServiceCard";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  // Access your Redux store for the "In-Chat Card" feature
  const allServices = useSelector((store) => store.service.onlyServices);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", type: "text" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await axiosInstance.post(
        "https://servify-backend-bvwf.onrender.com/chat/",
        {
          message: input,
        },
      );

      const botRawText = response.data.text;
      const jsonMatch = botRawText.match(/\{.*\}/s);

      if (jsonMatch) {
        const cardData = JSON.parse(jsonMatch[0]);
        // Filter services from your Redux store using the IDs from Gemini
        const foundServices = allServices.filter((s) =>
          cardData.display_cards.includes(s.id),
        );

        setMessages((prev) => [
          ...prev,
          {
            text: botRawText.replace(jsonMatch[0], ""),
            sender: "bot",
            type: "card",
            cards: foundServices,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: botRawText, sender: "bot", type: "text" },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    }
  };

  return (
    /* OUTER WRAPPER: Fixed to bottom right, high z-index */
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      {/* 1. THE CHAT WINDOW */}
      {isOpen && (
        <div
          className="mb-4 flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200 
                        w-[92vw] sm:w-[450px] lg:w-[400px] h-[550px] lg:h-[550px] animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-lg">Servify AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4"
          >
            {/* Welcome Message */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700">
              Hi! I can find you the best cleaners, technicians, or therapists.
              What do you need?
            </div>

            {/* Dynamic Messages */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-2`}
              >
                {msg.text && (
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Render Service Cards if type is card */}
                {msg.type === "card" &&
                  //   msg.cards.map((service) => (
                  //     <div
                  //       key={service.id}
                  //       className="w-full max-w-[280px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md animate-in zoom-in-95 duration-300"
                  //     >
                  //       <img
                  //         src={service.image_url}
                  //         alt={service.name}
                  //         className="w-full h-32 object-cover"
                  //       />
                  //       <div className="p-3">
                  //         <h4 className="font-bold text-sm text-gray-900">
                  //           {service.name}
                  //         </h4>
                  //         <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  //           {service.description}
                  //         </p>
                  //         <button className="mt-3 w-full py-2 bg-blue-50 text-blue-600 text-xs rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors">
                  //           View Details
                  //         </button>
                  //       </div>
                  //     </div>
                  //   ))
                  msg.cards.map((serviceItems) => (
                    <div key={serviceItems.id} className="px-2 pb-6">
                      <ServiceCard
                        serviceData={serviceItems}
                        itemState={true}
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-all active:scale-90 shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 2. THE FLOATING TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 
                   ${isOpen ? "bg-white text-gray-600 scale-90" : "bg-blue-600 text-white hover:scale-110 hover:shadow-blue-200"}`}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};

export default Chatbot;
