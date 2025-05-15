import express, { text } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const SONAR_API_KEY = process.env.SONAR_API_KEY;

const prompts = {
  summary: `You are a professional AI meeting assistant.

Please analyze the following meeting transcript and provide your output in a clean, structured format with clearly labeled sections,  new lines and if possible emojis as well:


1. Meeting Summary:
Summarize the key discussion points and decisions made in a clear and concise way. Use short bullet points grouped by topic (e.g., Product Update, QA, Marketing, etc.). Do not include filler or greetings.

2. Action Items:
List all specific tasks discussed during the meeting. For each task, include:
- Task Description
- Assigned To
- Deadline (if mentioned)

Transcript: ${transcript}
`,
  actionItems: "Extract action items from this meeting transcript.",
  eli5: "Explain this meeting content like I’m five."
};

console.log("USING API KEY", SONAR_API_KEY);

async function callSonar(prompt, input) {
  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt + '\n\n' + input }
        ],
        model: "sonar"
      },
      {
        headers: {
          Authorization: `Bearer ${SONAR_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (err) {
    console.error('Sonar API Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.error?.message || 'Sonar API failed');
  }
}

// 🔥 Named Export — so it can be used in other files like transcriptController.js
export async function analyzeWithAI(transcript) {
  const [summary, actionItems, eli5] = await Promise.all([
    callSonar(prompts.summary, transcript),
    callSonar(prompts.actionItems, transcript),
    callSonar(prompts.eli5, transcript)
  ]);

  return { summary, actionItems, eli5 };
}

// Default export for routing
router.post('/analyze', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  try {
    const result = await analyzeWithAI(transcript);
    console.log("AI Output:", result);
    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    const errorMessage = err.response ? err.response.data : err.message || 'An error occurred during processing';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
