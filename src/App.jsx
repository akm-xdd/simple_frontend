import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  // Fetch all items
  const loadItems = async () => {
    const res = await api.get('/');
    setItems(res.data);
  };

  useEffect(() => { loadItems(); }, []);

  // Create or update
  const saveItem = async (e) => {
    e.preventDefault();
    if (form.id) {
      await api.put(`${form.id}/`, form);
    } else {
      await api.post('/', form);
    }
    setForm({ name: '', description: '' });
    loadItems();
  };

  // Delete
  const deleteItem = async (id) => {
    await api.delete(`${id}/`);
    loadItems();
  };

  // Edit
  const editItem = (item) => setForm(item);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Items</h1>

      <form onSubmit={saveItem}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">
          {form.id ? 'Update' : 'Create'}
        </button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}{' '}
            <button onClick={() => editItem(item)}>✏️</button>
            <button onClick={() => deleteItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
