import React, { useEffect, useRef, useState } from "react";
import emojiMap from "../data/emojiMap"; 
import "../components/ChatInputWithEmoji.css"; 

const ChatInputWithEmoji = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    autoResize();
    const words = value.trim().toLowerCase().split(" ");
    const lastWord = words[words.length - 1];
    const matchedEmojis = [];

    if (lastWord.length > 0 && emojiMap[lastWord]) {
      for (let i = 0; i < Math.min(3, emojiMap[lastWord].length); i++) {
        matchedEmojis.push(emojiMap[lastWord][i]);
      }
    }

    setSuggestions(matchedEmojis);
  }, [value]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleEmojiClick = (emoji) => {
    const words = value.trim().split(" ");
    words[words.length - 1] = words[words.length - 1] + " " + emoji;
    const newText = words.join(" ") + " ";
    setValue(newText);
    setSuggestions([]);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "500px", minWidth: "500px" }}>
      <textarea
        ref={textareaRef}
        className="chat-input"
        placeholder="Type a message..."
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="emoji-suggestions visible">
          {suggestions.map((emoji, index) => (
            <div
              key={index}
              className="emoji-suggestion-item"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInputWithEmoji;
