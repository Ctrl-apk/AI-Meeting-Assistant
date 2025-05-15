// transcriptRoutes.js
import express from 'express';
import { analyzeTranscript } from '../controllers/transcriptController.js';

const router = express.Router();

router.post('/analyze', analyzeTranscript);

export default router;
