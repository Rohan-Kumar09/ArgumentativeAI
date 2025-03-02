import express from 'express'
import { getGroqChatCompletion } from './AI.js'

const router = express.Router()

// POST route to handle chat-box requests
router.post('/', async (req, res) => {
    const { history } = req.body;
    try {
        const apiMessage = await getGroqChatCompletion(history);
        res.json(apiMessage);
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router