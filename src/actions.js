import express from 'express'
import { getGroqChatCompletion } from './AI.js'

const router = express.Router()

// POST route to handle chat-box requests
router.post('/', async (req, res) => {
    const { history, philosopher } = req.body;
    try {
        const apiMessage = await getGroqChatCompletion(history, philosopher);
        if (apiMessage && apiMessage.choices && apiMessage.choices.length > 0) {
            const messageContent = apiMessage.choices[0].message.content;
            console.log(messageContent || "Error: No response");
            res.json(messageContent);
        } else {
            console.error("Invalid API response format:", apiMessage);
            res.status(500).json({ error: 'Invalid API response format' });
        }
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router