import { useState } from "react";

function FileUpload({ setTranscript }) {
  const [text, setText] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.readAsText(file);
  };

  const handleUseText = () => {
    setTranscript(text);
    alert("Transcript ready to process!!");
  };

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-300">
      <label className="block mb-3 text-lg font-semibold text-gray-800">
        Upload .txt file or Paste Transcript:
      </label>
      <input 
        type="file" 
        accept=".txt" 
        onChange={handleFile} 
        className="mb-4 px-4 py-2 bg-blue/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        rows="8"
        className="w-full border p-4 rounded-lg bg-white/50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        placeholder="Or paste your transcript here..."
      ></textarea>
      <button
        onClick={handleUseText}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Use This Transcript
      </button>
    </div>
  );
}

export default FileUpload;
