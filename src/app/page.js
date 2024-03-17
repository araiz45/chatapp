"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientMessage, setClientMessage] = useState([]);
  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("message", (msg) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setClientMessage((prev) => [...prev, message]);
      console.log(clientMessage);
      socket.emit("message", message);
      setMessage("");
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          {clientMessage.map((msg, index) => (
            <span
              key={index}
              className="bg-green-900 my-5 text-white py-4 px-3 rounded-full"
            >
              {msg}
            </span>
          ))}
        </div>
        <div className="flex flex-col ">
          {messages.map((msg, index) => (
            <span
              key={index}
              className="bg-red-900 my-3 text-white py-4 px-3 rounded-full"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border-2 border-gray-800 py-3 px-2"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-800 text-white py-3 px-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
