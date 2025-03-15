import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { translateText } from "../Api/translateApi";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const handleTranslate = async () => {
    const translation = await translateText(inputText, sourceLang, targetLang);
    setTranslatedText(translation);
  };

  return (
    <div className="translator">
      <h2>Text Translator</h2>
      <div className="selectors">
        <LanguageSelector
          languages={languages}
          selectedLanguage={sourceLang}
          onChange={setSourceLang}
        />
        <LanguageSelector
          languages={languages}
          selectedLanguage={targetLang}
          onChange={setTargetLang}
        />
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text..."
      />
      <button onClick={handleTranslate}>Translate</button>
      <h3>Translated Text:</h3>
      <p>{translatedText}</p>
    </div>
  );
};

export default Translator;
