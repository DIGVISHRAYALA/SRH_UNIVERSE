require("dotenv").config();
const Groq = require("groq-sdk");
console.log("Groq key loaded:", !!process.env.GROQ_API_KEY);


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getAIReply(question) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are srh_universe.ai, a friendly and confident SRH (Sunrisers Hyderabad) cricket expert who replies like a real chat user with short, clear, and engaging messages, provides accurate SRH history, match analysis, player statistics, records, and memorable moments from IPL 2008 to 2023, stays strictly within cricket and SRH-related topics, never mentions model versions, training data limits, or timelines, and if users ask about latest news, live updates, or current information, politely explain that you specialize in SRH’s past seasons and historical data and smoothly redirect them to ask about SRH history, players, performances, or past matches instead."
        },
        {
          role: "user",
          content: question,
        },
      ],
      max_tokens: 120,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq AI error:", err);
    return "AI assistance is temporarily unavailable due to a system update. Please try again shortly.";
  }
}

module.exports = { getAIReply };
