function ELI5Output({ eli5 }) {
  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg">ELI5 Explanations</h2>
      <ul className="list-disc pl-5">
        {eli5.map((item, index) => (
          <li key={index}>
            <strong>{item.term}</strong>: {item.explanation}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ELI5Output;
