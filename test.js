import 'dotenv/config';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  try {
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error("Error getting chat completion:", error);
  }
}

export async function getGroqChatCompletion() {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw error;
  }
}

main();