import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [history, setHistory] = useState([]);

  const translateText = async () => {
    const response = await axios.post("http://localhost:5000/translate", {
      text,
      sourceLang,
      targetLang,
    });
    setTranslatedText(response.data.translatedText);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const response = await axios.get("http://localhost:5000/history");
    setHistory(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Text Translation Tool</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows="4" cols="50" placeholder="Enter text here..."></textarea>
      <br />
      <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <br />
      <button onClick={translateText}>Translate</button>
      <h3>Translation:</h3>
      <p>{translatedText}</p>
      <h3>Translation History:</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.originalText} ({item.sourceLang} → {item.targetLang}): {item.translatedText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
