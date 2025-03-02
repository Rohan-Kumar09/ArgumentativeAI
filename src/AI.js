import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const KEY = "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";
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const groq = new Groq({ apiKey: KEY });
export async function main() {
	try {
		const content = "What is Groq?"; // Sample content
		const chatCompletion = await getGroqChatCompletion(content);
		console.log(chatCompletion.choices[0]?.message?.content || "");
	} catch (error) {
		console.error("Error getting chat completion:", error);
	}
}

export async function getGroqChatCompletion(content) {
	try {
		return await groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: content,
				},
			],
			model: "llama-3.3-70b-versatile",
		});
	} catch (error) {
		console.error("Error creating chat completion:", error);
		throw error;
	}
}

export default getGroqChatCompletion;