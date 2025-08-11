import React, { useState, useEffect } from 'react';

const RESOURCES = {
  food: { label: 'Food' },
  scrap: { label: 'Scrap' }
};

const BUILDINGS = {
  greenhouse: {
    label: 'Greenhouse',
    cost: { scrap: 20 },
    effect: { food: 1 }
  },
  scrapyard: {
    label: 'Scrap Yard',
    cost: { scrap: 10 },
    effect: { scrap: 0.5 }
  }
};

function App() {
  const [survivors, setSurvivors] = useState(5);
  const [resources, setResources] = useState({ food: 50, scrap: 0 });
  const [buildings, setBuildings] = useState({ greenhouse: 0, scrapyard: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setResources(r => {
        const next = { ...r };
        next.food = +(next.food + survivors * 0.2).toFixed(1);
        next.scrap = +(next.scrap + 0.1).toFixed(1);
        Object.entries(buildings).forEach(([key, count]) => {
          const eff = BUILDINGS[key].effect;
          Object.entries(eff).forEach(([res, val]) => {
            next[res] = +(next[res] + val * count).toFixed(1);
          });
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [survivors, buildings]);

  const scavenge = () => setResources(r => ({ ...r, food: r.food + 1 }));

  const recruit = () => {
    if (resources.food >= 10) {
      setResources(r => ({ ...r, food: r.food - 10 }));
      setSurvivors(s => s + 1);
    }
  };

  const build = key => {
    const b = BUILDINGS[key];
    const canBuild = Object.entries(b.cost).every(([res, cost]) => resources[res] >= cost);
    if (!canBuild) return;
    setResources(r => {
      const next = { ...r };
      Object.entries(b.cost).forEach(([res, cost]) => {
        next[res] -= cost;
      });
      return next;
    });
    setBuildings(bs => ({ ...bs, [key]: bs[key] + 1 }));
  };

  const resourceBarStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    background: '#222',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '4px'
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <h1>Wasteland Camp</h1>
      <div style={resourceBarStyle}>
        <span>Survivors: {survivors}</span>
        {Object.keys(RESOURCES).map(key => (
          <span key={key}>
            {RESOURCES[key].label}: {resources[key].toFixed(1)}
          </span>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={scavenge}>Scavenge (+1 food)</button>
        <button onClick={recruit} disabled={resources.food < 10} style={{ marginLeft: '1rem' }}>
          Recruit Survivor (10 food)
        </button>
      </div>

      <h2 style={{ marginTop: '1.5rem' }}>Buildings</h2>
      <div>
        {Object.keys(BUILDINGS).map(key => {
          const b = BUILDINGS[key];
          const affordable = Object.entries(b.cost).every(([res, cost]) => resources[res] >= cost);
          return (
            <button
              key={key}
              onClick={() => build(key)}
              disabled={!affordable}
              style={{ display: 'block', width: '100%', margin: '0.25rem 0', padding: '0.5rem', textAlign: 'left' }}
            >
              {b.label} ({buildings[key]}) - Cost: {Object.entries(b.cost)
                .map(([res, cost]) => `${cost} ${RESOURCES[res].label}`)
                .join(', ')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
