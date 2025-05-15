function ActionItems({ tasks }) {
  return (
    <div className="mt-6 p-6 bg-white bg-opacity-90 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
        📝 Action Items
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {tasks.map((task, index) => (
          <li key={index} className="pl-1 leading-relaxed">
            {task}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ActionItems;
