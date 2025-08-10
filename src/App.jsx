import React, { useState, useEffect } from 'react';

function App() {
  const [survivors, setSurvivors] = useState(5);
  const [food, setFood] = useState(50);

  useEffect(() => {
    const id = setInterval(() => {
      setFood(f => +(f + survivors * 0.2).toFixed(1));
    }, 1000);
    return () => clearInterval(id);
  }, [survivors]);

  const scavenge = () => setFood(f => f + 1);

  const recruit = () => {
    if (food >= 10) {
      setFood(f => f - 10);
      setSurvivors(s => s + 1);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Apocalypse Colony</h1>
      <p>Survivors: {survivors}</p>
      <p>Food: {food.toFixed ? food.toFixed(1) : food}</p>
      <button onClick={scavenge}>Scavenge (+1 food)</button>
      <button onClick={recruit} disabled={food < 10} style={{ marginLeft: '1rem' }}>
        Recruit Survivor (10 food)
      </button>
    </div>
  );
}

export default App;
