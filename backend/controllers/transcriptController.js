import { analyzeWithAI } from '../routes/sonar.js';
export const analyzeTranscript = async (req, res) => {
  const { transcriptText } = req.body;
  
  try {
    // Call Perplexity Sonar API or any processing logic
    const result = await analyzeWithAI(transcriptText);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error analyzing transcript:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
            