import React, { useState } from 'react';

function App() {
  const [trips, setTrips] = useState([
    { id: 1, country: 'Италия', name: 'Рим', desc: 'Колизей, пицца', likes: 0 },
    { id: 2, country: 'Франция', name: 'Париж', desc: 'Эйфелева башня', likes: 0 },
    { id: 3, country: 'Япония', name: 'Токио', desc: 'Суши, храмы', likes: 0 },
    { id: 4, country: 'Германия', name: 'Берлин', desc: 'Бранденбургские ворота', likes: 0 },
    { id: 5, country: 'Россия', name: 'Москва', desc: 'Кремль', likes: 5 },
  ]);

  const [filter, setFilter] = useState('Все');
  const [newTrip, setNewTrip] = useState({ country: '', name: '', desc: '' });

  const countries = ['Все', 'Италия', 'Франция', 'Япония'];

  const filtered = filter === 'Все' ? trips : trips.filter(t => t.country === filter);

  const addTrip = () => {
    if (!newTrip.country || !newTrip.name) return;
    setTrips([...trips, { ...newTrip, id: Date.now(), likes: 0 }]);
    setNewTrip({ country: '', name: '', desc: '' });
  };

  const like = (id) => {
    setTrips(trips.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌍 Каталог путешествий</h1>

      <div>
        <label>Фильтр: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ border: '1px solid #ccc', padding: 10, margin: '20px 0' }}>
        <h3>Добавить путешествие</h3>
        <input placeholder="Страна" value={newTrip.country} onChange={e => setNewTrip({...newTrip, country: e.target.value})} />
        <input placeholder="Название" value={newTrip.name} onChange={e => setNewTrip({...newTrip, name: e.target.value})} />
        <input placeholder="Описание" value={newTrip.desc} onChange={e => setNewTrip({...newTrip, desc: e.target.value})} />
        <button onClick={addTrip}>Добавить</button>
      </div>

      {filtered.map(t => (
        <div key={t.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: 10 }}>
          <h3>{t.name}</h3>
          <p>{t.country}</p>
          <p>{t.desc}</p>
          <button onClick={() => like(t.id)} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px' }}>
              ❤️ {t.likes}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
