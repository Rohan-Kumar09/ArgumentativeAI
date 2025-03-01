import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {

    var input = "what is groq";
    var limited = "limited with 250 words, in a paragraph";
    var question = input + limited;
    const chatCompletion = await getGroqChatCompletion(question);
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(question) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: question,
            },
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 100,
    });
}


main()
