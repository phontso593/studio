import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    // For now, echo user message as bot reply after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `You said: "${input}"` },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: "300px" }}
    >
      <div style={{ height: "200px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ textAlign: msg.from === "bot" ? "left" : "right" }}
          >
            <p>
              <strong>{msg.from === "bot" ? "Bot" : "You"}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        style={{ width: "80%" }}
      />
      <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
