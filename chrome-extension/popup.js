document.getElementById('processBtn').addEventListener('click', async () => {
  const transcript = document.getElementById('transcript').value.trim();
  if (!transcript) return alert('Please paste a transcript first.');

  try {
    const res = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    });

    const data = await res.json();

    document.getElementById('summary').textContent = data.summary;

    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    data.actionItems.split('\n').forEach(item => {
      if (item.trim()) {
        const li = document.createElement('li');
        li.textContent = item;
        tasksList.appendChild(li);
      }
    });

    const eli5List = document.getElementById('eli5');
    eli5List.innerHTML = '';
    data.eli5.split('\n').forEach(item => {
      if (item.trim()) {
        const li = document.createElement('li');
        li.textContent = item;
        eli5List.appendChild(li);
      }
    });

  } catch (err) {
    alert('Failed to process transcript.');
    console.error(err);
  }
});
