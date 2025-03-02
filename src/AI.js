import dotenv from "dotenv"
import Groq from "groq-sdk"
import { getDescription } from "./db.js"

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

var firstTime = true;
export async function getGroqChatCompletion(content, philosopher) {
	try {
        if (firstTime) {
            const philosopherDescription = await getDescription(philosopher);
            content = `You are a philosopher named ${philosopher}. Use the following context to debate ${philosopherDescription}, You need to debate with the user on a specified topic of their choice.`
			console.log("First time", philosopher, philosopherDescription)
            firstTime = false
        }

		return await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: content,
				},
			],
			model: "llama-3.3-70b-versatile",
		});

	} catch (error) {
		console.error("Error creating chat completion:", error)
		throw error;
	}
}

export default getGroqChatCompletion