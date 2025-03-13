require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Translation History Schema
const TranslationSchema = new mongoose.Schema({
  originalText: String,
  translatedText: String,
  sourceLang: String,
  targetLang: String,
  timestamp: { type: Date, default: Date.now }
});

const Translation = mongoose.model("Translation", TranslationSchema);

// Translate Text API
app.post("/translate", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );

    const translatedText = response.data.responseData.translatedText;

    // Save to DB
    const translation = new Translation({ originalText: text, translatedText, sourceLang, targetLang });
    await translation.save();

    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});

// Get Translation History
app.get("/history", async (req, res) => {
  const history = await Translation.find().sort({ timestamp: -1 });
  res.json(history);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
