const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: process.env.SYSTEM_INSTRUCTIONS,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [
  ],
  responseMimeType: "text/plain",
};

exports.getAIResponse = async (content) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const response = await chatSession.sendMessage(content);

  return response;
}