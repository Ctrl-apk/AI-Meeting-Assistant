import express from 'express';
import router from './routes/transcriptRoutes.js'; // Use actual filename
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/', router); // Make sure your router file uses ES exports too

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
