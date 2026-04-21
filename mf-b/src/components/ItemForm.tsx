import { useState, FormEvent, ChangeEvent } from 'react';

interface ItemFormProps {
  onItemAdded: () => void;
  createItem: (name: string) => void;
}

export default function ItemForm({ onItemAdded, createItem }: ItemFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (name.length > 50) {
      setError('Name must be 50 characters or less');
      return;
    }

    try {
      createItem(name);
      setName('');
      setError('');
      onItemAdded();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError('');
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Create New Item</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter item name..."
            style={{ padding: '8px', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
        <div>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
