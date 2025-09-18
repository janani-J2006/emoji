import { useState } from "react";
import "./App.css"; // make sure you have styles here

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const searchEmoji = async () => {
    if (!query) return;
    const res = await fetch(
      `https://emoji-api.com/emojis?search=${query}&access_key=7a84bffc24e8b3808c42f93a12aea093bf822c92`
    );
    const data = await res.json();
    setResults(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchEmoji();
    }
  };

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setMessage(`Copied ${emoji} to clipboard!`);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Emoji Search 🔍</h1>

        {/* Search box */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search (e.g. smile, heart, cat)"
          style={{
            padding: "12px",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={searchEmoji}
          style={{
            marginLeft: "10px",
            padding: "12px 16px",
            border: "none",
            background: "#4a90e2",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {/* Copy message */}
        <p className={`copy-message ${message ? "show" : ""}`}>{message}</p>

        {/* Results */}
        <div
          style={{
            marginTop: "25px",
            fontSize: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {results.length > 0 ? (
            results.map((emoji) => (
              <span
                key={emoji.slug}
                className="emoji"
                onClick={() => copyEmoji(emoji.character)}
              >
                {emoji.character}
              </span>
            ))
          ) : (
            <p style={{ color: "#888" }}>Type something to see emojis!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
