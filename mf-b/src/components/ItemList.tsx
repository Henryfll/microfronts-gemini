import { useState } from 'react';
import { Item } from '../services/ItemService';

interface ItemListProps {
  items: Item[];
  deleteItem: (id: number) => void;
  updateItem: (id: number, name: string) => void;
  onItemChanged: () => void;
}

export default function ItemList({ items, deleteItem, updateItem, onItemChanged }: ItemListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const handleDelete = (id: number) => {
    deleteItem(id);
    onItemChanged();
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEdit = (id: number) => {
    if (!editName.trim() || editName.length > 50) return;
    updateItem(id, editName);
    setEditingId(null);
    setEditName('');
    onItemChanged();
  };

  if (items.length === 0) {
    return <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', color: '#666' }}>No items found. Create one above!</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Items List</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
            {editingId === item.id ? (
              <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
                <span style={{ color: '#888', minWidth: '30px' }}>#{item.id}</span>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ padding: '6px', flex: 1, marginRight: '10px' }}
                />
                <button onClick={() => saveEdit(item.id)} style={{ padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                <button onClick={cancelEdit} style={{ padding: '6px 12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <span style={{ color: '#888', marginRight: '15px', minWidth: '30px' }}>#{item.id}</span>
                  <span style={{ fontWeight: '500' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEdit(item)} style={{ padding: '6px 12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
