import { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { itemService, Item } from './services/ItemService';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = () => {
    setItems(itemService.getItems());
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Microfrontend B (React)</h1>
      <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <strong>Framework:</strong> React 19.2.0 | <strong>Port:</strong> 4202
      </div>
      
      <ItemForm 
        createItem={itemService.createItem.bind(itemService)} 
        onItemAdded={loadItems} 
      />
      
      <ItemList 
        items={items} 
        deleteItem={itemService.deleteItem.bind(itemService)} 
        updateItem={itemService.updateItem.bind(itemService)}
        onItemChanged={loadItems}
      />
    </div>
  );
}
