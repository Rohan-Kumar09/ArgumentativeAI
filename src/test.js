// node init -y
import Groq from "groq-sdk"; // npm install --save groq-sdk
import express from "express"; // npm i express
import cors from "cors";
// import path from "path";  // ✅ Add this import
import { fileURLToPath } from "url";

const KEY = "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";
const groq = new Groq({ apiKey: KEY});

const app = express();
const port = "3000";
app.use(cors());
app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export async function main(question) {
  var inputQuestion = question + " Please limit in 200 words in a paragraph.";
  const chatCompletion = await getGroqChatCompletion(inputQuestion);
  // var answer = chatCompletion.choices[0]?.message?.content;
  // return  answer;
  return chatCompletion.choices[0]?.message?.content || "No response";
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
  });
}

// main("what is groq?");


// app.use(express.static(path.join(__dirname, "../public")));

// Serve chat-box.html on the home route "/"
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "chat-box.html"));
// });


app.get("/", async (req, res)=>{
  // console.log(req.query.name);      // http://localhost:3000/?name=testing:
  // console.log(req.rawHeaders);         // see the info about request,
  var answer = await main("you are the ancient greek philosopher plato and you are engaged in a deep philosophical debate with an opponent. your goal is to present complex and nuanced counter arguments against your oppend. incorporate concepts of platonism such as theory of forms, theory of the soul, and platonist ethice to and this question: is it ok to kill one person and get his organs to save 10 people?");
  res.send(`${ answer }`);   // send resource back
  // res.send("hello world!");
})

// app.post("/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const aiResponse = await main(userMessage);
//     res.json({ reply: aiResponse });
//   } catch (error) {
//     res.status(500).json({ reply: "Error fetching response from Groq." });
//   }
// });
app.listen(port, ()=>{ // anonymous function
  console.log(`servering on ${port}.`);
})