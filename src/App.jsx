import React, { useEffect, useMemo, useState } from 'react';
import { RESOURCES, BUILDINGS, SEASONS } from './data';

const RESOURCE_CATEGORIES = Object.values(RESOURCES).reduce((acc, r) => {
  (acc[r.category] ||= []).push(r.id);
  return acc;
}, {});

const BUILDING_CATEGORIES = Object.values(BUILDINGS).reduce((acc, b) => {
  (acc[b.category] ||= []).push(b.id);
  return acc;
}, {});

function getCapacity(resourceId, buildingCounts) {
  let cap = RESOURCES[resourceId].baseCapacity;
  Object.values(BUILDINGS).forEach(b => {
    if (b.addsCapacity && b.addsCapacity[resourceId]) {
      cap += b.addsCapacity[resourceId] * (buildingCounts[b.id] || 0);
    }
  });
  return cap;
}

function calculateRates(buildingCounts, seasonMods) {
  const rates = {};
  Object.values(BUILDINGS).forEach(b => {
    const count = buildingCounts[b.id] || 0;
    if (!b.outputResource || count === 0) return;
    const speed = seasonMods[b.seasonSpeedKey] || 1;
    const yieldMod = seasonMods[b.seasonYieldKey] || 1;
    const perSec = (b.harvestAmount * b.outputValue * yieldMod) / (b.cycleTimeSec / speed);
    rates[b.outputResource] = (rates[b.outputResource] || 0) + perSec * count;
  });
  return rates;
}

function getScaledCost(buildingId, countAlreadyBuilt) {
  const base = BUILDINGS[buildingId].cost;
  const cost = {};
  Object.entries(base).forEach(([res, amt]) => {
    cost[res] = Math.ceil(amt * Math.pow(1.15, countAlreadyBuilt));
  });
  return cost;
}

function formatCost(cost) {
  return Object.entries(cost)
    .filter(([, v]) => v > 0)
    .map(([res, amt]) => `${amt} ${RESOURCES[res].name}`)
    .join(', ');
}

function Sidebar({ resources, capacities, rates }) {
  return (
    <aside style={{ width: '250px', background: '#222', color: '#fff', padding: '1rem' }}>
      {Object.entries(RESOURCE_CATEGORIES).map(([cat, ids]) => (
        <div key={cat} style={{ marginBottom: '1rem' }}>
          <h3 style={{ textTransform: 'capitalize', margin: '0 0 0.5rem 0' }}>{cat}</h3>
          {ids.map(id => {
            const rate = rates[id] || 0;
            return (
              <div key={id} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {RESOURCES[id].name}: {resources[id].toFixed(1)} / {capacities[id]} (
                {rate >= 0 ? '+' : ''}{rate.toFixed(1)}/s)
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export default function App() {
  const initialResources = useMemo(() => {
    const obj = {};
    Object.keys(RESOURCES).forEach(id => (obj[id] = 0));
    return obj;
  }, []);
  const initialBuildings = useMemo(() => {
    const obj = {};
    Object.values(BUILDINGS).forEach(b => (obj[b.id] = b.startsWithCount || 0));
    return obj;
  }, []);

  const [resources, setResources] = useState(initialResources);
  const [buildings, setBuildings] = useState(initialBuildings);
  const [season, setSeason] = useState('spring');

  const seasonMods = SEASONS[season];

  const capacities = useMemo(() => {
    const caps = {};
    Object.keys(RESOURCES).forEach(id => {
      caps[id] = getCapacity(id, buildings);
    });
    return caps;
  }, [buildings]);

  const rates = useMemo(() => calculateRates(buildings, seasonMods), [buildings, seasonMods]);

  useEffect(() => {
    const id = setInterval(() => {
      setResources(prev => {
        const next = { ...prev };
        Object.keys(RESOURCES).forEach(resId => {
          const rate = rates[resId] || 0;
          if (rate !== 0) {
            next[resId] = Math.min(capacities[resId], +(next[resId] + rate).toFixed(2));
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [rates, capacities]);

  const build = id => {
    const count = buildings[id] || 0;
    const cost = getScaledCost(id, count);
    const canAfford = Object.entries(cost).every(([res, amt]) => resources[res] >= amt);
    if (!canAfford) return;
    const newBuildings = { ...buildings, [id]: count + 1 };
    setBuildings(newBuildings);
    setResources(prev => {
      const next = { ...prev };
      Object.entries(cost).forEach(([res, amt]) => {
        next[res] = +(next[res] - amt).toFixed(2);
      });
      return next;
    });
  };

  const demolish = id => {
    const count = buildings[id];
    if (count <= 0) return;
    const cost = getScaledCost(id, count - 1);
    const newBuildings = { ...buildings, [id]: count - 1 };
    setBuildings(newBuildings);
    setResources(prev => {
      const next = { ...prev };
      Object.entries(cost).forEach(([res, amt]) => {
        const refund = amt * 0.5;
        const cap = getCapacity(res, newBuildings);
        next[res] = Math.min(cap, +(next[res] + refund).toFixed(2));
      });
      Object.keys(next).forEach(resId => {
        const cap = getCapacity(resId, newBuildings);
        next[resId] = Math.min(next[resId], cap);
      });
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar resources={resources} capacities={capacities} rates={rates} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <h1>Apocalypse Idle</h1>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Season:{' '}
            <select value={season} onChange={e => setSeason(e.target.value)}>
              {Object.keys(SEASONS).map(key => (
                <option key={key} value={key} style={{ textTransform: 'capitalize' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <h2>Buildings</h2>
        {Object.entries(BUILDING_CATEGORIES).map(([cat, ids]) => (
          <div key={cat} style={{ marginBottom: '1rem' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{cat}</h3>
            {ids.map(id => {
              const b = BUILDINGS[id];
              const count = buildings[id] || 0;
              const cost = getScaledCost(id, count);
              const affordable = Object.entries(cost).every(([res, amt]) => resources[res] >= amt);
              return (
                <div key={id} style={{ marginBottom: '0.5rem' }}>
                  <strong>{b.name}</strong> ({count})<br />
                  <button onClick={() => build(id)} disabled={!affordable} style={{ marginRight: '0.5rem' }}>
                    Build ({formatCost(cost)})
                  </button>
                  <button onClick={() => demolish(id)} disabled={count === 0}>
                    Demolish (50% refund)
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}

