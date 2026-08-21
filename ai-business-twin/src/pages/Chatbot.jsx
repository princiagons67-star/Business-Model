import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI Business Twin assistant. How can I help with your startup?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
      {
        sender: "bot",
        text: "Based on your business data, I recommend reviewing your ESG performance, budget allocation and growth strategy.",
      },
    ]);

    setInput("");
  };

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>AI Business Assistant</h1>
          <p>
            Ask questions about your startup and business strategy.
          </p>
        </div>
      </div>

      <div className="chat-container">

        <div className="chat-header">
          <h2>✦ AI Business Twin</h2>
          <p>Business intelligence assistant</p>
        </div>

        <div className="chat-messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}

        </div>

        <div className="chat-input">

          <input
            className="form-control"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask your AI assistant..."
          />

          <button
            className="btn btn-primary"
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbot;