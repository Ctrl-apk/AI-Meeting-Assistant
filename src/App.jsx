import { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryOutput from "./components/SummaryOutput";
import ActionItems from "./components/ActionItems";
import ELI5Output from "./components/ELI5Output";

function App() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [tasks, setTasks] = useState([]);
  const [eli5, setEli5] = useState([]);

  return (
    <div className="min-h-screen bg-[url('/Meeting-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8">
      <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Summarize My Meeting Smartly
        </h1>

        <FileUpload setTranscript={setTranscript} />

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
            onClick={async () => {
              setLoading(true);
              try {
                const response = await fetch("http://localhost:5000/api/process", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ transcript }),
                });
                const data = await response.json();
                setSummary(data.summary);
                setTasks(data.tasks);
                setEli5(data.eli5);
              } catch (err) {
                alert("Error Processing the transcript");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Transcript"}
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {summary && <SummaryOutput summary={summary} />}
          {tasks.length > 0 && <ActionItems tasks={tasks} />}
          {eli5.length > 0 && <ELI5Output eli5={eli5} />}
        </div>
      </div>
    </div>
  );
}

export default App;
