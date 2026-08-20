import { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your AI Business Twin assistant. Ask me about business planning, ESG, budget or recommendations.",
    },
  ]);

  const generateResponse = (question) => {
    const text = question.toLowerCase();

    if (text.includes("esg")) {
      return "ESG measures Environmental, Social and Governance performance. You can check your detailed ESG score in the ESG Calculation section.";
    }

    if (
      text.includes("budget") ||
      text.includes("money") ||
      text.includes("expense")
    ) {
      return "The Budget Optimizer helps you distribute your startup budget and identify possible savings.";
    }

    if (
      text.includes("business") ||
      text.includes("startup")
    ) {
      return "A good startup plan should clearly define your target market, business model, costs, goals and growth strategy.";
    }

    return "That's an interesting question. I recommend reviewing your startup details, ESG performance and budget before making a business decision.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    const aiMessage = {
      sender: "ai",
      text: generateResponse(message),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      aiMessage,
    ]);

    setMessage("");
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div>
      <h1>AI Chatbot</h1>

      <p>
        Ask questions about your startup, ESG, budget and
        business decisions.
      </p>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "800px",
        }}
      >
        {/* MESSAGE AREA */}

        <div
          style={{
            minHeight: "350px",
            maxHeight: "450px",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {messages.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                textAlign:
                  item.sender === "user"
                    ? "right"
                    : "left",
              }}
            >
              <strong>
                {item.sender === "user"
                  ? "You"
                  : "AI Assistant"}
              </strong>

              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* INPUT */}

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask your question..."
            style={{
              flex: 1,
              padding: "12px",
            }}
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

        <br />

        <button onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default Chatbot;